import { Button } from "@/components/ui/button";
import { ClipboardCheck, Clock, BarChart3, ArrowRight } from "lucide-react";
import quickscanIllustration from "@/assets/images/quickscan-hiker-line-drawing.png";

interface QuickscanIntroProps {
  onStart: () => void;
}

const QuickscanIntro = ({ onStart }: QuickscanIntroProps) => {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-20 overflow-x-hidden">
      {/* Faded accent circle with illustration — matches Kennisbank pattern */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 md:translate-x-1/6 w-[320px] h-[320px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px]">
        <div className="absolute inset-0 rounded-full bg-accent/30 blur-3xl" />
        <img
          src={quickscanIllustration}
          alt=""
          className="absolute inset-0 m-auto h-[65%] w-[65%] object-contain opacity-[0.06] pointer-events-none select-none"
          aria-hidden="true"
        />
      </div>

      <div className="section-container relative z-10 py-16 md:py-24 px-4">
        {/* Eyebrow — left-aligned with light border */}
        <p className="eyebrow">Gratis quickscan</p>

        <div className="text-center mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
            Exit Readiness
            <span className="block text-muted-foreground">Quickscan</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
            Ontdek in 4 minuten hoe jouw bedrijf en jezelf persoonlijk voorbereid zijn op een toekomstige overdracht. U
            ontvangt direct een score op drie dimensies, plus concrete tips en verbeterpunten.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 max-w-3xl mx-auto">
            {[
              {
                icon: ClipboardCheck,
                title: "20 gerichte vragen",
                desc: "Op verkoopklaarheid van ondernemer en bedrijf",
              },
              {
                icon: Clock,
                title: "4 minuten",
                desc: "Korte, krachtige quickscan zonder omwegen",
              },
              {
                icon: BarChart3,
                title: "Direct resultaat",
                desc: "Inzichten per dimensie en tips",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/15">
                <Icon className="w-7 h-7 text-primary mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="font-bold text-foreground text-sm mb-1 tracking-tight">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <Button size="lg" onClick={onStart} className="w-full sm:w-auto text-base px-10 py-6 group">
            Start de quickscan
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <p className="text-xs text-muted-foreground mt-5">
            Geen registratie vereist · Uw antwoorden blijven vertrouwelijk
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickscanIntro;
