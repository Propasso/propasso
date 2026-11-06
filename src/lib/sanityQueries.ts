import { sanityClient } from "./sanity";
import type { SanityHomepageTheme } from "@/types/sanity";
import type { SanityPost, SanityLegalPage } from "@/types/sanity";

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

// Oude categorie-slugs -> canonieke hub (Fase C, nov 2026). Elke alias wijst direct naar een eindbestemming.
const CATEGORY_SLUG_CANONICAL_MAP: Record<string, string> = {
  "voorbereiding-op-bedrijfsoverdracht": "bedrijf-verkoopklaar-maken",
  "bedrijf-overdraagbaar-maken": "bedrijf-verkoopklaar-maken",
  "de-waardering-van-je-bedrijf": "bedrijfswaardering-en-verkoopopbrengst",
  "ondernemingswaarde-en-winstgevendheid-verbeteren": "bedrijfswaardering-en-verkoopopbrengst",
  "bedrijfsoverdracht-in-het-familiebedrijf": "overdracht-familiebedrijf",
  "afhankelijkheid-van-de-ondernemer-verminderen": "afhankelijkheid-ondernemer-zelfstandig-bedrijf",
  "het-persoonlijke-en-financiele-plan-na-overdracht": "bedrijf-verkocht-en-dan",
  "het-persoonlijke-en-persoonlijke-financiele-plan-na-overdracht": "bedrijf-verkocht-en-dan",
  "persoonlijk-en-financieel-plan": "bedrijf-verkocht-en-dan",
  "Ondernemingswaarde-en-winstgevendheid-verbeteren": "bedrijfswaardering-en-verkoopopbrengst",
  "bedrijfswaarde-en-winstgevendheid-verbeteren": "bedrijfswaardering-en-verkoopopbrengst",
  "bedrijfswaardering-en-waardedrijvers": "bedrijfswaardering-en-verkoopopbrengst",
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
    `*[_type == "category"] | order(coalesce(order, 99) asc, title asc) { _id, title, slug, description }`
  );

  return categories.map((category) => normalizeCategorySlug(category));
}

export async function fetchCategoryBySlug(slug: string): Promise<SanityCategorySummary | null> {
  const canonical = canonicalizeCategorySlug(slug);
  const slugs = getCategorySlugAliases(canonical);

  // Eerst de exacte canonieke slug; pas als die niet bestaat een alias.
  // Zolang oude en nieuwe categorie naast elkaar bestaan, toont de hub zo altijd de nieuwe.
  const category = await sanityClient.fetch<SanityCategorySummary | null>(
    `coalesce(
      *[_type == "category" && slug.current == $canonical][0],
      *[_type == "category" && slug.current in $slugs][0]
    ) { _id, title, slug, description, heroIntro, body, metaTitle, metaDescription }`,
    { canonical, slugs }
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
    `*[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
      ${postFields},
      body,
      articleType,
      directAnswer,
      keyInsight,
      closingNote,
      lastUpdated,
      "faq": faq[]{ _key, question, answer },
      "author": author->{ name, role, image, "imageAlt": image.alt, bio, linkedinUrl },
      "pillarCta": categories[0]->{ ctaTitle, ctaText },
      "relatedPosts": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc) [0..2] {
        ${postFields}
      }
    }`,
    { slug }
  );

  return post ? normalizePostCategorySlugs(post) : null;
}

export async function fetchLegalPageBySlug(slug: string): Promise<SanityLegalPage | null> {
  return sanityClient.fetch<SanityLegalPage | null>(
    `*[_type == "legalPage" && slug.current == $slug][0]{
      title, "slug": slug.current, content, lastUpdated
    }`,
    { slug }
  );
}

export interface SanityPagina {
  _id: string;
  title: string;
  heroIntro?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  metaTitle?: string;
  metaDescription?: string;
}

export async function fetchPaginaBySlug(slug: string): Promise<SanityPagina | null> {
  return sanityClient.fetch<SanityPagina | null>(
    `*[_type == "pagina" && slug.current == $slug][0]{
      _id, title, heroIntro, body, metaTitle, metaDescription
    }`,
    { slug }
  );
}


export async function fetchHomepageThemes(): Promise<SanityHomepageTheme[]> {
  return sanityClient.fetch<SanityHomepageTheme[]>(
    `*[_type == "category" && defined(slug.current)]
      | order(coalesce(order, 99) asc, title asc) {
        _id, title, "slug": slug.current, description,
        "articleCount": count(*[_type == "post" && references(^._id)
                                 && publishedAt <= now() && noIndex != true])
      }`
  );
}
