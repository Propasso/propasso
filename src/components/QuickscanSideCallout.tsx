import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Tear-off style Quickscan callout fixed to the right edge of the viewport.
 * Slides left slightly on hover. Dark bg with accent highlights.
 */
const QuickscanSideCallout = () => {
  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50
        translate-x-[12px] hover:translate-x-0
        transition-transform duration-300 ease-out
        hidden md:block"
    >
      <div
        className="w-[260px] rounded-l-xl
          bg-primary text-primary-foreground
          shadow-2xl shadow-black/20
          px-5 py-5
          border-l-[3px] border-l-accent"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-1.5">
          Quickscan
        </p>
        <h3 className="text-sm font-bold leading-snug">
          Hoe verkoopklaar is uw bedrijf?
        </h3>
        <p className="mt-1 text-[12px] text-primary-foreground/65 leading-relaxed">
          Ontdek het in 5 minuten — gratis en direct inzicht.
        </p>
        <div className="mt-3">
          <Button
            asChild
            size="sm"
            className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-xs px-4 h-8 group"
          >
            <Link to="/quickscan">
              Start quickscan
              <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickscanSideCallout;
