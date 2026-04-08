import { useEffect, useState } from "react";
import {
  DiagnoseScores,
  SnapshotData,
  getScoreLevel,
  scoreLevelConfig,
  dimensionLabels,
  allQuestions,
  getQuestionTip,
  type QuestionCategory,
} from "@/data/diagnoseData";
import QuickscanLeadForm from "./QuickscanLeadForm";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Phone,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CallbackRequestModal from "./CallbackRequestModal";
import { motion } from "framer-motion";

interface QuickscanResultsProps {
  scores: DiagnoseScores;
  snapshot: SnapshotData;
  answers: Record<number, string>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DIMENSION_IDS: Record<Exclude<QuestionCategory, "snapshot">, number[]> = {
  attractiveness: [6, 7, 8, 9, 10],
  readiness: [11, 12, 13, 14, 15],
  owner: [16, 17, 18, 19, 20],
};

function getScoreInterpretation(pct: number): string {
  if (pct <= 40) return "Aandachtspunt";
  if (pct <= 65) return "Ruimte voor verbetering";
  if (pct <= 82) return "Solide basis";
  return "Sterk";
}

function getAnswerLabel(questionId: number, answerValue: string): string {
  const q = allQuestions.find((q) => q.id === questionId);
  if (!q) return answerValue;
  const opt = q.options.find((o) => o.value === answerValue || o.score?.toString() === answerValue);
  return opt?.label || answerValue;
}

function getLowestQuestions(answers: Record<number, string>, count = 3) {
  const diagnosticIds = [...DIMENSION_IDS.attractiveness, ...DIMENSION_IDS.readiness, ...DIMENSION_IDS.owner];
  const scored = diagnosticIds
    .map((id) => ({ id, score: parseInt(answers[id] || "1", 10) }))
    .sort((a, b) => a.score - b.score);

  // Prefer variety across dimensions
  const result: typeof scored = [];
  const usedDimensions = new Set<string>();

  for (const item of scored) {
    if (result.length >= count) break;
    const dim = item.id <= 10 ? "attractiveness" : item.id <= 15 ? "readiness" : "owner";
    if (result.length < count - 1 || !usedDimensions.has(dim) || scored.filter((s) => s.score === item.score).length > 1) {
      result.push(item);
      usedDimensions.add(dim);
    }
  }

  // Fill remaining if needed
  if (result.length < count) {
    for (const item of scored) {
      if (result.length >= count) break;
      if (!result.find((r) => r.id === item.id)) result.push(item);
    }
  }

  return result.slice(0, count);
}

// ---------------------------------------------------------------------------
// Score bar with color zones
// ---------------------------------------------------------------------------

function DimensionScoreBar({
  label,
  score,
  delay = 0,
  showInterpretation = false,
}: {
  label: string;
  score: number;
  delay?: number;
  showInterpretation?: boolean;
}) {
  const [width, setWidth] = useState(0);
  const level = getScoreLevel(score);
  const config = scoreLevelConfig[level];

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className="py-3">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground tabular-nums">{score}%</span>
          {showInterpretation && (
            <span
              className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: config.color + "18", color: config.color }}
            >
              {getScoreInterpretation(score)}
            </span>
          )}
        </div>
      </div>
      {/* Color-zoned bar */}
      <div className="w-full h-2.5 rounded-full overflow-hidden flex">
        <div className="h-full bg-red-400/25" style={{ width: "45%" }} />
        <div className="h-full bg-amber-400/25" style={{ width: "27%" }} />
        <div className="h-full bg-emerald-400/25" style={{ width: "28%" }} />
      </div>
      {/* Score indicator overlay */}
      <div className="relative w-full h-0">
        <div
          className="absolute -top-2.5 h-2.5 rounded-full transition-all ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: config.color,
            transitionDuration: "800ms",
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Radar chart (inline SVG, 3 axes)
// ---------------------------------------------------------------------------

