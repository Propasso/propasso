import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Tear-off style Quickscan callout that appears fixed to the right edge.
 * Expands slightly on hover. Dark bg with accent highlights.
 */
const QuickscanSideCallout = () => {
  return (
    <div className="relative z-20 -mt-8 mb-0 pointer-events-none">
      <div className="flex justify-end">
        <div
          className="pointer-events-auto mr-0 w-[280px] lg:w-[300px]
            translate-x-3 hover:translate-x-0 hover:w-[310px] lg:hover:w-[320px]
            transition-all duration-300 ease-out
            rounded-l-xl
            bg-primary text-primary-foreground
            shadow-2xl shadow-primary/20
            px-6 py-5
            border-l-4 border-l-accent
            cursor-default"
        >
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
            Quickscan
          </p>
          <h3 className="text-[15px] font-bold leading-snug">
            Hoe verkoopklaar is uw bedrijf?
          </h3>
          <p className="mt-1.5 text-xs text-primary-foreground/70 leading-relaxed">
            Ontdek het in 5 minuten — gratis en direct inzicht.
          </p>
          <div className="mt-4">
            <Button
              asChild
              size="sm"
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-5 group"
            >
              <Link to="/quickscan">
                Start quickscan
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickscanSideCallout;
