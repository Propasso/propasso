import SEO from "@/components/SEO";

const colorTokens = [
  { name: "--background", label: "Background", usage: "Page background" },
  { name: "--foreground", label: "Foreground", usage: "Primary text" },
  { name: "--primary", label: "Primary", usage: "Buttons, links, brand" },
  { name: "--primary-foreground", label: "Primary Foreground", usage: "Text on primary" },
  { name: "--secondary", label: "Secondary", usage: "Cards, subtle backgrounds" },
  { name: "--muted", label: "Muted", usage: "Disabled, subtle backgrounds" },
  { name: "--muted-foreground", label: "Muted Foreground", usage: "Secondary text" },
  { name: "--accent", label: "Accent (#DEF249)", usage: "Punch color, CTAs, eyebrow dots" },
  { name: "--accent-foreground", label: "Accent Foreground", usage: "Text on accent" },
  { name: "--destructive", label: "Destructive", usage: "Errors, negative states" },
  { name: "--border", label: "Border", usage: "Dividers, card borders" },
  { name: "--section-alt", label: "Section Alt", usage: "Alternating section backgrounds" },
  { name: "--teal-deep", label: "Teal Deep", usage: "Deep brand teal" },
  { name: "--teal-medium", label: "Teal Medium", usage: "Hero subtitle, hover states" },
  { name: "--surface-raised", label: "Surface Raised", usage: "Elevated card surfaces" },
  { name: "--text-subtle", label: "Text Subtle", usage: "Tertiary text, captions" },
  { name: "--success", label: "Success", usage: "Positive states" },
  { name: "--warning", label: "Warning", usage: "Caution states" },
];

const tintTokens = [
  { name: "tint-teal-bg", label: "Teal Tint (#2C786F38)", description: "Background tint for teal overlays" },
  { name: "tint-white-bg", label: "White Tint (#FFFFFF38)", description: "Background tint for white overlays" },
];

