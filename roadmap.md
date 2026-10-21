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

## Prerendering (build-time, branch prerender-build, okt 2026)
- NIET WIJZIGEN zonder overleg: het buildcommando in netlify.toml is `bash scripts/netlify-build.sh`.
  Dat script draait `npm run build`, installeert puppeteer los en draait `node scripts/prerender.mjs`.
  Wordt het buildcommando teruggezet naar alleen `npm run build`, dan krijgen bots weer lege HTML.
- Op een deploy preview staat de volledige builduitvoer op /prerender-log.txt (het Netlify-buildlog laadt niet altijd).
- puppeteer staat bewust NIET in package.json; het wordt alleen tijdens de Netlify-build los geïnstalleerd. De Lovable-preview draait geen prerender.
- scripts/prerender.mjs rendert na vite build elke pagina naar statische HTML: dist/werkwijze.html, dist/kennisbank/<slug>.html, dist/kennisbank/thema/<slug>.html, / -> dist/index.html. De lege app staat in dist/app-shell.html.
- Alle SPA-rewrites en de 404-catch-all in netlify.toml wijzen naar /app-shell.html, niet naar /index.html (index.html is de geprerenderde homepage). Alleen de regel voor / wijst naar /index.html.
- Routes: vaste routes uit src/App.tsx (zonder parameters en zonder *, behalve /styleguide en /exit-planning) plus uit Sanity: gepubliceerde posts (publishedAt <= now, noIndex != true), alle categories en documenten van type pagina (alleen als App.tsx een route voor die slug heeft). Nieuwe vaste pagina in App.tsx = vanzelf meegenomen.
- Faalt één pagina (ook na een tweede poging), dan faalt de build en blijft de vorige versie live.
- Het script draait op http://localhost:4173; die origin staat in Sanity CORS (zonder credentials).
- Content verversen: .github/workflows/netlify-rebuild.yml. Sanity-webhook -> deze workflow (3 minuten wachten) -> Netlify build hook. Daarnaast elk uur een check op ingeplande artikelen die live gingen. Secret NETLIFY_BUILD_HOOK in GitHub. Workflowbestanden kan alleen Karel via GitHub toevoegen; de Claude-koppeling heeft daar geen rechten voor.
- routing.ts geeft een 301 van elk pad met een slash aan het eind (behalve /) naar het pad zonder slash.
- SEO.tsx: JSON-LD binnen Helmet moet als children (`{safeJsonLd(schema)}`), niet via dangerouslySetInnerHTML; dat laatste negeert react-helmet-async en dan verschijnt het JSON-LD nergens.

## Openstaand uit eerdere rondes
- HubSpot floating chat: wacht op antwoorden (chatflow gepubliceerd? teasertekst? nudge-timing?)
- Bing meta-description: keuze Optie A (edge function) of B (fallback) nog niet gemaakt
- Sanity: slug artikel "Steeds meer ondernemers denken aan stoppen" corrigeren; artikel "Onder de loop" publishedAt 2027→2026
- Quickscan-plan (HubSpot-trigger + pushnotificatie) goedkeuren
- Na deploy: curl -I verificatie van 404/301's
- GTM: GA4-tag Consent Mode laten respecteren
