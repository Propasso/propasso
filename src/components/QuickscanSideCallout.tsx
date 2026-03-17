import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Premium Quickscan callout — in-flow, bottom-right anchored.
 * Flush to browser right edge, medium width, outlined CTA.
 */
const QuickscanSideCallout = () => {
  return (
    <>
      {/* ── Desktop ── */}
      <div className="hidden md:flex justify-end -mr-[calc((100vw-100%)/2)]">
        <div
          className="group w-[360px] rounded-l-2xl
            bg-foreground text-background
            pl-8 pr-7 py-6
            translate-x-[6px] hover:translate-x-0 hover:pl-9
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/80 mb-3">
            Quickscan
          </p>
          <h3 className="text-base font-bold leading-snug tracking-tight">
            Hoe verkoopklaar is uw bedrijf?
          </h3>
          <p className="mt-1.5 text-[13px] text-background/50 leading-relaxed">
            Ontdek het in 5 minuten — gratis.
          </p>
          <Link
            to="/quickscan"
            className="mt-4 inline-flex items-center gap-2
              text-[13px] font-semibold text-accent
              border border-accent/30 rounded-full
              px-5 py-2
              hover:border-accent/60 hover:bg-accent/10
              transition-all duration-300"
          >
            Start quickscan
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden mx-4">
        <Link
          to="/quickscan"
          className="flex items-center justify-between gap-4
            bg-foreground text-background
            rounded-xl px-5 py-4
            shadow-lg
            active:scale-[0.98] transition-transform duration-150"
        >
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-accent/80 mb-1">
              Quickscan
            </p>
            <p className="text-sm font-bold leading-snug">
              Hoe verkoopklaar is uw bedrijf?
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-accent/30">
            <ArrowRight className="w-4 h-4 text-accent" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default QuickscanSideCallout;
