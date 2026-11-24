import { Link } from "react-router-dom";
import type { ComponentType, SVGProps } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { IconEnDan, IconFamilie, IconVerkoopklaar, IconWaardering, IconZelfstandig } from "@/components/ThemeIcons";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { fetchHomepageThemes } from "@/lib/sanityQueries";
import { countWord } from "@/lib/countWord";
import { Skeleton } from "@/components/ui/skeleton";

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

// Icoon per thema, gekoppeld aan de slug (niet aan de volgorde in Sanity).
// Nieuw thema zonder icoon hier: valt terug op BookOpen.
const THEME_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "bedrijf-verkoopklaar-maken": IconVerkoopklaar,
  "afhankelijkheid-ondernemer-zelfstandig-bedrijf": IconZelfstandig,
  "bedrijfswaardering-en-verkoopopbrengst": IconWaardering,
  "overdracht-familiebedrijf": IconFamilie,
  "bedrijf-verkocht-en-dan": IconEnDan,
};

const ThemesSection = () => {
  const reduceMotion = useReducedMotion();
  const { data: themes, isLoading, isError } = useQuery({
    queryKey: ["sanity-home-themes"],
    queryFn: fetchHomepageThemes,
  });

  if (isError || (!isLoading && (!themes || themes.length === 0))) return null;

  const count = themes?.length;
  const motionProps = reduceMotion ? {} : fadeIn;

  return (
    <motion.section aria-labelledby="themas-heading" className="py-20 md:py-28 relative" {...motionProps}>
      <div className="section-container relative z-10 lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Exit Planning</p>
          <h2 id="themas-heading" className="mt-5 text-3xl md:text-4xl font-bold leading-tight text-balance">
            Wat komt er kijken bij het verkoopklaar maken van je bedrijf?
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Je bedrijf verkoopklaar maken is het werk dat je doet in de drie tot vijf jaar vóór een overdracht. Je
            maakt je bedrijf minder afhankelijk van jou, je richt het zo in dat iemand anders het kan overnemen en je
            verbetert de winstgevendheid, zodat de ondernemingswaarde stijgt. Daarnaast zorg je dat je zelf klaar bent
            voor de tijd na de verkoop. Bij Propasso hebben we het proces van verkoopklaar maken van je bedrijf onderverdeeld
            naar {count ? `${countWord(count)} ` : ""}thema&apos;s.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            De thema&apos;s houden verband met elkaar en zijn afhankelijk van het soort bedrijf en de jouw persoonlijke,
            financiele en zakelijke situatie. Elk thema heeft haar eigen pagina waarin praktijksituaties, kennis, inzichten 
            worden besproken en waar ik ervaringen deel uit mijn ondernemersschap en de bedrijfsverkoop.
          </p>
          <Link
            to="/kennisbank"
            data-cta="home-kennisbank"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary rounded-md hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Alle artikelen in de kennisbank
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative mt-10 lg:mt-0 lg:col-span-7">
          <ul className="relative space-y-3">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <li key={i}>
                    <Skeleton className="h-[112px] w-full rounded-2xl bg-white/50" />
                  </li>
                ))
              : themes!.map((theme) => {
                  const Icon = THEME_ICONS[theme.slug] ?? BookOpen;
                  return (
                    <li key={theme._id}>
                      <Link
                        to={`/kennisbank/thema/${theme.slug}`}
                        data-cta="home-thema"
                        data-thema={theme.slug}
                        className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-4 sm:gap-x-5 overflow-hidden rounded-2xl border border-white/70 bg-white/45 p-5 sm:p-6 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_30px_-12px_hsl(var(--primary)/0.18)] transition-colors duration-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/60 before:via-white/0 before:to-transparent hover:border-primary/30 hover:bg-white/60 focus-visible:border-primary/30 focus-visible:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <span
                          aria-hidden="true"
                          className="relative col-start-1 row-start-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/25 text-primary transition-colors duration-300 group-hover:bg-accent group-focus-visible:bg-accent"
                        >
                          <Icon className="h-[22px] w-[22px]" />
                        </span>
                        <div className="relative col-span-3 row-start-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                          <h3 className="text-lg font-semibold leading-snug text-foreground">{theme.title}</h3>
                          {theme.description && (
                            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{theme.description}</p>
                          )}
                        </div>
                        <span className="relative col-start-3 row-start-1 flex flex-col items-end gap-1 sm:pl-2">
                          {theme.articleCount > 0 && (
                            <span className="flex items-center gap-1.5">
                              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
                              <span className="stat-number text-3xl leading-none">{theme.articleCount}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            {theme.articleCount > 0 && (theme.articleCount === 1 ? "artikel" : "artikelen")}
                            <ArrowRight
                              aria-hidden="true"
                              className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                            />
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default ThemesSection;
