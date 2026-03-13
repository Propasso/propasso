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

export interface SanityPillarSummary {
  _id: string;
  title: string;
  slug: { current: string };
}

export async function fetchAllPillars(): Promise<SanityPillarSummary[]> {
  return sanityClient.fetch(
    `*[_type == "pillar"] | order(title asc) { _id, title, slug }`
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
