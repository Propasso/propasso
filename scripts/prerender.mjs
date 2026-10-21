// Build-time prerendering voor propasso.nl.
// Draait op Netlify na `vite build` (zie netlify.toml). Lovable draait dit script niet.
//
// Wat het doet:
// 1. Bewaart de lege app als dist/app-shell.html (fallback voor SPA-rewrites en 404's).
// 2. Start een eigen statische server op http://localhost:4173 (staat in Sanity CORS).
// 3. Haalt de routes op: vaste pagina's uit src/App.tsx + gepubliceerde artikelen,
//    thema's en pagina's uit Sanity.
// 4. Rendert elke route in headless Chrome, schoont de HTML op en schrijft
//    dist/<pad>.html (/ -> dist/index.html).
// Eén route die na een tweede poging nog faalt = build faalt; de vorige versie blijft live.

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;
const SANITY_QUERY_URL = "https://h53ofne2.api.sanity.io/v2024-01-01/data/query/production";
const EXCLUDED_STATIC = new Set(["/styleguide", "/exit-planning"]);
const CONCURRENCY = 4;
const NAV_TIMEOUT = 45_000;
const CONSENT_KEY = "propasso_cookie_consent";

// puppeteer staat in een aparte map (scripts/.prerender-deps), zodat package.json,
// de lockfiles en Lovable er niets van merken.
const requireDeps = createRequire(path.join(ROOT, "scripts/.prerender-deps/noop.js"));
const puppeteer = requireDeps("puppeteer");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function log(...a) {
  console.log("[prerender]", ...a);
}

// ---------- 1. app-shell ----------
async function writeAppShell() {
  const shell = await fs.readFile(path.join(DIST, "index.html"), "utf8");
  if (shell.includes("data-prerendered")) throw new Error("dist/index.html is al geprerenderd; draai eerst vite build");
  await fs.writeFile(path.join(DIST, "app-shell.html"), shell);
  return shell;
}

// ---------- 2. statische server ----------
function startServer(shell) {
  const server = http.createServer(async (req, res) => {
    try {
      const { pathname } = new URL(req.url, ORIGIN);
      const file = path.join(DIST, decodeURIComponent(pathname));
      if (file.startsWith(DIST) && pathname !== "/") {
        const stat = await fs.stat(file).catch(() => null);
        if (stat?.isFile()) {
          res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
          res.end(await fs.readFile(file));
          return;
        }
      }
      // Alles wat geen bestand is krijgt de lege app, zoals op Netlify.
      res.writeHead(200, { "Content-Type": MIME[".html"] });
      res.end(shell);
    } catch (e) {
      res.writeHead(500);
      res.end(String(e));
    }
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

// ---------- 3. routes ----------
async function staticRoutes() {
  const app = await fs.readFile(path.join(ROOT, "src/App.tsx"), "utf8");
  const all = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
  // Routes met parameters en de catch-all komen via de Sanity-lijsten.
  const literal = all.filter((p) => !p.includes(":") && !p.includes("*"));
  return { literal, kept: literal.filter((p) => !EXCLUDED_STATIC.has(p)) };
}

async function sanityRoutes() {
  const notDraft = `!(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(slug.current)`;
  const query = `{
    "posts": *[_type == "post" && ${notDraft} && publishedAt <= now() && noIndex != true].slug.current,
    "themes": *[_type == "category" && ${notDraft}].slug.current,
    "paginas": *[_type == "pagina" && ${notDraft}].slug.current
  }`;
  const url = `${SANITY_QUERY_URL}?perspective=published&query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity gaf ${res.status} bij het ophalen van de routes`);
  const { result } = await res.json();
  return result;
}

// ---------- 4. renderen ----------
async function renderRoute(browser, route) {
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));
  try {
    // Cookiekeuze vooraf "alles geweigerd": geen banner in de snapshot en geen HubSpot.
    await page.evaluateOnNewDocument(
      (key) => {
        try {
          localStorage.setItem(
            key,
            JSON.stringify({
              status: "all_rejected",
              preferences: { functional: true, statistics: false, marketing: false },
              timestamp: Date.now(),
            }),
          );
        } catch {}
      },
      CONSENT_KEY,
    );

    // Alleen eigen origin en *.sanity.io. Sanity-verzoeken gaan ongewijzigd door;
    // alles van derden (GTM, HubSpot, ...) wordt geblokkeerd.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const u = req.url();
      if (u.startsWith("data:") || u.startsWith("blob:")) return req.continue();
      const { origin, hostname } = new URL(u);
      if (origin === ORIGIN || hostname === "sanity.io" || hostname.endsWith(".sanity.io")) return req.continue();
      return req.abort("blockedbyclient");
    });

    const response = await page.goto(ORIGIN + route, { waitUntil: "networkidle0", timeout: NAV_TIMEOUT });
    if (!response || response.status() !== 200) throw new Error(`status ${response?.status()}`);

    await page.waitForFunction(
      () => (document.getElementById("root")?.innerText || "").trim().length > 200,
      { timeout: 15_000 },
    );
    // react-helmet zet title, description en canonical asynchroon; daarop wachten.
    await page.waitForFunction(
      () =>
        document.title.trim().length > 0 &&
        document.querySelector('meta[name="description"][content]') &&
        document.querySelector('link[rel="canonical"][href]'),
      { timeout: 15_000 },
    );

    const finalPath = await page.evaluate(() => location.pathname);
    if (finalPath !== route) throw new Error(`app stuurde door naar ${finalPath}`);
    const title = await page.title();
    if (/niet gevonden/i.test(title)) throw new Error("pagina rendert als NotFound");
    if (pageErrors.length) throw new Error(`JavaScript-fout: ${pageErrors[0]}`);

    const html = await page.evaluate((origin) => {
      // framer-motion beginstijlen weg, zodat de tekst zonder JavaScript zichtbaar is.
      for (const el of document.querySelectorAll("[style]")) {
        const s = el.style;
        if (s.opacity !== "" && parseFloat(s.opacity) < 1) s.removeProperty("opacity");
        if (s.transform) s.removeProperty("transform");
        if (!el.getAttribute("style")?.trim()) el.removeAttribute("style");
      }

      // Scripts van derden die tijdens het renderen zijn ingevoegd (bijv. gtm.js) weg;
      // de inline GTM-snippet in de head laadt ze in de browser opnieuw.
      for (const s of document.querySelectorAll("script[src]")) {
        if (new URL(s.src, origin).origin !== origin) s.remove();
      }

      // Geen dubbel Organization-JSON-LD: index.html heeft het volledige blok al.
      for (const s of document.querySelectorAll('script[type="application/ld+json"][data-rh]')) {
        let data;
        try {
          data = JSON.parse(s.textContent);
        } catch {
          continue;
        }
        const isOrg = (o) =>
          o && o["@type"] === "Organization" && o["@id"] === "https://propasso.nl/#organization";
        if (Array.isArray(data)) {
          const rest = data.filter((o) => !isOrg(o));
          if (rest.length === 0) s.remove();
          else if (rest.length !== data.length) s.textContent = JSON.stringify(rest);
        } else if (isOrg(data)) {
          s.remove();
        }
      }

      // Eén <title>: de laatste (van react-helmet) wint.
      const titles = document.head.querySelectorAll("title");
      for (let i = 0; i < titles.length - 1; i++) titles[i].remove();

      document.documentElement.setAttribute("data-prerendered", new Date().toISOString());
      return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    }, ORIGIN);

    const out = html.split(ORIGIN).join("");
    for (const [label, re] of [
      ["title", /<title[^>]*>[^<]+<\/title>/],
      ["meta description", /<meta[^>]+name="description"[^>]+content="[^"]+"/],
      ["canonical", /<link[^>]+rel="canonical"[^>]+href="https:\/\/propasso\.nl/],
    ]) {
      if (!re.test(out)) throw new Error(`${label} ontbreekt`);
    }
    return out;
  } finally {
    await page.close();
  }
}

