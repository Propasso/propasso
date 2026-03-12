export interface SanityPillar {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
}

export interface SanityArticle {
  _id: string;
  title: string;
  slug: { current: string };
  publishDate: string;
  summary: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[]; // Portable Text blocks
  featuredImage?: {
    asset: { _ref: string };
  };
  featuredImageAlt?: string;
  pillar?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: {
    asset: { _ref: string };
  };
  relatedArticles?: SanityArticle[];
  ctaType?: "contact" | "quickscan";
}
