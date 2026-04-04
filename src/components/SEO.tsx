import { Helmet } from "react-helmet-async";

type SEOProps = {
    title: string;
    description: string;
    canonical: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: "website" | "article";
    ogImage?: string;
    noIndex?: boolean;
    robots?: string;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const DEFAULT_OG_IMAGE = "https://propasso.nl/og-default.png";
const DEFAULT_ROBOTS =
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

const SEO = ({
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogType = "website",
    ogImage = DEFAULT_OG_IMAGE,
    noIndex = false,
    robots,
    jsonLd,
}: SEOProps) => {
    const fullTitle = title.includes("Propasso") ? title : `${title} | Propasso`;
    const robotsContent = noIndex ? "noindex, nofollow" : robots || DEFAULT_ROBOTS;

    if (import.meta.env.DEV) {
          if (fullTitle.length > 60) {
                  console.warn(`[SEO] Title is likely too long (${fullTitle.length} chars): "${fullTitle}"`);
          }
          if (description.length > 160) {
                  console.warn(
                            `[SEO] Meta description is likely too long (${description.length} chars): "${description}"`
                          );
          }
    }

    return (
          <Helmet>
                <title>{fullTitle}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta name="robots" content={robotsContent} />
          
            {/* Geo targeting — Netherlands */}
                <meta name="geo.region" content="NL" />
                <meta name="geo.placename" content="Nederland" />
                <meta name="geo.position" content="51.6978;5.3037" />
                <meta name="ICBM" content="51.6978, 5.3037" />
          
                <meta property="og:site_name" content="Propasso" />
                <meta property="og:locale" content="nl_NL" />
                <meta property="og:title" content={ogTitle || fullTitle} />
                <meta property="og:description" content={ogDescription || description} />
                <meta property="og:url" content={canonical} />
                <meta property="og:type" content={ogType} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
          
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={ogTitle || fullTitle} />
                <meta name="twitter:description" content={ogDescription || description} />
                <meta name="twitter:image" content={ogImage} />
          
            {jsonLd &&
                      (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((schema, index) => (
                                  <script
                                                key={`jsonld-${index}`}
                                                type="application/ld+json"
                                                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                                              />
                                ))}
          </Helmet>
        );
};

export default SEO;
