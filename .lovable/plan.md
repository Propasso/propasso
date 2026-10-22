# Verbeterplan artikeltemplate kennisbank

Alles gebeurt in `src/pages/KennisbankArticle.tsx` (en eventueel kleine nieuwe componenten in `src/components/kennisbank/`). JSON-LD, SEO.tsx, sanityQueries.ts, types/sanity.ts, netlify.toml, scripts/ en netlify/ blijven ongewijzigd. Elk onderdeel rendert niets (of de huidige fallback) als het veld leeg is, zodat de vooraf gerenderde build nooit op één artikel stukloopt.

## Uitvoeringsvolgorde (één onderdeel per stap)

### Stap 1. Direct antwoord bovenaan
- Nu: blok "Samenvatting" toont altijd `summary`, met een H2 als label.
- Voorstel: toon `directAnswer`, valt terug op `summary`. Label "In het kort" als `<p>` (geen kop). Plaats direct onder titel en byline, vóór de afbeelding, zodat het antwoord boven de vouw staat. Grotere tekst (text-lg), lime-accentrand links, tekstkleur foreground.
- Waarom: Google-snippets en AI-assistenten nemen de eerste heldere alinea over; de huidige H2 "Samenvatting" verstoort de koppenstructuur.
- Velden: directAnswer, summary. Risico: laag; beide leeg dan geen blok.

### Stap 2. Byline onder de titel
- Nu: alleen een datum; auteur is onzichtbaar.
- Voorstel: ronde foto (40px, `urlFor(...).width(80).height(80)`), naam, rol ("Ondernemer en exit planner" als rol leeg is), publicatiedatum, "Bijgewerkt op ..." als `lastUpdated` gevuld is en afwijkt, plus leestijd. Naam linkt naar /over-propasso.
- Waarom: autoriteit (doel 1) en E-E-A-T-signaal; "bijgewerkt" toont actualiteit.
- Velden: author.name/role/image/imageAlt, publishedAt, lastUpdated. Risico: geen auteur gekoppeld; dan alleen datums tonen.

### Stap 3. Leestijd
- Voorstel: tel woorden in de tekstblokken van `body` (ca. 220 woorden per minuut, minimaal 1). Gedeelde helper in hetzelfde bestand.
- Velden: body. Risico: geen body, dan geen leestijd.

### Stap 4. Typografie en leesbaarheid lopende tekst
- Nu: lopende tekst en lijsten in `text-muted-foreground` (te weinig contrast voor 45+ lezers), standaard 16px.
- Voorstel: tekst `text-foreground/85`, `text-[17px] md:text-lg`, `leading-[1.75]`, alinea-afstand mb-5, tekstkolom max ca. 68 tekens (`max-w-[68ch]`) binnen de bestaande max-w-3xl. H2 mt-14 met `scroll-mt-28` (vaste header), H3 font-medium conform huisstijl. Interne links (beginnen met `/` of propasso.nl) openen in hetzelfde tabblad via `Link`; alleen externe links in nieuw tabblad met `rel="noopener noreferrer"`. Zichtbare focusring op links.
- Waarom: WCAG AA-contrast, rustiger leesritme, betere interne linkwaarde.
- Risico: laag; puur presentatie.

### Stap 5. Kernzin (keyInsight)
- Voorstel: opvallend citaatblok (DM Serif Display, groot, navy met lime streep) na de eerste H2-sectie, of na de inleiding als er geen H2 is. Markering als `<figure><blockquote>`, geen kop.
- Waarom: een inzicht dat blijft hangen en citeerbaar is voor AI.
- Velden: keyInsight. Risico: leeg, dan niets.

