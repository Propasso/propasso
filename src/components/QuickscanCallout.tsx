import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickscanCallout = () => {
  return (
    <section className="py-14 md:py-20">
      <div className="section-container">
        <div className="rounded-2xl border border-border/30 bg-muted/50 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Gratis diagnostisch instrument</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
              Hoe verkoopklaar is uw bedrijf?
            </h2>
            <p className="mt-2 text-muted-foreground text-base leading-relaxed">
              Ontdek het in 5 minuten met onze Exit Readiness Quickscan en ontvang direct inzicht op drie dimensies.
            </p>
          </div>
          <div className="shrink-0">
            <Button asChild size="lg" className="rounded-full px-7 group">
              <Link to="/quickscan">
                Start de quickscan
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickscanCallout;
