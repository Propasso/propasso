# Roadmap

## Huidige taken (instructie 21 okt 2026)
- [x] 1. Redirects 301 toegevoegd, oude thema-slug uit beide sitemaps, interne links bijgewerkt; alle redirects waren al 301; catch-all 404 bestaat al
- [~] 2. /exit-planning-pagina gebouwd (route + Sanity-query op type "pagina"); BLOKKER: type "pagina" bestaat nog niet in Sanity Studio — Karel moet schema + document aanmaken; daarna redirect /exit-planning → /werkwijze uit netlify.toml halen en pagina opnemen in sitemap, llms.txt en navigatie
- [x] 3. llms.txt: drie tekstvervangingen, themalink gecorrigeerd, twee artikelen toegevoegd
- [x] 4. Structured data: description en knowsAbout aangepast, JSON-LD gevalideerd; Rich Results Test moet Karel na publicatie zelf draaien
- [x] 5. E-mailadres overal info@propasso.nl

## Openstaand uit eerdere rondes
- HubSpot floating chat: wacht op antwoorden (chatflow gepubliceerd? teasertekst? nudge-timing?)
- Bing meta-description: keuze Optie A (edge function) of B (fallback) nog niet gemaakt
- Sanity: slug artikel "Steeds meer ondernemers denken aan stoppen" corrigeren; artikel "Onder de loop" publishedAt 2027→2026
- Quickscan-plan (HubSpot-trigger + pushnotificatie) goedkeuren
- Na deploy: curl -I verificatie van 404/301's
- GTM: GA4-tag Consent Mode laten respecteren
