

## Plan: Juridische pagina's koppelen aan Sanity CMS

### Verified against Sanity schema

The uploaded `legalPage.ts` defines four fields:
- `title` (string, required)
- `slug` (slug, required)
- `content` (array of block = Portable Text)
- `lastUpdated` (datetime, optional)

The plan's GROQ query and type definition match these fields exactly.

### Changes

**1. Add type to `src/types/sanity.ts`**
```typescript
export interface SanityLegalPage {
  title: string;
  slug: string; // projected from slug.current
  content?: any[];
  lastUpdated?: string;
}
```

**2. Add query to `src/lib/sanityQueries.ts`**
```typescript
export async function fetchLegalPageBySlug(slug: string): Promise<SanityLegalPage | null> {
  return sanityClient.fetch(
    `*[_type == "legalPage" && slug.current == $slug][0]{
      title, "slug": slug.current, content, lastUpdated
    }`,
    { slug }
  );
}
```

**3. Create shared `src/components/LegalPage.tsx`**
- Props: `slug`, `fallbackTitle`, `seoDescription`, `canonical`
- Uses `useQuery` + `fetchLegalPageBySlug`
- Renders content via `<PortableText>` reusing the same `portableTextComponents` from KennisbankArticle
- Shows Skeleton loading state, error fallback, optional "Laatst bijgewerkt" date
- Wraps in existing `PageLayout` + `SEO`

**4. Simplify the three page components**
Each becomes a thin wrapper passing slug and SEO metadata to `LegalPage`:
- `AlgemeneVoorwaarden.tsx` -> slug `"algemene-voorwaarden"`
- `Disclaimer.tsx` -> slug `"disclaimer"`
- `Privacyverklaring.tsx` -> slug `"privacyverklaring"`

All hardcoded legal text is removed.

