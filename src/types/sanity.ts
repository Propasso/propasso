export interface SanityCategory {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
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
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: {
    asset: { _ref: string };
  };
  canonicalUrl?: string;
  noindex?: boolean;
  relatedPosts?: SanityPost[];
  ctaType?: "contact" | "quickscan";
}
