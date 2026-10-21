# Roadmap

## Huidige taken (instructie 21 okt 2026)
- [x] 1. Redirects 301 toegevoegd, oude thema-slug uit beide sitemaps, interne links bijgewerkt; alle redirects waren al 301; catch-all 404 bestaat al
- [~] 2. /exit-planning-pagina gebouwd (route + Sanity-query op type "pagina"); BLOKKER: type "pagina" bestaat nog niet in Sanity Studio — Karel moet schema + document aanmaken; daarna redirect /exit-planning → /werkwijze uit netlify/edge-functions/routing.ts halen en pagina opnemen in sitemap, llms.txt en navigatie
- [x] 3. llms.txt: drie tekstvervangingen, themalink gecorrigeerd, twee artikelen toegevoegd
- [x] 4. Structured data: description en knowsAbout aangepast, JSON-LD gevalideerd; Rich Results Test moet Karel na publicatie zelf draaien
- [x] 5. E-mailadres overal info@propasso.nl

## Routing en statuscodes (21 okt 2026)
- Alle 301-doorverwijzingen staan in netlify/edge-functions/routing.ts. Nieuwe doorverwijzingen ALLEEN daar toevoegen: redirects in netlify.toml draaien na de prerender-middleware, waardoor bots een 200 kregen in plaats van een 301.
- routing.ts geeft een echte 404 voor /kennisbank/<slug> en /kennisbank/thema/<slug> die niet gepubliceerd in Sanity staan (artikelen met publishedAt in de toekomst tellen als niet gepubliceerd).
- Thema-slugs zijn definitief: ondernemingswaarde-en-winstgevendheid-verbeteren en het-persoonlijke-en-financiele-plan-na-overdracht. Oude varianten krijgen een 301.

## Openstaand uit eerdere rondes
- HubSpot floating chat: wacht op antwoorden (chatflow gepubliceerd? teasertekst? nudge-timing?)
- Bing meta-description: keuze Optie A (edge function) of B (fallback) nog niet gemaakt
- Sanity: slug artikel "Steeds meer ondernemers denken aan stoppen" corrigeren; artikel "Onder de loop" publishedAt 2027→2026
- Quickscan-plan (HubSpot-trigger + pushnotificatie) goedkeuren
- Na deploy: curl -I verificatie van 404/301's
- GTM: GA4-tag Consent Mode laten respecteren
