# Roadmap

## Huidige taken (instructie 21 okt 2026)
- [x] 1. Redirects 301 toegevoegd, oude thema-slug uit beide sitemaps, interne links bijgewerkt; alle redirects waren al 301; catch-all 404 bestaat al
- [~] 2. /exit-planning-pagina gebouwd (route + Sanity-query op type "pagina"); BLOKKER: type "pagina" bestaat nog niet in Sanity Studio — Karel moet schema + document aanmaken; daarna redirect /exit-planning → /werkwijze uit netlify/edge-functions/routing.ts halen en pagina opnemen in sitemap, llms.txt en navigatie
- [x] 3. llms.txt: drie tekstvervangingen, themalink gecorrigeerd, twee artikelen toegevoegd
- [x] 4. Structured data: description en knowsAbout aangepast, JSON-LD gevalideerd; Rich Results Test moet Karel na publicatie zelf draaien
- [x] 5. E-mailadres overal info@propasso.nl

## Routing en statuscodes (21 okt 2026)
- Alle 301-doorverwijzingen staan in netlify/edge-functions/routing.ts. Nieuwe doorverwijzingen ALLEEN daar toevoegen, niet in netlify.toml: routing.ts draait als eerste, geldt voor mens en bot en is getest. netlify.toml bevat alleen rewrites naar /app-shell.html, de 410's en de 404-catch-all.
- routing.ts geeft een echte 404 voor /kennisbank/<slug> en /kennisbank/thema/<slug> die niet gepubliceerd in Sanity staan (artikelen met publishedAt in de toekomst tellen als niet gepubliceerd).
- Thema-slugs zijn definitief: ondernemingswaarde-en-winstgevendheid-verbeteren en het-persoonlijke-en-financiele-plan-na-overdracht. Oude varianten krijgen een 301.

## Prerendering (build-time, live sinds 21 okt 2026)
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
- De Netlify Prerender-extensie staat uit (21 okt 2026). Niet opnieuw aanzetten: die draait vóór routing.ts en geeft bots dan weer 200 in plaats van 301.
- Wie wat wijzigt: technische en SEO-code (routing.ts, sitemap.ts, netlify.toml, scripts/, SEO.tsx, index.html-head, structured data) wijzigt Claude via GitHub (branch, deploy preview, merge na akkoord Karel). Lovable doet pagina's, componenten en vormgeving en houdt zich aan de regels in dit bestand.
- SEO.tsx: JSON-LD binnen Helmet moet als children (`{safeJsonLd(schema)}`), niet via dangerouslySetInnerHTML; dat laatste negeert react-helmet-async en dan verschijnt het JSON-LD nergens.

## Openstaand uit eerdere rondes
- HubSpot floating chat: wacht op antwoorden (chatflow gepubliceerd? teasertekst? nudge-timing?)
- Bing meta-description: keuze Optie A (edge function) of B (fallback) nog niet gemaakt
- Quickscan-plan (HubSpot-trigger + pushnotificatie) goedkeuren
- GTM: GA4-tag Consent Mode laten respecteren
- [x] Artikeltemplate stap 1: direct antwoord bovenaan
- [x] Artikeltemplate stap 2-3: byline (foto 40px, naam als link naar /over-propasso, rol zonder reservetekst, datums in <time>, "Bijgewerkt op" alleen bij andere dag) + leestijd (woorden in body / 220 wpm, minimaal 1); getest op 375px zonder horizontaal scrollen
- [x] Artikeltemplate stap 4: typografie (17px/grit naar text-lg, foreground/85, leading 1,75, kolom 68ch, H2 mt-14 met scroll-mt-28, H3 medium); interne links (propasso.nl en /) same-tab via Link, externe links nieuw tabblad, focusring; getest op 375px
- [x] Artikeltemplate stap 9: auteursbox onderaan (kop "Over de auteur" als h2, foto 80px rond, naam, rol, bio via PortableText, links "Volg Karel op LinkedIn" extern en "Meer over Karel" intern; geen kaart zonder auteur, ontbrekende bio/rol/foto/link weggelaten); getest op 1280 en 375px, geen horizontaal scrollen
- [x] Artikeltemplate stap 10: eind-CTA (PageCTA onderaan: titel uit pillarCta.ctaTitle anders "Wil je weten waar jouw bedrijf staat?", tekst uit pillarCta.ctaText anders de quickscan-tekst; primary "Start de quickscan" → /quickscan, secondary "Neem contact op" → /contact). ctaType en ctaLabel worden niet meer gelezen (type blijft in types/sanity.ts), losse QuickscanCalloutBlock is weg. Volgorde: body, Over de auteur, Verder lezen, PageCTA. PageCTA.tsx niet aangepast. Getest met en zonder pijlerteksten op 1280 en 375px, geen horizontaal scrollen
- [x] Artikeltemplate stap 6: compacte quickscan-oproep vóór de tweede H2 (alleen bij ≥2 H2's), knop data-cta="kennisbank-midden"
- [x] Artikeltemplate stap 8: veelgestelde vragen (alleen articleType "antwoord" met gevulde vraag+antwoord, altijd open, geen JSON-LD)
- [x] Artikeltemplate stap 7: inhoudsopgave "In dit artikel" ALLEEN bij articleType "antwoord" én ≥4 H2's (bij inzichtartikelen geen inhoudsopgave), altijd open, unieke ankers; ids op de h2's blijven bij alle artikelen staan; laatste regel "Veelgestelde vragen" → #veelgestelde-vragen, alleen als het FAQ-blok ook getoond wordt (dezelfde helper getFaqItems als stap 8); FAQ-h2 heeft die id; getest op 1280 en 375px
- [ ] Artikeltemplate stap 5 en 11: wachten op akkoord (stap 5 heeft lege velden nodig — vulling pas bij artikel van 17 december)
- [x] Artikeltemplate afsluiter: post.closingNote als één cursieve alinea na de body en vóór "Veelgestelde vragen" (dunne lijn erboven, max-w-[68ch], geen kop of knop; leeg = niets). sanityQueries.ts en types/sanity.ts niet aangeraakt

## Portretfoto (29 okt 2026)
- [x] Nieuw portret van Karel gecropt naar 4:5 (1240x1550) als src/assets/images/karel-portret-2026.jpg; vervangt karel-portrait.jpg (contact), karel-portret-warm.jpg (homepage) en karel-portret-formeel.jpg (over-propasso); die drie oude bestanden zijn verwijderd. Foto getoond en bekeken op home, contact en over-propasso op 1280 en 375px.
- [ ] Portret in kennisbankartikelen (byline en "Over de auteur") komt uit Sanity (author.image) en is hier NIET aangepast: Karel moet daar in Studio hetzelfde beeld uploaden, Lovable heeft geen schrijfrechten op Sanity.