function RadarChart({
  scores,
}: {
  scores: { attractiveness: number; readiness: number; owner: number };
}) {
  const cx = 150,
    cy = 150,
    r = 110;
  const angles = [-90, 150, 30]; // top, bottom-left, bottom-right
  const labels = ["Aantrekkelijkheid", "Verkoopklaarheid\nBedrijf", "Verkoopklaarheid\nOndernemer"];
  const values = [scores.attractiveness / 100, scores.readiness / 100, scores.owner / 100];

  const point = (angle: number, ratio: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * ratio * Math.cos(rad), y: cy + r * ratio * Math.sin(rad) };
  };

  // Ideal polygon (100%)
  const idealPoints = angles.map((a) => point(a, 1));
  const idealPath = idealPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  // User polygon
  const userPoints = angles.map((a, i) => point(a, values[i]));
  const userPath = userPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  // Grid lines
  const gridLines = [0.25, 0.5, 0.75, 1].map((ratio) => {
    const pts = angles.map((a) => point(a, ratio));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  });

  // Label positions
  const labelPoints = angles.map((a) => point(a, 1.22));

  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 300 300" className="w-full max-w-[280px] md:max-w-[320px]">
        {/* Grid */}
        {gridLines.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
        ))}
        {/* Axes */}
        {angles.map((a, i) => {
          const end = point(a, 1);
          return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />;
        })}
        {/* Ideal shape */}
        <path d={idealPath} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
        {/* User shape */}
        <motion.path
          d={userPath}
          fill="hsl(var(--primary) / 0.15)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {/* Score dots */}
        {userPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="hsl(var(--primary))" />
        ))}
        {/* Labels */}
        {labelPoints.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground"
            style={{ fontSize: "10px", fontWeight: 500 }}
          >
            {labels[i].split("\n").map((line, li) => (
              <tspan key={li} x={p.x} dy={li === 0 ? 0 : 13}>
                {line}
              </tspan>
            ))}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Expandable dimension section
// ---------------------------------------------------------------------------

function DimensionSection({
  dimension,
  label,
  score,
  answers,
  defaultOpen = false,
}: {
  dimension: Exclude<QuestionCategory, "snapshot">;
  label: string;
  score: number;
  answers: Record<number, string>;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const ids = DIMENSION_IDS[dimension];
  const level = getScoreLevel(score);
  const config = scoreLevelConfig[level];

  return (
    <div className="border border-border/15 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-muted/30 transition-colors"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-foreground">{label}</span>
            <span
              className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: config.color + "18", color: config.color }}
            >
              {score}%
            </span>
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="border-t border-border/10 p-4 md:p-5 space-y-5">
          {ids.map((id) => {
            const q = allQuestions.find((q) => q.id === id);
            if (!q) return null;
            const rawScore = parseInt(answers[id] || "1", 10);
            const tip = getQuestionTip(id, rawScore);
            const dotColor = rawScore <= 2 ? "bg-red-500" : rawScore <= 4 ? "bg-amber-500" : "bg-emerald-500";

            return (
              <div key={id} className="flex gap-3">
                <div className={cn("w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0", dotColor)} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground leading-snug">{q.question}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Uw antwoord: {getAnswerLabel(id, answers[id])} ({rawScore}/6)
                  </p>
                  {tip && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{tip}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const QuickscanResults = ({ scores, snapshot, answers }: QuickscanResultsProps) => {
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  const overallLevel = getScoreLevel(scores.overall);
  const overallConfig = scoreLevelConfig[overallLevel];
  const firstSentence = overallConfig.description.split(". ")[0] + ".";

  const lowestQuestions = getLowestQuestions(answers);

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl mx-auto px-4">
        {/* ================================================================
            STAGE 1: TEASER (always visible)
           ================================================================ */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground">
              Uw resultaat
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            Exit Readiness Score
          </h2>
        </div>

        {/* Dimension score bars (teaser) */}
        <div className="rounded-xl border border-border/15 bg-card p-6 md:p-8 mb-6">
          <DimensionScoreBar label={dimensionLabels.attractiveness} score={scores.attractiveness} delay={200} />
          <DimensionScoreBar label={dimensionLabels.readiness} score={scores.readiness} delay={400} />
          <DimensionScoreBar label={dimensionLabels.owner} score={scores.owner} delay={600} />
        </div>

        {/* Summary sentence */}
        <p className="text-sm text-muted-foreground text-center mb-10 leading-relaxed max-w-lg mx-auto">
          {firstSentence}
        </p>

        {/* ================================================================
            LEAD FORM GATE
           ================================================================ */}
        {!leadSubmitted && (
          <>
            {/* CTA before lead form */}
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                Wil je weten wat dit betekent voor jouw situatie?
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
                Vul je gegevens in en ontvang direct je persoonlijke rapport met concrete aanbevelingen.
              </p>
            </div>

            <QuickscanLeadForm
              scores={scores}
              snapshot={snapshot}
              answers={answers}
              onSuccess={() => setLeadSubmitted(true)}
            />
          </>
        )}

        {/* ================================================================
            STAGE 2: FULL RESULTS (after lead form submission)
           ================================================================ */}
        {leadSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* 2a. Snapshot context box */}
            <div className="rounded-lg bg-muted/50 border border-border/10 px-4 py-3 mb-8 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              {snapshot.revenueBand && <span>Jaaromzet: <strong className="text-foreground">{snapshot.revenueBand}</strong></span>}
              {snapshot.profitability && <span>Winstgevendheid: <strong className="text-foreground">{snapshot.profitability}</strong></span>}
              {snapshot.exitHorizon && <span>Exit-horizon: <strong className="text-foreground">{snapshot.exitHorizon}</strong></span>}
            </div>

            {/* 2b. Overall score header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-5xl font-bold text-foreground tabular-nums">{scores.overall}%</span>
                <span
                  className="text-lg font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: overallConfig.color + "18", color: overallConfig.color }}
                >
                  {overallConfig.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                {overallConfig.description}
              </p>
            </div>

            {/* 2c. Enhanced dimension bars */}
            <div className="rounded-xl border border-border/15 bg-card p-6 md:p-8 mb-8">
              <DimensionScoreBar label={dimensionLabels.attractiveness} score={scores.attractiveness} delay={200} showInterpretation />
              <DimensionScoreBar label={dimensionLabels.readiness} score={scores.readiness} delay={400} showInterpretation />
              <DimensionScoreBar label={dimensionLabels.owner} score={scores.owner} delay={600} showInterpretation />
            </div>

            {/* 2d. Radar chart */}
            <div className="rounded-xl border border-border/15 bg-card p-6 md:p-8 mb-8">
              <h3 className="text-lg font-bold text-foreground tracking-tight mb-4 text-center">
                Uw profiel
              </h3>
              <RadarChart scores={scores} />
            </div>

            {/* 2e. Top priorities */}
            <div className="rounded-xl border border-border/15 bg-card p-6 md:p-8 mb-8">
              <h3 className="text-lg font-bold text-foreground tracking-tight mb-5 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Uw top prioriteiten
              </h3>
              <div className="space-y-5">
                {lowestQuestions.map(({ id, score: rawScore }) => {
                  const q = allQuestions.find((q) => q.id === id);
                  if (!q) return null;
                  const tip = getQuestionTip(id, rawScore);
                  const dotColor = rawScore <= 2 ? "bg-red-500" : "bg-amber-500";

                  return (
                    <div key={id} className="flex gap-3">
                      <div className={cn("w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0", dotColor)} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground leading-snug">{q.question}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Uw antwoord: {getAnswerLabel(id, answers[id])} ({rawScore}/6)
                        </p>
                        {tip && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{tip}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2f. Per-dimension expandable sections */}
            <div className="space-y-3 mb-10">
              <DimensionSection dimension="attractiveness" label={dimensionLabels.attractiveness} score={scores.attractiveness} answers={answers} defaultOpen />
              <DimensionSection dimension="readiness" label={dimensionLabels.readiness} score={scores.readiness} answers={answers} />
              <DimensionSection dimension="owner" label={dimensionLabels.owner} score={scores.owner} answers={answers} />
            </div>

            {/* 2g. CTA block */}
            <div className="rounded-xl border border-border/15 bg-card p-6 md:p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground tracking-tight mb-3">
                Klaar voor de volgende stap?
              </h3>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/contact">
                    <MessageSquare className="w-4 h-4" />
                    Plan een vrijblijvend gesprek
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/kennisbank">
                    <BookOpen className="w-4 h-4" />
                    Bekijk de kennisbank
                  </Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                Je persoonlijke rapport is ook per e-mail verstuurd.
              </p>

              <div className="mt-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setCallbackOpen(true)}>
                  <Phone className="w-4 h-4" />
                  Laat je terugbellen
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <CallbackRequestModal open={callbackOpen} onOpenChange={setCallbackOpen} />
    </section>
  );
};

export default QuickscanResults;
