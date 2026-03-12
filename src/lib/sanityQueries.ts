import { sanityClient } from "./sanity";
import type { SanityArticle } from "@/types/sanity";

const articleFields = `
  _id,
  title,
  slug,
  publishDate,
  summary,
  featuredImage,
  featuredImageAlt,
  "pillar": pillar->{ _id, title, slug },
  seoTitle,
  seoDescription,
  ogImage,
  ctaType
`;

export async function fetchAllArticles(): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    `*[_type == "article"] | order(publishDate desc) { ${articleFields} }`
  );
}

export async function fetchArticleBySlug(slug: string): Promise<SanityArticle | null> {
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      ${articleFields},
      body,
      "relatedArticles": relatedArticles[]->{ ${articleFields} }
    }`,
    { slug }
  );
}
