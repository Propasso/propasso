

## Analyse: waarom de callout er "eenzaam" bijstaat

Op de Kennisbank-pagina zit de callout **in de hero**, omringd door tekst, breadcrumb en heading — hij voelt als onderdeel van het narratief. Op alle andere pagina's staat hij in een **kale wrapper**:

```text
<div class="py-12 md:py-16">
  <div class="section-container">
    <QuickscanSideCallout />
  </div>
</div>
```

Drie oorzaken:

1. **Geen context-brug**: er is geen overgangs-tekst of visuele koppeling naar de content erboven. De callout verschijnt als losstaand element, niet als logisch vervolg op wat de lezer net heeft gelezen.

2. **Te veel lege ruimte**: de `py-12 md:py-16` wrapper geeft evenveel padding als een volledige sectie, maar de callout zelf is compact (400px breed, ~120px hoog). Het resultaat is een klein element op een groot wit vlak.

3. **Flush-right design in een centered layout**: de desktop-callout is rechts uitgelijnd met `justify-end` — dat werkt als accent naast hero-tekst, maar in een eigen sectie-wrapper creëert het een onbalans: links is leeg, rechts zit de callout.

## Voorstel: contextuele inbedding per pagina

In plaats van de callout in een eigen losse wrapper te plaatsen, integreer hem **als afsluiter van de sectie erboven** — binnen dezelfde `section-container`, met een contextuele inleidende zin en minder padding.

### Concrete aanpak

**A. Wrapper aanpassen** — verwijder de losse `<div class="py-12">` wrapper. Plaats de callout onderaan de sectie die eraan voorafgaat, binnen diezelfde `section-container`, met alleen een `mt-12 md:mt-16` als scheiding.

**B. Contextuele intro-tekst toevoegen** — een korte zin boven de callout die aansluit bij het thema van de pagina:

| Pagina | Intro-tekst |
|---|---|
| **Werkwijze** | "Benieuwd hoe jouw bedrijf scoort op verkoopklaarheid?" |
| **Over Propasso** | "Ontdek waar jouw bedrijf staat" |
| **FAQ** | "Liever direct inzicht in jouw situatie?" |
| **KennisbankPillar** | "Hoe scoort jouw bedrijf op dit thema?" |
| **KennisbankArticle** | "Benieuwd hoe dit bij jouw bedrijf speelt?" |

Deze tekst wordt een `<p>` met `text-sm text-muted-foreground mb-3` — subtiel, niet schreeuwerig.

**C. Eventueel op Werkwijze en Over Propasso: lichte achtergrondband** — als de callout tussen twee witte secties valt, wrap met een subtiele `bg-secondary/30 rounded-2xl p-6` zodat hij visueel "ergens bij hoort".

### Technische wijzigingen

- `src/pages/Werkwijze.tsx` — verplaats callout naar binnen `MKBRealitySection`'s container of voeg intro-tekst + callout samen toe onderaan die sectie
- `src/pages/OverPropasso.tsx` — idem, onderaan de values-sectie
- `src/pages/VeelgesteldeVragen.tsx` — onderaan laatste FAQ-sectie
- `src/pages/KennisbankPillar.tsx` — onderaan article grid
- `src/pages/KennisbankArticle.tsx` — onderaan article content
- Optioneel: maak een `QuickscanCalloutBlock` wrapper-component die de intro-tekst + achtergrondband + callout bundelt, met een `contextLine` prop

