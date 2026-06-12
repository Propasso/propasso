## Plan: Wayfinding — "waar ben ik op de site?"

Drie-laagse aanpak die gebruikers op elke pagina direct laat zien waar ze zijn.

---

### Fase 1 — Active state in de hoofdnavigatie

**Bestand:** `src/components/Header.tsx`

- Vervang plain `<Link>` voor nav-items door `NavLink` (react-router) of gebruik `useLocation` om actief te detecteren.
- Actieve link styling: `text-foreground font-semibold` (donker + bold). Inactief blijft `text-foreground/70 font-medium`.
- Voeg `aria-current="page"` toe op de actieve link (toegankelijkheid).
- Match-logica:
  - Exacte match voor `/werkwijze`, `/over-propasso`, `/veelgestelde-vragen`, `/contact`, `/quickscan`.
  - `/kennisbank` is actief op `/kennisbank`, `/kennisbank/thema/*` én `/kennisbank/*` (prefix match).
- Geldt voor:
  - Desktop nav-items
  - "Quickscan" en "Contact" buttons in header (subtieler accent omdat dit al gestylede CTA's zijn — bv. een extra lime ring of de bestaande styling laten staan met `aria-current`)
  - Mobiel menu (zelfde donker+bold patroon)

### Fase 2 — H1-audit per top-level pagina

Controleer en corrigeer dat elke pagina direct onder de header **één duidelijke H1** toont die overeenkomt met het nav-label. Te checken pagina's:

- `/werkwijze` → `src/pages/Werkwijze.tsx`
- `/over-propasso` → `src/pages/OverPropasso.tsx`
- `/contact` → `src/pages/Contact.tsx`
- `/veelgestelde-vragen` → `src/pages/VeelgesteldeVragen.tsx`
- `/kennisbank` → `src/pages/Kennisbank.tsx`
- `/quickscan` → `src/pages/Quickscan.tsx`
- Juridische pagina's via `LegalPage` component

Per pagina valideren: H1 aanwezig, semantisch correct (geen `<div className="text-4xl">`), tekstueel consistent met nav-label, en visueel prominent (binnen bestaande styleguide — geen nieuwe stijl uitvinden). Alleen aanpassen waar het ontbreekt of niet klopt.

### Fase 3 — Breadcrumbs uitrollen

Op dit moment bestaat `KennisbankBreadcrumb` alleen voor de kennisbank-tak. Breid uit naar alle subpagina's.

**Aanpak:**
1. Promote/generaliseer naar een herbruikbare `Breadcrumb`-wrapper: `src/components/PageBreadcrumb.tsx` op basis van het bestaande shadcn `breadcrumb`-component en het `KennisbankBreadcrumb`-patroon.
2. Plaats breadcrumbs **direct onder de Header**, boven de H1/hero — subtiel (`text-sm text-muted-foreground`, dezelfde container als de pagina).
3. Toevoegen aan:
   - `/werkwijze` → Home › Werkwijze
   - `/over-propasso` → Home › Over Propasso
   - `/contact` → Home › Contact
   - `/veelgestelde-vragen` → Home › Veelgestelde vragen
   - `/quickscan` → Home › Quickscan
   - Juridische pagina's → Home › [Disclaimer/Privacy/etc.]
4. Kennisbank-tak blijft `KennisbankBreadcrumb` gebruiken (of migreert naar de nieuwe component met identieke output).
5. Homepage krijgt **geen** breadcrumb (overbodig).

**SEO-bonus:** voeg `BreadcrumbList` JSON-LD toe per pagina (via bestaande `SEO`-component of inline) voor rich results in Google. Optioneel maar past bij de authority-strategie.

---

### Visuele consistentie

- Geen nieuwe kleuren of fonts. Active state = donkerder + bold met bestaande tokens. Breadcrumbs gebruiken bestaande `muted-foreground` + `foreground` op de actieve crumb.
- Geen animaties of mouseover-tricks toevoegen — passief, statisch, premium.

### Gewijzigde bestanden

- `src/components/Header.tsx` — active state logica
- `src/components/PageBreadcrumb.tsx` — **nieuw**, herbruikbaar
- Eventueel `src/components/KennisbankBreadcrumb.tsx` — refactoren naar wrapper rond `PageBreadcrumb` (of laten staan)
- `src/pages/Werkwijze.tsx`, `OverPropasso.tsx`, `Contact.tsx`, `VeelgesteldeVragen.tsx`, `Quickscan.tsx`, `Kennisbank.tsx` — breadcrumb toevoegen + H1 audit
- `src/components/LegalPage.tsx` — breadcrumb toevoegen voor juridische pagina's

### Niet in scope

- Geen redesign van bestaande hero's.
- Geen wijzigingen aan kleuren-tokens of typografie-schaal.
- Geen footer-navigatie aanpassingen (huidige werkt prima).
