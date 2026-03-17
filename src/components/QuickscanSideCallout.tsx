import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Compact, light Quickscan callout — flush-right anchored.
 */
const QuickscanSideCallout = () => {
  return (
    <>
      {/* ── Desktop ── */}
      <div className="hidden md:flex justify-end -mr-[calc((100vw-100%)/2)]">
        <div
          className="group relative w-[400px] rounded-l-xl overflow-hidden
            bg-card border-l-[3px] border-primary
            pl-7 pr-6 py-5
            translate-x-[4px] hover:translate-x-0
            transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]
            shadow-[0_2px_20px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_28px_-6px_rgba(0,0,0,0.12)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/60 mb-1.5">
                Gratis quickscan
              </p>
              <p className="text-[15px] font-bold leading-snug text-foreground">Hoe aantrekkelijk is jouw bedrijf voor kopers?</p>
              <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">
                Ontdek in 4 min jouw score op 3 dimensies
              </p>
            </div>

            <Button
              asChild
              size="sm"
              className="shrink-0 rounded-full bg-primary text-primary-foreground
                hover:bg-primary/90 px-4 h-8 text-[12px] font-semibold mt-1
                shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link to="/quickscan">
                Ontdek jouw score
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <div className="relative rounded-lg overflow-hidden bg-card border-l-[3px] border-primary px-4 py-3.5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-foreground leading-snug">Hoe aantrekkelijk is jouw bedrijf voor kopers?</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Gratis quickscan, 4 minuten</p>
            </div>
            <Button
              asChild
              size="sm"
              className="shrink-0 rounded-full bg-primary text-primary-foreground
                hover:bg-primary/90 px-3.5 h-7 text-[11px] font-semibold shadow-sm"
            >
              <Link to="/quickscan">
                Ontdek jouw score
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickscanSideCallout;
