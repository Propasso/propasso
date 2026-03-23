## Revised Plan: Trust Banner + Stats Bar + H1 Fix

### Changes from previous plan

1. **TrustBanner**: `position: relative` (not fixed), no z-index. No `pt` adjustment on HeroSection — keep `pt-20` as-is.
2. **Fonts**: No Inter import. Use existing DM Sans (the project body font) for all text in both components.
3. **H1 fix**: Change the `<h1>` in HeroSection to read "Exit Planning voor MKB-ondernemers | Bedrijf verkoopklaar maken" as the SEO-visible text, styled with existing heading classes.

### Files

**New: `src/components/StatsBar.tsx`**

- Background `#E7F2DC`, 56px vertical padding, three-column layout
- Stats in DM Sans Bold 52px, descriptions in DM Sans 14px color `#2C786F`
- Count-up animation via IntersectionObserver for 78% and 40%+; fade-in for "3–5 jaar"
- Olive separators, mobile vertical stack with horizontal lines

**Modified: `src/components/HeroSection.tsx`**

- Change the `<motion.h1>` text content to: `"Exit Planning voor MKB-ondernemers | Bedrijf verkoopklaar maken"`
- Keep existing two-tone styling: first part in `text-foreground`, second part (after `|`) in `text-muted-foreground` via a `<span>`
- Keep `pt-20` unchanged

**Modified: `src/pages/Index.tsx`**

- Insert `<StatsBar />` between `<HeroSection />` and `<ProblemSection />`

**Modified: `index.html`**

- Update the fallback `<h1>` text to match: "Exit Planning voor MKB-ondernemers | Bedrijf verkoopklaar maken – Propasso"

**No changes to `src/index.css`** — no new font imports.
