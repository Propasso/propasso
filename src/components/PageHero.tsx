import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageBreadcrumb, { type BreadcrumbEntry } from "@/components/PageBreadcrumb";

/**
 * Standaard hero voor alle subpagina's (Werkwijze, Over Propasso, Kennisbank,
 * Veelgestelde vragen, ...). Eén vaste opbouw:
 * broodkruimel → eyebrow → H1 → intro → knoppenrij, met optionele
 * decoratieve illustratie rechts (alleen vanaf md, nooit achter de tekst).
 *
 * Regels (zie roadmap.md, "Hero's"):
 * - Geen min-h of verticale centrering: de hoogte volgt de inhoud, zodat de
 *   volgende sectie boven de vouw zichtbaar begint.
 * - Geen extra top-padding voor de header: PageLayout (<main pt-20>) regelt dat al.
 * - Tekst links uitgelijnd op de section-container-lijn (zelfde lijn als logo en broodkruimel).
 * - Eén kopmaat voor alle subpagina's.
 */

interface PageHeroProps {
  breadcrumb: BreadcrumbEntry[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Decoratieve lijntekening rechts (alleen md+). */
  illustration?: string;
  /** Toon de standaard knoppenrij (kennismaking + Verkoopklaarscan). Default: true. */
  showActions?: boolean;
}

const appear = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const pushEvent = (event: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname, event_source: "page_hero" });
};

const PageHero = ({ breadcrumb, eyebrow, title, intro, illustration, showActions = true }: PageHeroProps) => {
  return (
    <>
      <PageBreadcrumb withContainer items={breadcrumb} />

      <section className="relative overflow-hidden">
        {illustration && (
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-1/2 right-0 hidden md:block -translate-y-1/2 translate-x-1/4 w-[420px] h-[420px] lg:w-[520px] lg:h-[520px]"
          >
            <div className="absolute inset-0 rounded-full bg-accent/30 blur-3xl" />
            <img src={illustration} alt="" className="absolute inset-0 m-auto h-[65%] w-[65%] object-contain opacity-[0.08]" />
          </div>
        )}

        <div className="section-container relative z-10 pt-8 pb-14 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24">
          <div className="max-w-3xl">
            <motion.p {...appear(0)} className="eyebrow">
              {eyebrow}
            </motion.p>

            <motion.h1
              {...appear(0.05)}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-foreground text-balance"
            >
              {title}
            </motion.h1>

            {intro && (
              <motion.p {...appear(0.12)} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {intro}
              </motion.p>
            )}

            {showActions && (
              <motion.div {...appear(0.2)} className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  onClick={() => pushEvent("cta_click_contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground hover:bg-teal-medium transition-colors"
                >
                  Plan een kennismaking
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/quickscan"
                  onClick={() => pushEvent("cta_click_quickscan")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Ontdek jouw score
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PageHero;