function outFile(route) {
  return route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route}.html`);
}

async function main() {
  const started = Date.now();
  const shell = await writeAppShell();
  const { literal, kept } = await staticRoutes();
  // Alleen voor lokaal testen zonder Sanity: PRERENDER_TEST_ROUTES="/werkwijze,/contact"
  const testRoutes = process.env.PRERENDER_TEST_ROUTES?.split(",").filter(Boolean);
  const sanity = testRoutes ? { posts: [], themes: [], paginas: [] } : await sanityRoutes();

  const paginaRoutes = [];
  for (const slug of sanity.paginas) {
    const r = `/${slug}`;
    // Alleen pagina's waarvoor App.tsx een route heeft; anders zou NotFound de build breken.
    if (literal.includes(r)) paginaRoutes.push(r);
    else log(`let op: pagina "${slug}" heeft geen route in App.tsx, overgeslagen`);
  }

  const routes = testRoutes ?? [
    ...new Set([
      ...kept,
      ...paginaRoutes,
      ...sanity.posts.map((s) => `/kennisbank/${s}`),
      ...sanity.themes.map((s) => `/kennisbank/thema/${s}`),
    ]),
  ];
  log(
    `${routes.length} routes: ${kept.length} vast, ${paginaRoutes.length} pagina's, ` +
      `${sanity.posts.length} artikelen, ${sanity.themes.length} thema's`,
  );

  const server = await startServer(shell);
  const browser = await puppeteer.launch({
    headless: true,
    // De throttling-vlaggen voorkomen dat tabs op de achtergrond (4 tegelijk) trager renderen.
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-background-timer-throttling",
      "--disable-renderer-backgrounding",
      "--disable-backgrounding-occluded-windows",
    ],
  });

  const results = new Map();
  const failures = [];
  const queue = [...routes];
  async function worker() {
    while (queue.length) {
      const route = queue.shift();
      let lastError;
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          results.set(route, await renderRoute(browser, route));
          log(`ok  ${route}${attempt > 1 ? " (tweede poging)" : ""}`);
          lastError = null;
          break;
        } catch (e) {
          lastError = e;
          if (attempt === 1) log(`poging 1 mislukt voor ${route}: ${e.message}`);
        }
      }
      if (lastError) {
        failures.push(`${route}: ${lastError.message}`);
        log(`FOUT ${route}: ${lastError.message}`);
      }
    }
  }
  try {
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length) {
    console.error(`[prerender] ${failures.length} route(s) mislukt, build stopt:\n  ${failures.join("\n  ")}`);
    process.exit(1);
  }

  // Pas schrijven als alles gelukt is.
  for (const [route, html] of results) {
    const file = outFile(route);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, html);
  }
  log(`klaar: ${results.size} pagina's in ${Math.round((Date.now() - started) / 1000)} s`);
}

main().catch((e) => {
  console.error("[prerender] mislukt:", e);
  process.exit(1);
});
