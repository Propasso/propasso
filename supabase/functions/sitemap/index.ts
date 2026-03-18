import { corsHeaders } from "../_shared/security-utils.ts";

const SANITY_PROJECT_ID = "h53ofne2";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2024-01-01";
const BASE_URL = "https://propasso.nl";

// Static pages with priorities
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

// Known pillar slugs
const PILLAR_SLUGS = [
  "bedrijfswaarde-en-winstgevendheid-verbeteren",
  "bedrijf-overdraagbaar-maken",
  "afhankelijkheid-van-de-ondernemer-verminderen",
  "bedrijfswaardering-en-waardedrijvers",
  "voorbereiding-op-bedrijfsoverdracht",
  "het-persoonlijke-en-financiele-plan-na-overdracht",
];

interface SanityArticle {
  slug: { current: string };
  publishedAt: string;
  noIndex?: boolean;
}

async function fetchArticlesFromSanity(): Promise<SanityArticle[]> {
  const query = encodeURIComponent(
    `*[_type == "post" && publishedAt <= now() && !(_id in path("drafts.**"))] | order(publishedAt desc) { slug, publishedAt, noIndex }`
  );
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Sanity fetch failed: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return data.result || [];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlEntry(loc: string, lastmod?: string, changefreq?: string, priority?: string): string {
  let entry = `  <url>\n    <loc>${escapeXml(BASE_URL + loc)}</loc>`;
  if (lastmod) entry += `\n    <lastmod>${lastmod.split("T")[0]}</lastmod>`;
  if (changefreq) entry += `\n    <changefreq>${changefreq}</changefreq>`;
  if (priority) entry += `\n    <priority>${priority}</priority>`;
  entry += `\n  </url>`;
  return entry;
}

Deno.serve(async (req) => {
  // Allow CORS for any origin (sitemap is public)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const entries: string[] = [];

    // 1. Static pages
    for (const page of STATIC_PAGES) {
      entries.push(buildUrlEntry(page.loc, undefined, page.changefreq, page.priority));
    }

    // 2. Pillar pages
    for (const slug of PILLAR_SLUGS) {
      entries.push(buildUrlEntry(`/kennisbank/thema/${slug}`, undefined, "weekly", "0.8"));
    }

    // 3. Dynamic articles from Sanity
    const articles = await fetchArticlesFromSanity();
    for (const article of articles) {
      // Skip noIndex articles or articles without slugs
      if (article.noIndex || !article.slug?.current) continue;
      entries.push(
        buildUrlEntry(
          `/kennisbank/${article.slug.current}`,
          article.publishedAt,
          "monthly",
          "0.6"
        )
      );
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
