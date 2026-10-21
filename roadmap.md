# Roadmap

## Huidige taken (instructie 21 okt 2026)
- [ ] 1. Redirects: /kennisbank/bedrijfswaarde-verhogen-waardedrijvers en /kennisbank/thema/bedrijfswaardering-en-waardedrijvers → 301 naar /kennisbank/thema/de-waardering-van-je-bedrijf; oude slug uit sitemaps; verifiëren dat alle redirects 301 zijn en onbekende URL's echte 404 geven
- [ ] 2. Nieuwe pagina /exit-planning uit Sanity (type: pagina, slug: exit-planning), opmaak als themapagina's; redirect naar /werkwijze blijft actief tot publicatie; daarna opnemen in sitemap, llms.txt en navigatie
- [ ] 3. llms.txt: drie tekstvervangingen, themalink corrigeren, twee artikelen onder Optional toevoegen
- [ ] 4. Structured data: description vervangen, knowsAbout aanpassen, Rich Results Test
- [ ] 5. E-mailadres hallo@propasso.nl → info@propasso.nl overal

## Openstaand uit eerdere rondes
- HubSpot floating chat: wacht op antwoorden (chatflow gepubliceerd? teasertekst? nudge-timing?)
- Bing meta-description: keuze Optie A (edge function) of B (fallback) nog niet gemaakt
- Sanity: slug artikel "Steeds meer ondernemers denken aan stoppen" corrigeren; artikel "Onder de loop" publishedAt 2027→2026
- Quickscan-plan (HubSpot-trigger + pushnotificatie) goedkeuren
- Na deploy: curl -I verificatie van 404/301's
- GTM: GA4-tag Consent Mode laten respecteren
