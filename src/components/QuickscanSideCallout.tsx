import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Compact Quickscan callout — right-anchored in hero area.
 * Desktop: dark card flush to right with hover slide.
 * Mobile: compact bar.
 */
const QuickscanSideCallout = () => {
  return (
    <>
      {/* ── Desktop ── */}
      <div className="hidden md:flex justify-end -mr-[calc((100vw-100%)/2)]">
        <div
          className="w-[280px] lg:w-[300px] rounded-l-xl
            bg-primary text-primary-foreground
            shadow-xl shadow-primary/15
            pl-6 pr-5 py-5
            border-l-[3px] border-l-accent
            translate-x-[8px] hover:translate-x-0
            transition-all duration-300 ease-out
            hover:shadow-2xl hover:shadow-primary/25"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
              Quickscan
            </p>
          </div>
          <h3 className="text-[15px] font-bold leading-snug">
            Hoe verkoopklaar is uw bedrijf?
          </h3>
          <p className="mt-1.5 text-[12px] text-primary-foreground/60 leading-relaxed">
            Ontdek het in 5 minuten — gratis inzicht.
          </p>
          <div className="mt-3.5">
            <Button
              asChild
              size="sm"
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-xs px-5 h-8 group"
            >
              <Link to="/quickscan">
                Start quickscan
                <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <Link
          to="/quickscan"
          className="flex items-center justify-between gap-3
            bg-primary text-primary-foreground
            rounded-xl px-5 py-3.5
            shadow-lg shadow-primary/15
            border-l-[3px] border-l-accent
            active:scale-[0.98] transition-transform duration-150"
        >
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent mb-0.5">
              Quickscan
            </p>
            <p className="text-sm font-bold leading-snug truncate">
              Hoe verkoopklaar is uw bedrijf?
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent">
            <ArrowRight className="w-4 h-4 text-accent-foreground" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default QuickscanSideCallout;
