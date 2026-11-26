#!/usr/bin/env node
/**
 * Linkrapport kennisbank (alleen lezen, wijzigt niets in Sanity).
 *
 * Wat het doet:
 *  1. Haalt alle gepubliceerde kennisbankartikelen (post) uit Sanity.
 *  2. Telt per artikel de uitgaande interne links in de body en de inkomende interne links vanuit andere artikelen.
 *  3. Noemt artikelen met minder dan twee inkomende links ("wezen").
 *  4. Controleert elke link in de body met een HEAD-request en noemt links die een doorverwijzing (3xx) of fout (4xx/5xx) geven.
 *  5. Noemt links met www apart: op de site herschrijft de template ze al, maar in Sanity horen ze zonder www.
 *
 * Draaien (Terminal, in de map van de repo):
 *   node scripts/link-report.mjs                 -> schrijft link-rapport-JJMMDD.md in de huidige map
 *   node scripts/link-report.mjs rapport.md      -> schrijft naar het opgegeven bestand
 *   node scripts/link-report.mjs --no-check      -> sla de HEAD-controle over (sneller, alleen tellingen)
 *
 * Vereist Node 18 of hoger (ingebouwde fetch). Geen token nodig: de dataset is publiek leesbaar.
 */
import { writeFileSync } from "node:fs";

const PROJECT_ID = "h53ofne2";
const DATASET = "production";
const API_VERSION = "2024-01-01";
const SITE = "https://propasso.nl";
const MIN_INCOMING = 2;

const args = process.argv.slice(2);
const skipCheck = args.includes("--no-check");
const today = new Date();
const yymmdd = today.toISOString().slice(2, 10).replace(/-/g, "");
const outFile = args.find((a) => !a.startsWith("--")) ?? `link-rapport-${yymmdd}.md`;

const QUERY = `*[_type == "post" && defined(slug.current) && publishedAt <= now() && !(_id in path("drafts.**"))] | order(title asc){
  _id, title, "slug": slug.current, noIndex,
  "theme": categories[0]->title,
  "links": body[_type == "block"]{ _key, "hrefs": markDefs[_type == "link"].href }
}`;

async function fetchPosts() {
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}&perspective=published`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity gaf ${res.status}: ${await res.text()}`);
  return (await res.json()).result;
}

const INTERNAL_RE = /^https?:\/\/(www\.)?propasso\.nl/i;

/** Geeft het pad terug voor interne links, of null voor externe links/ankers. */
function internalPath(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  if (href.startsWith("/")) return href;
  if (INTERNAL_RE.test(href)) return href.replace(INTERNAL_RE, "") || "/";
  return null;
}