### Stap 6. Quickscan-CTA halverwege
- Nu: quickscan-callout pas onder "Verder lezen".
- Voorstel: splits `body` op de index van de tweede H2; voeg daar een inline quickscan-blok in (`QuickscanCalloutBlock`-stijl, maar binnen de tekstkolom) met `pillarCta.ctaTitle` / `ctaText`, terugvallend op "Hoe verkoopklaar is jouw bedrijf?" en de huidige 4-minutentekst. Minder dan twee H2's: blok na ongeveer de helft van de blokken; heel kort artikel: overslaan.
- Waarom: conversie halverwege (doel 3) op het moment dat de lezer betrokken is.
- Velden: body, pillarCta. Risico: lijstitems horen bij elkaar; splitsen alleen op blokgrens vóór een H2, nooit midden in een lijst.

### Stap 7. Inhoudsopgave bij lange antwoordpagina's
- Voorstel: alleen bij 4 of meer H2's. Inklapbaar blok "In dit artikel" (shadcn Collapsible) onder het directe antwoord, links naar ankers die uit de H2-tekst worden afgeleid (slug, uniek gemaakt). Op desktop gewoon open, op mobiel standaard dicht.
- Waarom: scanbaarheid, sprongkoppelingen in Google. Bij korte artikelen voegt het niets toe.
- Velden: body. Risico: dubbele koppen; oplossen met volgnummer in anker.

### Stap 8. Vragenblok (FAQ)
- Voorstel: alleen bij `articleType === "antwoord"` en minimaal één vraag met tekst. Sectie met H2 "Veelgestelde vragen" en shadcn Accordion; antwoorden staan altijd in de HTML (ook ingeklapt) zodat crawlers ze lezen. Geen nieuwe FAQ-JSON-LD (die regel is buiten scope; eventueel later apart).
- Velden: faq, articleType. Risico: lege vragen of antwoorden worden overgeslagen.

### Stap 9. Auteursbox onderaan
- Voorstel: kaart na de tekst: foto, naam, rol, `bio` via PortableText, link naar LinkedIn (extern) en naar /over-propasso. Zonder bio: korte vaste tekst over Karel.
- Velden: author.*. Risico: geen auteur, dan geen box.

### Stap 10. Eind-CTA repareren
- Nu: `post.ctaType` bestaat niet in Sanity, dus altijd "Neem contact op" naar /contact; daarnaast een losse quickscan-callout onder "Verder lezen" (dubbel).
- Voorstel: `ctaType` niet meer gebruiken. Eind-`PageCTA` met primaire knop "Start de quickscan" naar /quickscan en secundaire knop "Neem contact op" naar /contact; titel en tekst uit `pillarCta`, fallback naar de huidige teksten. De losse `QuickscanCalloutBlock` onderaan vervalt (vervangen door stap 6). Volgorde onderaan: FAQ, auteursbox, Verder lezen, eind-CTA.
- Waarom: de quickscan is de gewenste conversie; contact blijft beschikbaar als tweede weg.
- Risico: laag. Type `ctaType` blijft in types/sanity.ts staan maar wordt niet gelezen.

### Stap 11. Mobiel en toegankelijkheid nalopen
- Controle op 375px en 1280px: geen horizontaal scrollen, knoppen minimaal 44px hoog, afbeeldingen met `loading="lazy"` behalve de hoofdafbeelding, alt-teksten, `<time dateTime>` voor datums, "Lees het artikel: titel" in Verder lezen inkorten tot "Lees verder" met `aria-label` met de titel (nu dubbele titel zichtbaar).
- Verificatie per stap: build moet slagen, en een Playwright-check van één antwoord- en één inzichtartikel.

## Bekende risico's buiten deze opdracht
- `relatedPosts` in de query filtert niet op `publishedAt <= now()`, waardoor toekomstige artikelen (zoals het 2027-artikel) als gerelateerd kunnen verschijnen. Oplossing vereist een wijziging in sanityQueries.ts; apart voorleggen.
- Exacte vulling van directAnswer, keyInsight, faq en pillarCta per artikel in Sanity is niet gecontroleerd; het plan werkt ook als ze leeg zijn.
