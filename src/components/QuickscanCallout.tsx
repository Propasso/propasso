import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickscanCallout = () => {
  return (
    <div className="relative z-10 -mt-10 mb-4 pointer-events-none">
      <div className="section-container flex justify-end">
        <div className="pointer-events-auto w-full md:w-[55%] lg:w-[45%] rounded-2xl border-l-4 border-l-primary/40 border border-border/20 bg-card shadow-lg shadow-primary/5 p-8 md:p-10">
          <p className="eyebrow mb-3">Gratis diagnostisch instrument</p>
          <h2 className="text-lg md:text-xl font-bold text-foreground leading-snug">Hoe verkoopklaar is uw bedrijf?</h2>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            Ontdek het in 5 minuten met onze Exit Readiness Quickscan en ontvang direct inzicht op drie dimensies.
          </p>
          <div className="mt-5">
            <Button asChild size="default" className="rounded-full px-6 group">
              <Link to="/quickscan">
                Start de quickscan
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickscanCallout;
