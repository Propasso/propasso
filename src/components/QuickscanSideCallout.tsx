import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Premium Quickscan callout — flush-right anchored, between sections.
 */
const QuickscanSideCallout = () => {
  return (
    <>
      {/* ── Desktop ── */}
      <div className="hidden md:flex justify-end -mr-[calc((100vw-100%)/2)]">
        <div
          className="group relative w-[420px] rounded-l-2xl overflow-hidden
            bg-foreground text-background
            pl-10 pr-8 py-8
            translate-x-[6px] hover:translate-x-0 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.35)]
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)]"
        >
          {/* Subtle accent glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-accent/20 via-accent/5 to-transparent" />

          <p className="relative text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/70 mb-4">
            Weten waar jij staat?
          </p>

          <h3 className="relative text-[17px] font-bold leading-snug tracking-tight">xxx</h3>

          <p className="relative mt-2 text-[13px] text-background/50 leading-relaxed">
            Krijg in slechts 4 minuten inzicht in hoe verkoopklaar jij en je bedrijf vandaag zijn.
          </p>

          {/* Value bullets */}
          <div className="relative mt-4 flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-[12px] text-background/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent/60 shrink-0" />
              Direct inzicht in de aantrekkelijkheid, verkoopklaarheid en zelfstandigheid van je bedrijf.
            </span>
            <span className="flex items-center gap-2 text-[12px] text-background/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent/60 shrink-0" />
              Uitvoerbare verbeterpunten, afgestemd op uw situatie.
            </span>
          </div>

          <div className="relative mt-5 flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-accent/30 bg-transparent text-accent
                hover:border-accent/60 hover:bg-accent/10 hover:text-accent
                px-5 py-2 h-auto text-[13px] font-semibold"
            >
              <Link to="/quickscan">
                Start de gratis Quickscan
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <p className="relative mt-3 text-[11px] text-background/30">Praktisch, helder en zonder gedoe.</p>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden mx-4">
        <div className="relative rounded-xl overflow-hidden bg-foreground text-background px-5 py-5 shadow-lg">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

          <p className="relative text-[9px] font-semibold uppercase tracking-[0.2em] text-accent/70 mb-2">
            Gratis diagnostisch instrument
          </p>
          <p className="relative text-sm font-bold leading-snug">Hoe verkoopklaar is uw bedrijf?</p>
          <p className="relative mt-1.5 text-[12px] text-background/45 leading-relaxed">
            Ontvang in enkele minuten inzicht in uw verkoopklaarheid.
          </p>

          <div className="relative mt-4 flex items-center justify-between">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-accent/30 bg-transparent text-accent
                hover:border-accent/60 hover:bg-accent/10 hover:text-accent
                px-4 h-8 text-[12px] font-semibold"
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
