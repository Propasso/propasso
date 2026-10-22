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

export interface SanityAuthor {
  name: string;
  role?: string;
  image?: { asset: { _ref: string } };
  imageAlt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?: any[]; // Portable Text blocks
  linkedinUrl?: string;
}

export interface SanityFaqItem {
  _key: string;
  question: string;
  answer: string;
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
  author?: SanityAuthor;
  articleType?: "antwoord" | "inzicht";
  directAnswer?: string;
  keyInsight?: string;
  lastUpdated?: string;
  faq?: SanityFaqItem[];
  pillarCta?: { ctaTitle?: string; ctaText?: string };
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  relatedPosts?: SanityPost[];
  ctaType?: "contact" | "quickscan";
}
