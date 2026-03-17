

## Plan: FAQ callout verplaatsen + nieuw QuickscanBanner voor Werkwijze & Over Propasso

### 1. FAQ — callout naar hero (zoals Kennisbank)

Verplaats de `QuickscanCalloutBlock` uit de FAQ-secties naar de hero, direct na de intro-tekst met `mt-10`, identiek aan de Kennisbank-pagina. Gebruik hier gewoon `QuickscanSideCallout` (niet de block-wrapper).

### 2. Nieuw `QuickscanBanner` component — wow-factor design

Een breed, compact, gecentreerd banner dat visueel indruk maakt zonder schreeuwerig te zijn. Vervangt `QuickscanCalloutBlock` op Werkwijze en Over Propasso.

**Design concept — "Glassmorphism ribbon":**

```text
┌─────────────────────────────────────────────────────────────────┐
│ ┃  GRATIS QUICKSCAN                                            │
│ ┃                                                    [summit]  │
│ ┃  Hoe aantrekkelijk is jouw bedrijf        ┌──────────────┐   │
│ ┃  voor kopers?                              │ Start de scan │  │
│ ┃  Ontdek in 4 min jouw score...             │      →       │   │
│ ┃                                            └──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

- Full `section-container` width, `rounded-2xl`, max height ~120px
- Background: `bg-gradient-to-br from-primary/[0.04] via-card to-accent/[0.06]` met subtle `backdrop-blur`
- Left: 3px gradient border (primary → accent), consistent met bestaande callout DNA
- Summit flag illustration als ghosted watermark rechts (`opacity-[0.05]`, 80px)
- Eyebrow "Gratis quickscan" in uppercase tracking
- Bold headline + one-liner subtitle
- CTA button rechts: `rounded-full bg-primary` met hover glow `shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)]`
- Subtle `border border-border/20` voor definition
- Hover: entire card lifts with `hover:-translate-y-0.5 hover:shadow-lg` transition
- Mobile: stacks vertically, button full-width

### Technische wijzigingen

| File | Actie |
|---|---|
| `src/components/QuickscanBanner.tsx` | Nieuw component |
| `src/pages/VeelgesteldeVragen.tsx` | Callout van FAQ-sectie naar hero (`mt-10`, `QuickscanSideCallout`) |
| `src/pages/Werkwijze.tsx` | Vervang `QuickscanCalloutBlock` door `QuickscanBanner` |
| `src/pages/OverPropasso.tsx` | Vervang `QuickscanCalloutBlock` door `QuickscanBanner` |

De `QuickscanCalloutBlock` blijft bestaan voor eventueel gebruik op andere pagina's (KennisbankPillar, KennisbankArticle).

