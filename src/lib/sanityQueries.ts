import { sanityClient } from "./sanity";
import type { SanityPost } from "@/types/sanity";

const postFields = `
  _id,
  title,
  slug,
  publishedAt,
  summary,
  mainImage,
  "altText": coalesce(altText, mainImage.alt),
  "categories": categories[]->{ _id, title, slug },
  seoTitle,
  seoDescription,
  openGraphTitle,
  openGraphDescription,
  openGraphImage,
  canonicalUrl,
  noindex
`;

export async function fetchAllPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${postFields} }`
  );
}

export interface SanityCategorySummary {
  _id: string;
  title: string;
  slug: { current: string };
}

export async function fetchAllCategories(): Promise<SanityCategorySummary[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug }`
  );
}

export async function fetchPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      ${postFields},
      body,
      "author": author->{ name, image },
      "relatedPosts": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc) [0..2] {
        ${postFields}
      }
    }`,
    { slug }
  );
}
