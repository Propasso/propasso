import { TOTAL_QUESTIONS } from "@/data/diagnoseData";

interface DiagnoseProgressProps {
  currentQuestion: number; // 0-indexed
}

const DiagnoseProgress = ({ currentQuestion }: DiagnoseProgressProps) => {
  const progress = ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Vraag {currentQuestion + 1} van {TOTAL_QUESTIONS}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default DiagnoseProgress;
