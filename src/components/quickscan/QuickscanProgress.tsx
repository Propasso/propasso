import { TOTAL_QUESTIONS } from "@/data/diagnoseData";

interface QuickscanProgressProps {
  answeredCount: number;
  sectionLabel: string;
  sectionQuestionIndex?: number;
  sectionQuestionTotal?: number;
  isTransition?: boolean;
}

const QuickscanProgress = ({
  answeredCount,
  sectionLabel,
  sectionQuestionIndex,
  sectionQuestionTotal,
  isTransition,
}: QuickscanProgressProps) => {
  const progress = (answeredCount / TOTAL_QUESTIONS) * 100;

  const contextText = isTransition
    ? sectionLabel
    : sectionQuestionIndex != null && sectionQuestionTotal != null
      ? `${sectionLabel} — vraag ${sectionQuestionIndex} van ${sectionQuestionTotal}`
      : sectionLabel;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground truncate mr-2">
          {contextText}
        </span>
        <span className="text-xs font-semibold text-muted-foreground tabular-nums flex-shrink-0">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default QuickscanProgress;
