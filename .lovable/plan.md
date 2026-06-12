## Doel

Twee nieuwe zwart-wit portretfoto's van Karel toevoegen aan de site, op plekken waar ze de pagina persoonlijker maken zonder de visuele hiërarchie te verstoren.

## Foto 1 — IMG_5644 (lachend, polo, warm)

**Plek: Homepage, nieuwe sectie "Maak kennis met Karel" tussen `WhyPropasso` en `TargetAudience`.**

Een nieuwe, ingetogen sectie die de bezoeker midden in de homepage een gezicht geeft bij Propasso. Dit is op de homepage nu de zwakke schakel: er staat veel "wat" en "waarom", maar geen "wie".

Opbouw:
- Volle sectie met `section-alt-bg` zodat hij ademruimte krijgt tussen de omliggende blokken.
- Asymmetrische 5/7-grid (desktop): links de foto in 4:5 portrait, rounded-2xl met zachte shadow, lime accent-blok offset linksonder (zelfde patroon als Over Propasso). Rechts: eyebrow "Maak kennis", H2 ("Een gids die zelf de berg op is geweest" of vergelijkbaar), korte intro van 2-3 zinnen, en twee subtiele links: "Meer over Karel" (naar /over-propasso) en "Plan een kennismaking" (naar /contact).
- Mobiel: foto boven, tekst onder, foto max ~75% breedte gecentreerd zodat hij niet domineert.
- Tekst gebruikt jij/jouw, "subtiel & droog", geen em-dashes, zoals voorgeschreven in core memory.

Nieuwe component: `src/components/MeetKarelSection.tsx`.

## Foto 2 — IMG_5599 (neutraal, ingetogen, gezaghebbend)

**Plek: /over-propasso, vervangt het bestaande `karelMetOndernemers` portret in de sectie "Ondernemer voor ondernemers" (regel 255-268).**

Deze foto past beter bij de toon van die sectie (kalm, professioneel, autoritair) dan de huidige groepsfoto. Het bestaande lime quote-blok ("Mijn kracht zit in het combineren van ondernemerschap, strategie en cijfers.") blijft staan en versterkt het portret.

Aanpassing:
- Import en `<img src>` swappen naar het nieuwe bestand.
- Aspect blijft `aspect-[4/5]`, `object-cover` met `object-position: center 30%` zodat het gezicht goed in frame staat.
- Alt-tekst bijwerken naar "Karel Cremers, oprichter van Propasso".

## Wat niet verandert

- Bestaande contactpagina-foto blijft staan (die hebben we vorige beurt al ingericht).
- Geen foto's in footer, cards, of werkwijze/kennisbank pagina's.
- Geen wijzigingen aan SEO, schema's, of routing.

## Technische uitvoering

```text
src/assets/images/
├── karel-portret-warm.jpg      (nieuw, uit IMG_5644)
└── karel-portret-formeel.jpg   (nieuw, uit IMG_5599)

src/components/
└── MeetKarelSection.tsx        (nieuw)

src/pages/Index.tsx             (sectie tussen WhyPropasso en TargetAudience)
src/pages/OverPropasso.tsx      (image swap regel 257-261)
```

Bestanden uploaden via `lovable-assets` is hier niet nodig — de andere Karel-foto's staan ook lokaal in `src/assets/images/`, dus we houden dezelfde conventie aan voor consistentie.
