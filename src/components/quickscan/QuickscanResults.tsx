import { useEffect, useState } from "react";
import {
  DiagnoseScores,
  SnapshotData,
  getScoreLevel,
  scoreLevelConfig,
  dimensionLabels,
  getLowestDimensionInsight,
  tipsByDimension,
  type QuestionCategory,
} from "@/data/diagnoseData";
import QuickscanLeadForm from "./QuickscanLeadForm";
import { cn } from "@/lib/utils";

interface QuickscanResultsProps {
  scores: DiagnoseScores;
  snapshot: SnapshotData;
  answers: Record<number, string>;
}

// ---------------------------------------------------------------------------
// Animated counter hook
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
// Circular gauge SVG
// ---------------------------------------------------------------------------

function ScoreGauge({ score }: { score: number }) {
  const level = getScoreLevel(score);
  const config = scoreLevelConfig[level];
  const animatedScore = useAnimatedCount(score);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
          <circle
            cx="100" cy="100" r={radius} fill="none"
            stroke={config.color} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-foreground">{animatedScore}%</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: config.color }}>
          {config.label}
        </span>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">{config.description}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Subscore bar
// ---------------------------------------------------------------------------

function SubScoreBar({ label, score, delay = 0 }: { label: string; score: number; delay?: number }) {
  const level = getScoreLevel(score);
  const config = scoreLevelConfig[level];
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">{score}%</span>
          <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: config.color }}>
            {config.label}
          </span>
        </div>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${width}%`, backgroundColor: config.color }} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tips section
// ---------------------------------------------------------------------------

function TipsSection({ scores }: { scores: DiagnoseScores }) {
  const dimensions: Exclude<QuestionCategory, 'snapshot'>[] = ['attractiveness', 'readiness', 'owner'];

  return (
    <div className="mt-12 space-y-10">
      <h3 className="font-serif text-2xl text-foreground text-center">Uw persoonlijke verbeterpunten</h3>
      {dimensions.map((dim) => {
        const score = scores[dim];
        const level = getScoreLevel(score);
        const tips = tipsByDimension[dim][level];
        const config = scoreLevelConfig[level];

        return (
          <div key={dim} className="bg-card rounded-xl border border-border/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: config.color }} />
              <h4 className="font-semibold text-foreground">{dimensionLabels[dim]}</h4>
            </div>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary font-bold flex-shrink-0">{i + 1}.</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main results component
// ---------------------------------------------------------------------------

const QuickscanResults = ({ scores, snapshot, answers }: QuickscanResultsProps) => {
  const [showTips, setShowTips] = useState(false);
  const insight = getLowestDimensionInsight(scores);

  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-2">
          Uw Exit Readiness Score
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Op basis van uw antwoorden hebben wij de volgende score berekend.
        </p>

        <div className="flex justify-center mb-12">
          <ScoreGauge score={scores.overall} />
        </div>

        <div className="space-y-5 mb-10">
          <SubScoreBar label={dimensionLabels.attractiveness} score={scores.attractiveness} delay={400} />
          <SubScoreBar label={dimensionLabels.readiness} score={scores.readiness} delay={600} />
          <SubScoreBar label={dimensionLabels.owner} score={scores.owner} delay={800} />
        </div>

        <div className="bg-primary/5 border border-primary/15 rounded-xl p-6 mb-12">
          <h3 className="font-semibold text-foreground mb-2">Belangrijkste aandachtspunt</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
        </div>

        {!showTips ? (
          <QuickscanLeadForm scores={scores} snapshot={snapshot} answers={answers} onSuccess={() => setShowTips(true)} />
        ) : (
          <TipsSection scores={scores} />
        )}

        {!showTips && (
          <p className="text-xs text-muted-foreground text-center mt-8">
            U kunt uw persoonlijk rapport later alsnog opvragen via propasso.nl/quickscan
          </p>
        )}
      </div>
    </section>
  );
};

export default QuickscanResults;
