// Routing vóór de prerender-middleware.
// 1. Oude adressen: echte 301, ook voor crawlers en AI-bots (hoofdlettergevoelig).
// 2. Kennisbank-adressen die niet (of nog niet) gepubliceerd zijn: echte 404.
// 3. Paden met een slash aan het eind: 301 naar het pad zonder slash.
// Nieuwe doorverwijzingen ALLEEN hier toevoegen, niet in netlify.toml:
// netlify.toml-redirects draaien pas na de prerender en bots zien ze dan niet.
import type { Context } from "https://edge.netlify.com";

const SANITY = "https://h53ofne2.apicdn.sanity.io/v2024-01-01/data/query/production";

const REDIRECTS: Record<string, string> = {
  "/exit-planning": "/werkwijze",
  "/hoe-ik-werk": "/werkwijze",
  "/diensten": "/werkwijze",
  "/over-mij": "/over-propasso",
  "/partnernetwerk": "/over-propasso",
  "/de-onmisbare-ondernemer": "/kennisbank/de-onmisbare-ondernemer",
  "/van-cijfers-naar-inzicht-hoe-bepaal-je-de-waarde-van-je-mkb-bedrijf":
    "/kennisbank/hoe-bepaal-je-de-waarde-van-je-mkb-bedrijf",
  "/ben-je-klaar-om-te-verkopen-twee-vormen-van-exit-readiness-die-je-moet-begrijpen":
    "/kennisbank/wanneer-is-je-bedrijf-verkoopklaar-over-voorbereiding-van-bedrijf-en-ondernemer",
  "/kennisbank/bedrijfswaarde-verhogen-waardedrijvers": "/kennisbank/thema/de-waardering-van-je-bedrijf",
  "/kennisbank/thema/bedrijfswaardering-en-waardedrijvers": "/kennisbank/thema/de-waardering-van-je-bedrijf",
  "/kennisbank/thema/het-persoonlijke-en-persoonlijke-financiele-plan-na-overdracht":
    "/kennisbank/thema/het-persoonlijke-en-financiele-plan-na-overdracht",
  "/kennisbank/thema/persoonlijk-en-financieel-plan":
    "/kennisbank/thema/het-persoonlijke-en-financiele-plan-na-overdracht",
  "/kennisbank/thema/Ondernemingswaarde-en-winstgevendheid-verbeteren":
    "/kennisbank/thema/ondernemingswaarde-en-winstgevendheid-verbeteren",
  "/kennisbank/thema/bedrijfswaarde-en-winstgevendheid-verbeteren":
    "/kennisbank/thema/ondernemingswaarde-en-winstgevendheid-verbeteren",
};

const PREFIX_REDIRECTS: Array<[string, string]> = [
  ["/onewebmedia/Algemene", "/algemene-voorwaarden"],
  ["/onewebmedia/Privacyverklaring", "/privacyverklaring"],
];

type Slugs = { at: number; posts: Set<string>; themes: Set<string> };
let cache: Slugs | null = null;

async function getSlugs(): Promise<Slugs> {
  if (cache && Date.now() - cache.at < 5 * 60_000) return cache;
  const q = encodeURIComponent(
    `{"p": *[_type=="post" && publishedAt <= now() && !(_id in path("drafts.**")) && !(_id in path("versions.**"))].slug.current,
      "t": *[_type=="category" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))].slug.current}`,
  );
  const res = await fetch(`${SANITY}?query=${q}`);
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const { result } = await res.json();
  cache = { at: Date.now(), posts: new Set(result.p), themes: new Set(result.t) };
  return cache;
}

function redirect(url: URL, target: string): Response {
  return new Response(null, {
    status: 301,
    headers: { Location: new URL(target, url.origin).toString(), "Cache-Control": "public, max-age=3600" },
  });
}

export default async function handler(req: Request, context: Context) {
  const url = new URL(req.url);
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : "/";

  const target = REDIRECTS[path];
  if (target) return redirect(url, target);
  for (const [prefix, to] of PREFIX_REDIRECTS) {
    if (path.startsWith(prefix)) return redirect(url, to);
  }

  // 3. Slash aan het eind (behalve /): 301 naar het pad zonder slash, met behoud van ?query.
  //    Nodig voor prerendering: /werkwijze vindt werkwijze.html, /werkwijze/ niet.
  if (url.pathname !== path) return redirect(url, path + url.search);

  const thema = path.match(/^\/kennisbank\/thema\/([^/]+)$/);
  const post = thema ? null : path.match(/^\/kennisbank\/([^/]+)$/);
  if (thema || post) {
    try {
      const slugs = await getSlugs();
      const exists = thema ? slugs.themes.has(thema[1]) : slugs.posts.has(post![1]);
      if (!exists) {
        const page = await context.next();
        const headers = new Headers(page.headers);
        headers.set("Cache-Control", "no-store");
        return new Response(page.body, { status: 404, headers });
      }
    } catch (e) {
      // Sanity onbereikbaar: niets blokkeren, gewone afhandeling.
      console.error("routing: Sanity-check mislukt", e);
    }
  }
  return context.next();
}
