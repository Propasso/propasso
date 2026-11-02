import type { Context } from "https://edge.netlify.com";

const SANITY_PROJECT_ID = "h53ofne2";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2024-01-01";
const BASE_URL = "https://propasso.nl";

const STATIC_PAGES = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/werkwijze", changefreq: "monthly", priority: "0.9" },
  { loc: "/kennisbank", changefreq: "weekly", priority: "0.9" },
  { loc: "/over-propasso", changefreq: "monthly", priority: "0.8" },
  { loc: "/contact", changefreq: "monthly", priority: "0.8" },
  { loc: "/quickscan", changefreq: "monthly", priority: "0.8" },
  { loc: "/veelgestelde-vragen", changefreq: "monthly", priority: "0.7" },
];

// Thema's (categorieën) en artikelen komen uit Sanity. Geen vaste themalijst meer:
// een nieuw of hernoemd thema staat zo vanzelf goed in de sitemap.

// Oude artikeladressen met een 301 in routing.ts: niet in de sitemap.
const REDIRECTED_SLUGS = new Set(["successieplanning-voor-het-familiebedrijf-zo-ontwikkel-je-een-exitstrategie"]);

const SLUG_OK = /^[a-z0-9-]+$/;

type Theme = { slug: string };
type Article = { slug?: string; publishedAt: string; lastUpdated?: string; noIndex?: boolean };

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc: string, lastmod?: string, changefreq?: string, priority?: string): string {
  let e = `  <url>\n    <loc>${escapeXml(BASE_URL + loc)}</loc>`;
  if (lastmod) e += `\n    <lastmod>${lastmod.split("T")[0]}</lastmod>`;
  if (changefreq) e += `\n    <changefreq>${changefreq}</changefreq>`;
  if (priority) e += `\n    <priority>${priority}</priority>`;
  return e + `\n  </url>`;
}

export default async function handler(req: Request, context: Context) {
  const notDraft = `!(_id in path("drafts.**")) && !(_id in path("versions.**"))`;
  const query = encodeURIComponent(
    `{
      "themes": *[_type == "category" && ${notDraft} && defined(slug.current)]
        | order(coalesce(order, 99) asc, title asc) { "slug": slug.current },
      "articles": *[_type == "post" && ${notDraft} && publishedAt <= now()]
        | order(publishedAt desc) { "slug": slug.current, publishedAt, lastUpdated, noIndex }
    }`,
  );
  const sanityUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;

  let themes: Theme[] = [];
  let articles: Article[] = [];
  try {
    const res = await fetch(sanityUrl);
    if (!res.ok) throw new Error(`Sanity ${res.status}`);
    const { result } = await res.json();
    themes = result?.themes || [];
    articles = result?.articles || [];
    if (themes.length === 0) throw new Error("geen thema's ontvangen");
  } catch (e) {
    // Liever even geen sitemap dan een onvolledige: crawlers proberen het later opnieuw.
    console.error("Sitemap: Sanity-fout", e);
    return new Response("Sitemap tijdelijk niet beschikbaar", {
      status: 503,
      headers: { "Retry-After": "600", "Cache-Control": "no-store" },
    });
  }

  const entries: string[] = [
    ...STATIC_PAGES.map((p) => urlEntry(p.loc, undefined, p.changefreq, p.priority)),
    ...themes
      .filter((t) => {
        if (!SLUG_OK.test(t.slug)) {
          console.error(`Ongeldige thema-slug overgeslagen in sitemap: "${t.slug}" (corrigeer in Sanity)`);
          return false;
        }
        return true;
      })
      .map((t) => urlEntry(`/kennisbank/thema/${t.slug}`, undefined, "weekly", "0.8")),
    ...articles
      .filter((a) => {
        if (a.noIndex || !a.slug) return false;
        if (REDIRECTED_SLUGS.has(a.slug)) return false;
        if (!SLUG_OK.test(a.slug)) {
          console.error(`Ongeldige slug overgeslagen in sitemap: "${a.slug}" (corrigeer in Sanity)`);
          return false;
        }
        return true;
      })
      .map((a) => urlEntry(`/kennisbank/${a.slug}`, a.lastUpdated || a.publishedAt, "monthly", "0.6")),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export const config = { path: "/sitemap.xml" };
