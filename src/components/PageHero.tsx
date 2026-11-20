import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import PageBreadcrumb, { type BreadcrumbEntry } from "@/components/PageBreadcrumb";

/**
 * Standaard hero voor alle subpagina's (Werkwijze, Over Propasso, Kennisbank,
 * Veelgestelde vragen, ...). Eén vaste opbouw:
 * broodkruimel → eyebrow → H1 → intro → knoppenrij → scrollpijl.
 *
 * Regels (zie roadmap.md, "Hero's"):
 * - De hero (incl. broodkruimel) vult precies het scherm onder de header, zodat de
 *   volgende sectie op de vouw begint. Inhoud staat bovenaan (geen verticale
 *   centrering, geen flex: dat verschoof de tekst eerder van de logolijn).
 * - Geen extra top-padding voor de header: PageLayout (<main pt-20 lg:pt-24>) regelt dat al.
 * - Tekst links uitgelijnd op de section-container-lijn (zelfde lijn als logo en broodkruimel).
 * - Eén kopmaat voor alle subpagina's.
 * - Geen eigen decoratie: de gele stip rechtsboven komt uit PageLayout (PageAccentDot).
 */

interface PageHeroProps {
  breadcrumb: BreadcrumbEntry[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Verouderd en genegeerd: hero's tonen geen illustraties meer (zie roadmap.md). Mag bij een volgende wijziging uit de pagina's. */
  illustration?: string;
  /** Toon de standaard knoppenrij (kennismaking + Verkoopklaarscan). Default: true. */
  showActions?: boolean;
  /** Optionele korte regel onder de knoppen (max 70 tekens), bijvoorbeeld over de kennismaking. */
  note?: ReactNode;
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

const PageHero = ({ breadcrumb, eyebrow, title, intro, showActions = true, note }: PageHeroProps) => {
  return (
    <>
      <section className="relative overflow-x-clip min-h-[calc(100svh-5rem)] lg:min-h-[calc(100svh-6rem)] pb-16">
        <PageBreadcrumb withContainer items={breadcrumb} />

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

            {note && (
              <motion.p {...appear(0.25)} className="mt-4 text-sm text-muted-foreground">
                {note}
              </motion.p>
            )}
          </div>
        </div>

        {/* Scrollpijl, zelfde als homepage: hero vult het scherm, pijl laat zien dat er meer komt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex"
        >
          <ArrowDown size={20} className="text-muted-foreground animate-scroll-bounce" />
        </motion.div>
      </section>
    </>
  );
};

export default PageHero;
