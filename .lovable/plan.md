Plan: juridische pagina's op noindex zetten

Doel: zorgen dat de algemene voorwaarden, disclaimer, privacyverklaring en cookieverklaring niet meer geïndexeerd worden door Google en andere zoekmachines.

Technische aanpak:

- De `SEO`-component ondersteunt al een `noIndex`-boolean. Die zet `<meta name="robots" content="noindex, nofollow">` op de pagina wanneer `true`.
- De `LegalPage`-component (gebruikt door algemene voorwaarden, disclaimer en privacyverklaring) krijgt een nieuw `noIndex`-prop dat doorgegeven wordt aan `SEO`.
- De wrapperpagina's `AlgemeneVoorwaarden`, `Disclaimer` en `Privacyverklaring` passeren `noIndex={true}`.
- `Cookieverklaring` gebruikt geen `LegalPage`-wrapper; daar voegen we `noIndex` rechtstreeks toe aan de `<SEO>`-component.

Optionele uitbreiding:

- De statische sitemap-entries (`/algemene-voorwaarden`, `/disclaimer`, `/privacyverklaring`, `/cookieverklaring`) kunnen worden verwijderd uit `supabase/functions/sitemap/index.ts` en `netlify/edge-functions/sitemap.ts`, aangezien noindex-pagina's meestal ook niet in de sitemap thuishoren. Dit is aanbevolen maar vraag ik expliciet in de planvoorstelling mee te nemen.

Gewijzigde bestanden:

1. `src/components/LegalPage.tsx` — nieuw `noIndex`-prop doorgeven aan `SEO`.
2. `src/pages/AlgemeneVoorwaarden.tsx` — `noIndex={true}` toevoegen.
3. `src/pages/Disclaimer.tsx` — `noIndex={true}` toevoegen.
4. `src/pages/Privacyverklaring.tsx` — `noIndex={true}` toevoegen.
5. `src/pages/Cookieverklaring.tsx` — `noIndex={true}` toevoegen aan `<SEO>`.
6. Optioneel: `supabase/functions/sitemap/index.ts` en `netlify/edge-functions/sitemap.ts` — legale pagina's uit statische entries verwijderen.

Geen backend-, schema- of migratiewijzigingen nodig.