

# Huisstijl doorvoeren — Implementatieplan

## Scope

Alle CSS-token fixes zijn al doorgevoerd. Wat resteert is het updaten van component-level styling om de guide te volgen.

## Wijzigingen

### 1. Section padding updaten (14 bestanden)

Vervang `py-20 md:py-28` → `py-16 md:py-24 lg:py-36` in alle section-elementen:

- `src/components/ProblemSection.tsx`
- `src/components/PhasesSection.tsx`
- `src/components/WhyPropasso.tsx`
- `src/components/TargetAudience.tsx`
- `src/components/BlogSection.tsx`
- `src/components/CTASection.tsx`
- `src/components/PageCTA.tsx`
- `src/components/TestimonialsSection.tsx`
- `src/components/MethodologyFramework.tsx`
- `src/pages/OverPropasso.tsx` (6 secties)
- `src/pages/VeelgesteldeVragen.tsx`
- `src/pages/Kennisbank.tsx` (2 secties)
- `src/pages/Contact.tsx`
- Overige bestanden met `py-20 md:py-28`

### 2. Styleguide pagina updaten

Update de gedocumenteerde spacing waarde van `py-20 md:py-28` naar `py-16 md:py-24 lg:py-36`.

### 3. Teal-deep token verificatie

Check of `--teal-deep: 195 55% 15%` (#113640) moet worden `192 35% 17%` (#1F3740) — bevestig de juiste waarde.

### 4. Micro-interacties audit

Controleer of interactieve elementen (cards, buttons) `transition-colors duration-150` en hover shadow-transities hebben.

## Niet wijzigen

- Geen content, routing, SEO, of design-structuur wijzigingen
- Geen kleur-token wijzigingen (al correct)
- Geen typografie-token wijzigingen (al correct)

