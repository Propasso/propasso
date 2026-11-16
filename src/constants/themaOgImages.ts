import { canonicalizeCategorySlug } from "@/lib/sanityQueries";

export const themaOgImages: Record<string, string> = {
  "bedrijf-verkoopklaar-maken": "https://propasso.nl/og/thema-bedrijf-verkoopklaar-maken.jpg",
  "bedrijfswaardering-en-verkoopopbrengst":
    "https://propasso.nl/og/thema-bedrijfswaardering-en-verkoopopbrengst.jpg",
  "overdracht-familiebedrijf": "https://propasso.nl/og/thema-overdracht-familiebedrijf.jpg",
  "afhankelijkheid-ondernemer-zelfstandig-bedrijf":
    "https://propasso.nl/og/thema-afhankelijkheid-ondernemer-zelfstandig-bedrijf.jpg",
  "bedrijf-verkocht-en-dan": "https://propasso.nl/og/thema-bedrijf-verkocht-en-dan.jpg",
};

/** Deelafbeelding voor een thema; oude slugs worden eerst naar de actuele hub vertaald. */
export const getThemaOgImage = (slug?: string): string | undefined =>
  slug ? themaOgImages[canonicalizeCategorySlug(slug)] : undefined;
