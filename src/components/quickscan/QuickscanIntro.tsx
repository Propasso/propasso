import { Button } from "@/components/ui/button";
import { ClipboardCheck, Clock, BarChart3 } from "lucide-react";

interface QuickscanIntroProps {
  onStart: () => void;
}

const QuickscanIntro = ({ onStart }: QuickscanIntroProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
          Exit Readiness Quickscan
        </h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Ontdek in 5 minuten hoe goed uw bedrijf en u persoonlijk voorbereid zijn op een
          toekomstige overdracht. U ontvangt direct een score op drie dimensies, plus
          concrete verbeterpunten.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: ClipboardCheck,
              title: "20 gerichte vragen",
              desc: "Gebaseerd op de Value Acceleration Methodology",
            },
            {
              icon: Clock,
              title: "5 minuten",
              desc: "Korte, krachtige quickscan zonder omwegen",
            },
            {
              icon: BarChart3,
              title: "Direct resultaat",
              desc: "Score en inzichten per dimensie",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-card rounded-xl p-6 border border-border/20"
            >
              <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <Button size="lg" onClick={onStart} className="text-base px-10 py-6">
          Start de quickscan
        </Button>

        <p className="text-xs text-muted-foreground mt-4">
          Geen registratie vereist · Uw antwoorden blijven vertrouwelijk
        </p>
      </div>
    </section>
  );
};

export default QuickscanIntro;