const stripPath = (p) => p.split(/[?#]/)[0].replace(/\/+$/, "") || "/";

async function headStatus(url) {
  const attempt = async (method) => {
    const res = await fetch(url, { method, redirect: "manual", signal: AbortSignal.timeout(15000) });
    return { status: res.status, location: res.headers.get("location") ?? "" };
  };
  try {
    let r = await attempt("HEAD");
    // Sommige servers weigeren HEAD; probeer dan GET.
    if (r.status === 405 || r.status === 403) r = await attempt("GET");
    return r;
  } catch (e) {
    return { status: 0, location: `fout: ${e.cause?.code || e.cause?.message || e.message}` };
  }
}

async function main() {
  const posts = await fetchPosts();
  const bySlugPath = new Map(posts.map((p) => [`/kennisbank/${p.slug}`, p]));
  const incoming = new Map(posts.map((p) => [p._id, new Set()]));
  const rows = [];
  const allLinks = []; // { post, key, href }
  const wwwLinks = [];

  for (const post of posts) {
    let outgoing = 0;
    for (const block of post.links ?? []) {
      for (const href of block.hrefs ?? []) {
        if (!href) continue;
        allLinks.push({ post, key: block._key, href });
        if (/^https?:\/\/www\.propasso\.nl/i.test(href)) wwwLinks.push({ post, key: block._key, href });
        const path = internalPath(href);
        if (!path) continue;
        outgoing++;
        const target = bySlugPath.get(stripPath(path));
        if (target && target._id !== post._id) incoming.get(target._id).add(post._id);
      }
    }
    rows.push({ post, outgoing });
  }

  // HEAD-controle: elke unieke URL één keer. www-links worden zonder www gecontroleerd,
  // omdat de template ze zo op de site zet.
  const problems = [];
  if (!skipCheck) {
    const unique = new Map();
    for (const l of allLinks) {
      const path = internalPath(l.href);
      const url = path ? `${SITE}${path}` : l.href;
      if (!/^https?:\/\//i.test(url)) continue;
      if (!unique.has(url)) unique.set(url, []);
      unique.get(url).push(l);
    }
    const urls = [...unique.keys()];
    process.stderr.write(`Controle van ${urls.length} unieke links...\n`);
    const results = new Map();
    const CONCURRENCY = 6;
    for (let i = 0; i < urls.length; i += CONCURRENCY) {
      const batch = urls.slice(i, i + CONCURRENCY);
      const out = await Promise.all(batch.map(headStatus));
      batch.forEach((u, j) => results.set(u, out[j]));
    }
    for (const [url, links] of unique) {
      const { status, location } = results.get(url);
      if (status >= 200 && status < 300) continue;
      for (const l of links) problems.push({ ...l, url, status, location });
    }
  }

  const md = [];
  md.push(`# Linkrapport kennisbank propasso.nl`, "");
  md.push(`Gemaakt op ${today.toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}. ${posts.length} gepubliceerde artikelen. Alleen links in de body tellen mee; de hoofdartikelkaart, "Verder lezen" en navigatie niet.`, "");

  md.push(`## 1. Interne links per artikel`, "");
  md.push(`| Artikel | Thema | Uit | In |`, `| :- | :- | -: | -: |`);
  for (const { post, outgoing } of rows.sort((a, b) => incoming.get(a.post._id).size - incoming.get(b.post._id).size)) {
    md.push(`| [${post.title}](${SITE}/kennisbank/${post.slug}) | ${post.theme ?? "geen"} | ${outgoing} | ${incoming.get(post._id).size} |`);
  }
  md.push("");

  const orphans = rows.filter(({ post }) => incoming.get(post._id).size < MIN_INCOMING && !post.noIndex);
  md.push(`## 2. Wezen: minder dan ${MIN_INCOMING} inkomende links (${orphans.length})`, "");
  if (orphans.length === 0) md.push("Geen.");
  for (const { post } of orphans) md.push(`- ${post.title} (\`${post._id}\`): ${incoming.get(post._id).size} inkomend`);
  md.push("");

  md.push(`## 3. Links met een doorverwijzing of fout (${skipCheck ? "niet gecontroleerd" : problems.length})`, "");
  if (!skipCheck) {
    if (problems.length === 0) md.push("Geen.");
    else {
      md.push(`| Status | Post \`_id\` | Blok \`_key\` | href | Doorverwijst naar |`, `| :- | :- | :- | :- | :- |`);
      for (const p of problems.sort((a, b) => a.status - b.status)) {
        md.push(`| ${p.status || "geen antwoord"} | \`${p.post._id}\` | \`${p.key}\` | ${p.href} | ${p.location} |`);
      }
    }
  }
  md.push("");

  md.push(`## 4. Links met www (${wwwLinks.length})`, "");
  md.push("Op de site geen doorverwijzing (de template haalt www weg), maar corrigeer ze in Sanity naar https://propasso.nl.", "");
  if (wwwLinks.length === 0) md.push("Geen.");
  for (const l of wwwLinks) md.push(`- \`${l.post._id}\`, blok \`${l.key}\`: ${l.href}`);
  md.push("");

  writeFileSync(outFile, md.join("\n"));
  process.stderr.write(`Rapport geschreven naar ${outFile}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
