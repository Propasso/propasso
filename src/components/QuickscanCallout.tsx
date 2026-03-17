import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuickscanCallout = () => {
  return (
    <div className="relative z-10 -mt-8 mb-4 pointer-events-none">
      <div className="section-container flex justify-end">
        <div
          className="
            pointer-events-auto
            group
            relative
            w-full
            md:w-[62%]
            lg:w-[50%]
            overflow-hidden
            rounded-2xl
            border border-border/20
            border-l-4 border-l-primary/50
            bg-card
            shadow-lg shadow-primary/5
            transition-all duration-300
            hover:-translate-x-1
            hover:shadow-xl hover:shadow-primary/10
            p-5 md:p-6
          "
        >
          {/* subtle visual accents */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent" />
          <div className="pointer-events-none absolute -right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <p className="eyebrow mb-2">Gratis diagnostisch instrument</p>

            <h2 className="text-base md:text-lg font-bold tracking-tight text-foreground leading-snug max-w-[28ch]">
              Hoe verkoopklaar is uw bedrijf vandaag?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground leading-normal max-w-[52ch]">
              Doe de Quickscan en ontvang in enkele minuten inzicht in de aantrekkelijkheid, verkoopklaarheid en
              afhankelijkheid van uw bedrijf.
            </p>

            {/* compact value bullets */}
            <div className="mt-3 flex flex-col gap-1.5 text-sm text-foreground/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Direct helder inzicht</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Praktisch en direct toepasbaar</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button
                asChild
                size="default"
                className="
                  rounded-full px-5 md:px-6
                  group/btn
                  shadow-sm
                "
              >
                <Link to="/quickscan">
                  Start de gratis Quickscan
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </Link>
              </Button>

              <p className="text-xs text-muted-foreground">Praktisch, helder en zonder gedoe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickscanCallout;
