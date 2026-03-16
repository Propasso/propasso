import { TOTAL_QUESTIONS } from "@/data/diagnoseData";

interface QuickscanProgressProps {
  currentQuestion: number;
}

const QuickscanProgress = ({ currentQuestion }: QuickscanProgressProps) => {
  const progress = ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Vraag {currentQuestion + 1} van {TOTAL_QUESTIONS}
        </span>
        <span className="text-xs font-semibold text-muted-foreground tabular-nums">
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
