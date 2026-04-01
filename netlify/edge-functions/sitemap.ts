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
  { loc: "/privacyverklaring", changefreq: "yearly", priority: "0.3" },
  { loc: "/disclaimer", changefreq: "yearly", priority: "0.3" },
  { loc: "/algemene-voorwaarden", changefreq: "yearly", priority: "0.3" },
  { loc: "/cookieverklaring", changefreq: "yearly", priority: "0.3" },
];

const PILLAR_SLUGS = [
  "bedrijfswaarde-en-winstgevendheid-verbeteren",
  "bedrijf-overdraagbaar-maken",
  "afhankelijkheid-van-de-ondernemer-verminderen",
  "bedrijfswaardering-en-waardedrijvers",
  "voorbereiding-op-bedrijfsoverdracht",
  "het-persoonlijke-en-financiele-plan-na-overdracht",
];

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
  const query = encodeURIComponent(
    `*[_type == "post" && publishedAt <= now() && !(_id in path("drafts.**"))] | order(publishedAt desc) { slug, publishedAt, noIndex }`
  );
  const sanityUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;

  let articles: Array<{ slug: { current: string }; publishedAt: string; noIndex?: boolean }> = [];
  try {
    const res = await fetch(sanityUrl);
    if (res.ok) {
      const data = await res.json();
      articles = data.result || [];
    }
  } catch (e) {
    console.error("Sanity fetch error:", e);
  }

  const entries: string[] = [
    ...STATIC_PAGES.map((p) => urlEntry(p.loc, undefined, p.changefreq, p.priority)),
    ...PILLAR_SLUGS.map((slug) => urlEntry(`/kennisbank/thema/${slug}`, undefined, "weekly", "0.8")),
    ...articles
      .filter((a) => !a.noIndex && a.slug?.current)
      .map((a) => urlEntry(`/kennisbank/${a.slug.current}`, a.publishedAt, "monthly", "0.6")),
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
