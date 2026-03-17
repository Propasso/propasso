import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Premium Quickscan callout — flush-right anchored, editorial style.
 * Dark background, yellow accents, compact and confident.
 */
const QuickscanSideCallout = () => {
  return (
    <>
      {/* ── Desktop ── */}
      <div className="hidden md:flex justify-end -mr-[calc((100vw-100%)/2)]">
        <div
          className="group relative w-[400px] rounded-l-2xl overflow-hidden
            bg-foreground text-background
            pl-10 pr-8 py-7
            translate-x-[6px] hover:translate-x-0
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            shadow-[0_4px_32px_-8px_rgba(0,0,0,0.2)]
            hover:shadow-[0_8px_48px_-8px_rgba(0,0,0,0.3)]"
        >
          {/* Subtle ambient glow */}
          <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-accent/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-accent/15 via-transparent to-transparent" />

          <p className="relative text-[10px] font-semibold uppercase tracking-[0.18em] text-accent/60 mb-3">
            Gratis diagnostisch instrument
          </p>

          <h3 className="relative text-base font-bold leading-snug tracking-tight">
            Hoe verkoopklaar is uw bedrijf?
          </h3>

          <p className="relative mt-1.5 text-[13px] text-background/45 leading-relaxed">
            Ontvang in enkele minuten inzicht in de aantrekkelijkheid, verkoopklaarheid en afhankelijkheid van uw bedrijf.
          </p>

          {/* Value bullets */}
          <div className="relative mt-3.5 flex flex-col gap-1">
            <span className="flex items-center gap-2 text-[11px] text-background/50">
              <CheckCircle2 className="w-3 h-3 text-accent/50 shrink-0" />
              Direct helder inzicht
            </span>
            <span className="flex items-center gap-2 text-[11px] text-background/50">
              <CheckCircle2 className="w-3 h-3 text-accent/50 shrink-0" />
              Praktisch en direct toepasbaar
            </span>
          </div>

          <div className="relative mt-5">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-accent/25 bg-transparent text-accent
                hover:border-accent/50 hover:bg-accent/8 hover:text-accent
                px-5 h-9 text-[12px] font-semibold
                transition-all duration-300"
            >
              <Link to="/quickscan">
                Start de gratis Quickscan
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <p className="relative mt-2.5 text-[10px] text-background/25">
            Praktisch, helder en zonder gedoe.
          </p>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <div className="relative rounded-xl overflow-hidden bg-foreground text-background px-5 py-5">
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-accent/8 blur-2xl pointer-events-none" />

          <p className="relative text-[9px] font-semibold uppercase tracking-[0.18em] text-accent/60 mb-1.5">
            Gratis diagnostisch instrument
          </p>
          <p className="relative text-sm font-bold leading-snug">
            Hoe verkoopklaar is uw bedrijf?
          </p>
          <p className="relative mt-1 text-[12px] text-background/40 leading-relaxed">
            Ontvang in enkele minuten inzicht in uw verkoopklaarheid.
          </p>

          <div className="relative mt-3.5">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-accent/25 bg-transparent text-accent
                hover:border-accent/50 hover:bg-accent/8 hover:text-accent
                px-4 h-8 text-[11px] font-semibold"
            >
              <Link to="/quickscan">
                Start Quickscan
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
