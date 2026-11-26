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

export interface SanityPostTheme {
  title?: string;
  slug?: string;
  pillarPitch?: string;
  pillarLinkLabel?: string;
  /** Alleen gevuld als het hoofdartikel gepubliceerd en live is. */
  pillar?: { _id: string; title: string; slug: string } | null;
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
  closingNote?: string;
  lastUpdated?: string;
  faq?: SanityFaqItem[];
  pillarCta?: { ctaTitle?: string; ctaText?: string };
  /** Thema van het artikel met het hoofdartikel voor de hoofdartikelkaart (Sanity: category.pillarPost). */
  theme?: SanityPostTheme | null;
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  relatedPosts?: SanityPost[];
  ctaType?: "contact" | "quickscan";
}

export interface SanityHomepageTheme {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  articleCount: number;
}
