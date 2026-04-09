export interface SanityCategory {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
  heroIntro?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface SanityLegalPage {
  title: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any[];
  lastUpdated?: string;
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  summary: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]; // Portable Text blocks
  mainImage?: {
    asset: { _ref: string };
  };
  altText?: string;
  categories?: SanityCategory[];
  author?: {
    name: string;
    image?: { asset: { _ref: string } };
  };
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  relatedPosts?: SanityPost[];
  ctaType?: "contact" | "quickscan";
}
