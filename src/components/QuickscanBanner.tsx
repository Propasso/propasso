import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import summitFlag from "@/assets/illustrations/quickscan-summit-flag.png";

interface QuickscanBannerProps {
  contextLine?: string;
}

/**
 * Wide, compact Quickscan banner with glassmorphism ribbon styling.
 * Designed for Werkwijze & Over Propasso pages as a centered, high-impact CTA.
 */
const QuickscanBanner = ({ contextLine }: QuickscanBannerProps) => {
  return (
    <div className="section-container my-12 md:my-16">
      {contextLine && <p className="text-sm text-muted-foreground mb-3">{contextLine}</p>}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/quickscan"
          className="group relative block rounded-2xl overflow-hidden
            bg-gradient-to-br from-primary/[0.04] via-card to-accent/[0.06]
            backdrop-blur-sm
            border border-border/30
            hover:-translate-y-0.5 hover:shadow-lg
            transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]
            shadow-[0_2px_24px_-8px_rgba(0,0,0,0.08)]"
        >
          {/* Gradient left border */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)))",
            }}
          />

          {/* Ghosted summit flag watermark */}
          <img
            src={summitFlag}
            alt=""
            aria-hidden="true"
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 object-contain opacity-[0.04] pointer-events-none select-none
              group-hover:opacity-[0.07] transition-opacity duration-500"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 px-6 md:px-8 py-5 md:py-6">
            {/* Text block */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/60 mb-1.5">
                Exit Readiness Quickscan voor MKB-ondernemers
              </p>
              <p className="text-lg md:text-xl font-bold leading-snug text-foreground">
                Hoe aantrekkelijk is jouw bedrijf voor <span className="text-primary">kopers</span>?
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-lg">
                Ontdek in 4 minuten jouw score op aantrekkelijkheid, verkoopklaarheid en overdraagbaarheid.
              </p>
            </div>

            {/* CTA button */}
            <Button
              asChild
              className="shrink-0 rounded-full bg-primary text-primary-foreground
                hover:bg-primary/90 px-6 h-11 text-sm font-semibold
                shadow-sm transition-all duration-300
                group-hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.35)]
                w-full md:w-auto"
            >
              <span>
                Start de scan
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Button>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default QuickscanBanner;