const Styleguide = () => {
  return (
    <>
    <SEO
      title="Styleguide | Propasso (intern)"
      description="Intern referentiedocument voor het Propasso design system."
      canonical="https://propasso.nl/styleguide"
      noIndex={true}
    />
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold">Propasso Design System</h1>
          <p className="mt-3 text-primary-foreground/70 text-lg">
            Styleguide — intern referentiedocument voor visuele consistentie
          </p>
        </div>
      </div>

      <div className="section-container py-16 space-y-20">

        {/* ── TYPOGRAPHY ── */}
        <section>
          <h2 className="text-3xl font-bold border-b border-border pb-4 mb-8">Typografie</h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">H1 — DM Sans Bold, 4xl–7xl</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
                Een succesvolle verkoop begint jaren vóór de deal.
              </h1>
            </div>

            <div className="p-6 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">H2 — DM Sans Bold, 3xl–5xl</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                De meeste bedrijven zijn niet te laat om te verkopen
              </h2>
            </div>

            <div className="p-6 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">H3 — DM Sans Bold, xl</p>
              <h3 className="text-xl font-bold">Inzicht & positionering</h3>
            </div>

            <div className="p-6 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">H4 — DM Sans Bold, lg</p>
              <h4 className="text-lg font-bold">Subsectie-kop</h4>
            </div>

            <div className="p-6 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Body — DM Sans Regular, base/lg</p>
              <p className="text-base leading-relaxed max-w-2xl">
                Wij begeleiden MKB-ondernemers in de 3-5 jaar vóór de bedrijfsoverdracht naar maximale waarde en verkoopbaarheid, met een helder plan en regie voor de ondernemer.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Small / Caption — DM Sans, sm</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Praktische inzichten over waardecreatie en het verkoopklaar maken van bedrijven.
              </p>
            </div>
          </div>
        </section>

        {/* ── EYEBROW ── */}
        <section>
          <h2 className="text-3xl font-bold border-b border-border pb-4 mb-8">Eyebrow Label</h2>
          <div className="p-6 rounded-xl border border-border space-y-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Eyebrow — replaces decorative headings for section labels</p>
            <p className="eyebrow">Het probleem dat ondernemers onderschatten</p>
            <p className="eyebrow">De drie fases van een bedrijfsoverdracht</p>
            <p className="eyebrow">Partner voor succesvolle bedrijfsoverdracht</p>
          </div>
        </section>

        {/* ── COLORS ── */}
        <section>
          <h2 className="text-3xl font-bold border-b border-border pb-4 mb-8">Kleuren & Tokens</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {colorTokens.map((token) => (
              <div key={token.name} className="rounded-xl border border-border overflow-hidden">
                <div
                  className="h-20"
                  style={{ backgroundColor: `hsl(var(${token.name}))` }}
                />
                <div className="p-3">
                  <p className="text-xs font-bold">{token.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{token.name}</p>
                  <p className="text-xs text-text-subtle mt-1">{token.usage}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mt-10 mb-4">Background Tints (verplicht)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tintTokens.map((tint) => (
              <div key={tint.name} className="rounded-xl border border-border overflow-hidden">
                <div className={`h-20 ${tint.name} border-b border-border`} />
                <div className="p-3">
                  <p className="text-xs font-bold">{tint.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{tint.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BUTTONS ── */}
        <section>
          <h2 className="text-3xl font-bold border-b border-border pb-4 mb-8">Buttons</h2>

          <div className="space-y-8">
            <div className="p-6 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Primary CTA — rounded-full, bg-primary</p>
              <div className="flex flex-wrap gap-4">
                <a className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground hover:bg-teal-medium transition-colors cursor-pointer">
                  Krijg inzicht in je verkoopklaarheid
                </a>
                <a className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground hover:brightness-110 transition cursor-pointer">
                  Accent CTA
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Secondary CTA — rounded-full, border-2</p>
              <a className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-7 py-4 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                Plan een kennismaking
              </a>
            </div>

            <div className="p-6 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Text Link CTA</p>
              <a className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all cursor-pointer">
                Meer weten? →
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION COMPONENTS ── */}
        <section>
          <h2 className="text-3xl font-bold border-b border-border pb-4 mb-8">Section Backgrounds</h2>

          <div className="space-y-4">
            <div className="p-8 rounded-xl border border-border bg-background">
              <p className="text-sm font-bold">Default — bg-background</p>
              <p className="text-sm text-muted-foreground">White background sections</p>
            </div>
            <div className="p-8 rounded-xl border border-border section-alt-bg">
              <p className="text-sm font-bold">Alternate — section-alt-bg</p>
              <p className="text-sm text-muted-foreground">Light teal-tinted section background</p>
            </div>
            <div className="p-8 rounded-xl bg-primary text-primary-foreground">
              <p className="text-sm font-bold">Dark — bg-primary</p>
              <p className="text-sm text-primary-foreground/70">CTA / conversion sections</p>
            </div>
            <div className="p-8 rounded-xl bg-foreground text-background">
              <p className="text-sm font-bold">Footer — bg-foreground</p>
              <p className="text-sm text-background/60">Footer section</p>
            </div>
            <div className="p-8 rounded-xl border border-border tint-teal-bg">
              <p className="text-sm font-bold">Teal Tint — tint-teal-bg</p>
              <p className="text-sm text-muted-foreground">Subtle teal overlay (#2C786F38)</p>
            </div>
            <div className="p-8 rounded-xl border border-border tint-white-bg">
              <p className="text-sm font-bold">White Tint — tint-white-bg</p>
              <p className="text-sm text-muted-foreground">Subtle white overlay (#FFFFFF38)</p>
            </div>
          </div>
        </section>

        {/* ── CARD PATTERNS ── */}
        <section>
          <h2 className="text-3xl font-bold border-b border-border pb-4 mb-8">Card Patterns</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border/50">
              <span className="text-5xl font-bold text-accent/40 font-serif">01</span>
              <h3 className="mt-4 text-xl font-bold">Phase Card</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
                Used for process phases with numbered steps.
              </p>
            </div>

            <div className="flex gap-5 p-6 rounded-2xl border border-border/50 bg-background hover:shadow-md transition-shadow">
              <div className="shrink-0 h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <span className="text-primary font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Value Card</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Used for features and value propositions.
                </p>
              </div>
            </div>

            <div className="bg-secondary rounded-2xl p-8">
              <span className="text-accent text-2xl mb-4 block">"</span>
              <p className="text-sm leading-relaxed text-foreground/80 italic">
                "Testimonial card pattern for client quotes."
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <span className="font-bold text-sm block">Naam Achternaam</span>
                <span className="text-xs text-muted-foreground">Functie</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── ICON BOXES ── */}
        <section>
          <h2 className="text-3xl font-bold border-b border-border pb-4 mb-8">Icon Containers</h2>
          <div className="flex gap-6 flex-wrap">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <span className="text-primary">☰</span>
            </div>
            <div className="shrink-0 h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <span className="text-primary">★</span>
            </div>
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/30">
              <span className="text-primary text-xs">✓</span>
            </div>
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10">
              <span className="text-destructive text-xs">✗</span>
            </div>
          </div>
        </section>

        {/* ── SPACING REFERENCE ── */}
        <section>
          <h2 className="text-3xl font-bold border-b border-border pb-4 mb-8">Spacing & Layout</h2>
          <div className="p-6 rounded-xl border border-border space-y-3 text-sm">
            <p><strong>Section padding:</strong> py-20 md:py-28</p>
            <p><strong>Container:</strong> section-container (max-w-7xl, px-5 sm:px-8 lg:px-12)</p>
            <p><strong>Grid gaps:</strong> gap-6 to gap-8</p>
            <p><strong>Card padding:</strong> p-6 to p-8</p>
            <p><strong>Rounded corners:</strong> rounded-xl to rounded-2xl</p>
            <p><strong>Font family:</strong> DM Sans (sans), DM Serif Display (serif — phase numbers only)</p>
          </div>
        </section>

      </div>
    </main>
    </>
  );
};

export default Styleguide;
