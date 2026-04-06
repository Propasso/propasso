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
  ogTitle,
  ogDescription,
  canonicalUrl,
  noIndex
`;

const CATEGORY_SLUG_CANONICAL_MAP: Record<string, string> = {
  "het-persoonlijke-en-persoonlijke-financiele-plan-na-overdracht":
    "het-persoonlijke-en-financiele-plan-na-overdracht",
  "persoonlijk-en-financieel-plan": "het-persoonlijke-en-financiele-plan-na-overdracht",
};

export const canonicalizeCategorySlug = (slug: string) => CATEGORY_SLUG_CANONICAL_MAP[slug] ?? slug;

const getCategorySlugAliases = (slug: string) => {
  const aliases = new Set([slug]);

  Object.entries(CATEGORY_SLUG_CANONICAL_MAP).forEach(([alias, canonical]) => {
    if (canonical === slug) aliases.add(alias);
  });

  return Array.from(aliases);
};

const normalizeCategorySlug = <T extends { slug?: { current: string } }>(category: T): T => {
  if (!category.slug?.current) return category;

  const canonicalSlug = canonicalizeCategorySlug(category.slug.current);
  if (canonicalSlug === category.slug.current) return category;

  return {
    ...category,
    slug: { current: canonicalSlug },
  };
};

const normalizePostCategorySlugs = (post: SanityPost): SanityPost => ({
  ...post,
  categories: post.categories?.map((category) => normalizeCategorySlug(category)),
  relatedPosts: post.relatedPosts?.map((relatedPost) => ({
    ...relatedPost,
    categories: relatedPost.categories?.map((category) => normalizeCategorySlug(category)),
  })),
});

export async function fetchAllPosts(): Promise<SanityPost[]> {
  const posts = await sanityClient.fetch<SanityPost[]>(
    `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) { ${postFields} }`
  );

  return posts.map((post) => normalizePostCategorySlugs(post));
}

export interface SanityCategorySummary {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  heroIntro?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  metaTitle?: string;
  metaDescription?: string;
}

export async function fetchAllCategories(): Promise<SanityCategorySummary[]> {
  const categories = await sanityClient.fetch<SanityCategorySummary[]>(
    `*[_type == "category"] | order(title asc) { _id, title, slug, description }`
  );

  return categories.map((category) => normalizeCategorySlug(category));
}

export async function fetchCategoryBySlug(slug: string): Promise<SanityCategorySummary | null> {
  const slugs = getCategorySlugAliases(canonicalizeCategorySlug(slug));

  const category = await sanityClient.fetch<SanityCategorySummary | null>(
    `*[_type == "category" && slug.current in $slugs][0] { _id, title, slug, description, heroIntro, body, metaTitle, metaDescription }`,
    { slugs }
  );

  return category ? normalizeCategorySlug(category) : null;
}

export async function fetchPostsByCategory(categoryId: string): Promise<SanityPost[]> {
  const posts = await sanityClient.fetch<SanityPost[]>(
    `*[_type == "post" && $categoryId in categories[]._ref && publishedAt <= now()] | order(publishedAt desc) { ${postFields} }`,
    { categoryId }
  );

  return posts.map((post) => normalizePostCategorySlugs(post));
}

export async function fetchPostBySlug(slug: string): Promise<SanityPost | null> {
  const post = await sanityClient.fetch<SanityPost | null>(
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

  return post ? normalizePostCategorySlugs(post) : null;
}

