# SEO-fixes: echte 404's, 301-redirects en sitemap-opschoning

Gebaseerd op de geëvalueerde Claude-prompt, gecorrigeerd voor de werkelijke codebase. Geen wijzigingen aan pagina-inhoud of design.

## 1. Echte 404-statuscodes (netlify.toml)

- Expliciete 200-rewrites naar `/index.html` voor álle bestaande routes, inclusief trailing-slash-varianten:
  - `/`, `/werkwijze`, `/kennisbank`, `/kennisbank/*`, `/over-propasso`, `/contact`, `/quickscan`, `/veelgestelde-vragen`
  - `/disclaimer`, `/privacyverklaring`, `/algemene-voorwaarden`, `/cookieverklaring`, `/styleguide`
- Catch-all onderaan: `from = "/*"`, `to = "/index.html"`, `status = 404`.
- `NotFound.tsx` heeft al `noindex, nofollow` via de SEO-component — geen wijziging nodig.
- `KennisbankArticle.tsx`: bij geen Sanity-resultaat de echte `NotFound`-component renderen (met noindex) in plaats van de huidige inline "Artikel niet gevonden"-weergave zonder noindex.
- `KennisbankPillar.tsx`: zelfde behandeling bij onbekende thema-slug.

## 2. 301-redirects (boven de rewrites in netlify.toml)

```text
/over-mij, /over-mij/            -> /over-propasso (301)
/diensten, /diensten/            -> /werkwijze (301)
/partnernetwerk                  -> /over-propasso (301)
/onewebmedia/Algemene*           -> /algemene-voorwaarden (301)
/onewebmedia/Privacyverklaring*  -> /privacyverklaring (301)
/ben-je-klaar-om-te-verkopen-twee-vormen-van-exit-readiness-die-je-moet-begrijpen/
                                 -> /kennisbank/wanneer-is-je-bedrijf-verkoopklaar-over-voorbereiding-van-bedrijf-en-ondernemer (301)
/wp-includes/*, /wp-content/*    -> 410 Gone
```

## 3. Sitemap: alleen geldige slugs

- In `netlify/edge-functions/sitemap.ts` (de actieve sitemap volgens robots.txt) alleen artikelen opnemen waarvan de slug voldoet aan `^[a-z0-9-]+$`.
- Dezelfde filter toepassen in `supabase/functions/sitemap/index.ts` zodat beide consistent blijven.
- Rapporteren welk Sanity-document de ongeldige slug heeft ("Steeds meer ondernemers denken aan stoppen; hoe bereid je je goed voor?") zodat jij die in Sanity kunt corrigeren.

## 4. Onaangeroerd laten

- Netlify Prerender-extension en de bestaande react-helmet canonical/meta-tags blijven ongewijzigd.

## Verificatie na deploy

- `curl -I` op elke echte route (verwacht 200), op een onbekende URL (verwacht 404), op elke redirect (verwacht 301) en op `/wp-content/test` (verwacht 410).
- Sitemap ophalen en controleren dat de ongeldige slug eruit is.
- Lijst van toegevoegde routes en redirects terugkoppelen zodat jij kunt verifiëren.

## Technische details

- `netlify.toml` — redirects boven rewrites, `force = true` waar nodig.
- `src/pages/KennisbankArticle.tsx`, `src/pages/KennisbankPillar.tsx` — NotFound-render bij ontbrekend document.
- `netlify/edge-functions/sitemap.ts`, `supabase/functions/sitemap/index.ts` — slug-regexfilter.
