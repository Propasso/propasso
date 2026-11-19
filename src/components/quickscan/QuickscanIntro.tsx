import { Button } from "@/components/ui/button";
import { ClipboardCheck, Clock, BarChart3, ArrowRight } from "lucide-react";
import quickscanIllustration from "@/assets/images/quickscan-hiker-line-drawing.png";

interface QuickscanIntroProps {
  onStart: () => void;
}

const QuickscanIntro = ({ onStart }: QuickscanIntroProps) => {
  return (
    <section className="relative overflow-x-hidden">
      {/* Faded accent circle with illustration — zelfde patroon als PageHero (alleen md+) */}
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 right-0 hidden md:block -translate-y-1/2 translate-x-1/4 w-[420px] h-[420px] lg:w-[520px] lg:h-[520px]">
        <div className="absolute inset-0 rounded-full bg-accent/30 blur-3xl" />
        <img
          src={quickscanIllustration}
          alt=""
          className="absolute inset-0 m-auto h-[65%] w-[65%] object-contain opacity-[0.06] pointer-events-none select-none"
          aria-hidden="true"
        />
      </div>

      <div className="section-container relative z-10 pt-8 pb-14 md:pt-14 md:pb-20">
        <div className="text-center">
          <p className="eyebrow">Gratis Verkoopklaarscan</p>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Verkoopklaarscan
          </h1>
          <p className="text-lg text-muted-foreground mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">
            Ontdek in 4 minuten hoe jouw bedrijf en jezelf persoonlijk voorbereid zijn op een toekomstige overdracht. Je
            ontvangt direct een score op drie dimensies, plus concrete tips en verbeterpunten.
          </p>

          <div className="grid grid-cols-3 gap-2 md:gap-5 mb-8 md:mb-14 max-w-3xl mx-auto">
            {[
              {
                icon: ClipboardCheck,
                title: "20 gerichte vragen",
                desc: "Op overdraagbaarheid van je bedrijf en je persoonlijke voorbereiding",
              },
              {
                icon: Clock,
                title: "4 minuten",
                desc: "Korte, krachtige scan zonder omwegen",
              },
              {
                icon: BarChart3,
                title: "Direct resultaat",
                desc: "Inzichten per dimensie en tips",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card/80 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-border/15">
                <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary mx-auto mb-2 md:mb-3" strokeWidth={1.5} />
                <p className="font-bold text-foreground text-xs md:text-sm md:mb-1 tracking-tight">{title}</p>
                <p className="hidden md:block text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <Button size="lg" onClick={onStart} className="w-full sm:w-auto text-base px-10 py-6 group">
            Start de Verkoopklaarscan
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <p className="text-xs text-muted-foreground mt-5">
            Geen registratie vereist · Jouw antwoorden blijven vertrouwelijk
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickscanIntro;
