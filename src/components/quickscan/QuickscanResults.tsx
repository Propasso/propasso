import { useEffect, useState } from "react";
import {
  DiagnoseScores,
  SnapshotData,
  getScoreLevel,
  scoreLevelConfig,
  dimensionLabels,
  getLowestDimensionInsight
} from "@/data/diagnoseData";
import QuickscanLeadForm from "./QuickscanLeadForm";
import { cn } from "@/lib/utils";
import { TrendingUp, AlertTriangle, CheckCircle2, Target, ChevronRight, MessageSquare, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CallbackRequestModal from "./CallbackRequestModal";

interface QuickscanResultsProps {
  scores: DiagnoseScores;
  snapshot: SnapshotData;
  answers: Record<number, string>;
}

// ---------------------------------------------------------------------------
// Animated counter
// ---------------------------------------------------------------------------

function useAnimatedCount(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

// ---------------------------------------------------------------------------
// Score gauge — clean arc
// ---------------------------------------------------------------------------

function ScoreGauge({ score }: {score: number;}) {
  const level = getScoreLevel(score);
  const config = scoreLevelConfig[level];
  const animatedScore = useAnimatedCount(score);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - animatedScore / 100 * circumference;

  const levelIcon =
  level === "ready" ? CheckCircle2 : level === "good" ? TrendingUp : level === "foundation" ? Target : AlertTriangle;
  const LevelIcon = levelIcon;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-52">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out" />
          
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-foreground tabular-nums">{animatedScore}</span>
          <span className="text-sm font-medium text-muted-foreground -mt-0.5">van 100</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: config.color + "18", color: config.color }}>
          
          <LevelIcon className="w-4 h-4" />
          {config.label}
        </div>
        <p className="text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">{config.description}</p>
      </div>
    </div>);

}

// ---------------------------------------------------------------------------
// Subscore bar
// ---------------------------------------------------------------------------

function SubScoreBar({ label, score, delay = 0 }: {label: string;score: number;delay?: number;}) {
  const level = getScoreLevel(score);
  const config = scoreLevelConfig[level];
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-bold text-foreground tabular-nums">{score}%</span>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: config.color + "18", color: config.color }}>
            
            {config.label}
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: config.color }} />
        
      </div>
    </div>);

}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const QuickscanResults = ({ scores, snapshot, answers }: QuickscanResultsProps) => {
  const [showTips, setShowTips] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const insight = getLowestDimensionInsight(scores);

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground">
              Uw resultaat
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            Verkoopklaar- en aantrekkelijkheidsscore
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Op basis van uw antwoorden hebben wij de volgende score berekend.
          </p>
        </div>

        {/* Gauge */}
        <div className="flex justify-center mb-16">
          <ScoreGauge score={scores.overall} />
        </div>

        {/* Subscores */}
        <div className="rounded-xl border border-border/15 bg-card p-6 md:p-8 mb-10 divide-y divide-border/10">
          <SubScoreBar label={dimensionLabels.attractiveness} score={scores.attractiveness} delay={400} />
          <SubScoreBar label={dimensionLabels.readiness} score={scores.readiness} delay={600} />
          <SubScoreBar label={dimensionLabels.owner} score={scores.owner} delay={800} />
        </div>

        {/* Insight */}
        <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 md:p-8 mb-14">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-foreground mb-1.5 tracking-tight">Belangrijkste aandachtspunt</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
              <p className="italic text-sm text-muted-foreground leading-relaxed mt-4 mb-0">
                Laat uw gegevens achter voor een uitgebreide analyse
              </p>
            </div>
          </div>
        </div>

        {/* Lead gate or post-submit confirmation */}
        {!showTips ? (
          <QuickscanLeadForm
            scores={scores}
            snapshot={snapshot}
            answers={answers}
            onSuccess={() => setShowTips(true)}
          />
        ) : (
          <div className="rounded-xl border border-border/15 bg-card p-6 md:p-8 mb-14">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground">
                  Rapport verzonden
                </span>
              </div>

              <h3 className="text-2xl font-bold text-foreground tracking-tight mb-4">
                Het rapport met de analyse is verzonden
              </h3>

              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Je ontvangt een e-mail met je resultaten, de belangrijkste bevindingen en praktische aandachtspunten.
              </p>

              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-4">
                Het rapport geeft inzicht en richting, maar de echte waarde zit in de vertaalslag naar jouw situatie en belangrijker: de uitvoering.
              </p>

              <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6">
                Op basis van je score zien we vaak dat gefundeerde keuzes het verschil maken tussen een goed draaiend bedrijf en een bedrijf dat écht verkoopklaar en overdraagbaar is.
              </p>

              {/* CTA inside confirmation card */}
              <div className="mt-10 pt-8 border-t border-border/10">
                <h4 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                  Wil je weten wat deze uitkomst concreet betekent voor jouw bedrijf?
                </h4>
                <p className="text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
                  In een kort gesprek vertalen we je uitkomst naar concrete vervolgstappen voor jouw bedrijf.
                </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto leading-relaxed">
                  In 30 minuten krijg je helder waar de grootste waarde en risico's zitten.
                </p>

                <div className="mt-8 flex flex-col items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link to="/contact">
                      <MessageSquare className="w-4 h-4" />
                      Plan een kort gesprek
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>

                  <p className="text-sm text-muted-foreground mt-2">
                    Liever wat korte uitleg over het rapport?
                  </p>

                  <Button variant="outline" size="lg" className="rounded-full" onClick={() => setCallbackOpen(true)}>
                      <Phone className="w-4 h-4" />
                      Laat je terugbellen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA section — only shown pre-submit */}
        {!showTips && (
        <div className="mt-16 pt-14 border-t border-border/15">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground tracking-tight">
              Benieuwd wat deze score betekent voor jouw situatie?
            </h3>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
              Elke situatie is anders. In een kort gesprek vertalen we je resultaten naar concrete vervolgstappen.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/contact">
                <MessageSquare className="w-4 h-4" />
                Plan een kort gesprek
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" className="rounded-full" onClick={() => setCallbackOpen(true)}>
                <Phone className="w-4 h-4" />
                Laat je terugbellen
            </Button>
          </div>
        </div>
        )}
      </div>
    </section>);

};

export default QuickscanResults;
