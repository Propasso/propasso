import { DiagnoseQuestion as QuestionType, SNAPSHOT_COUNT } from "@/data/diagnoseData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagnoseQuestionProps {
  question: QuestionType;
  currentIndex: number;
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  isLast: boolean;
}

const DiagnoseQuestionComponent = ({
  question,
  currentIndex,
  selectedValue,
  onSelect,
  onNext,
  onPrev,
  canGoBack,
  isLast,
}: DiagnoseQuestionProps) => {
  const isSnapshot = question.category === 'snapshot';
  const sectionLabel = isSnapshot
    ? 'Uw bedrijf'
    : currentIndex < SNAPSHOT_COUNT + 5
      ? 'Aantrekkelijkheid van het Bedrijf'
      : currentIndex < SNAPSHOT_COUNT + 10
        ? 'Verkoopklaarheid van het Bedrijf'
        : 'Verkoopklaarheid van de Ondernemer';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
        {sectionLabel}
      </p>
      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8 leading-snug">
        {question.question}
      </h2>

      <div className={cn(
        "grid gap-3 mb-10",
        isSnapshot ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
      )}>
        {question.options.map((option) => {
          const isSelected = selectedValue === (option.score?.toString() || option.value);
          return (
            <button
              key={option.label}
              onClick={() => onSelect(option.score?.toString() || option.value)}
              className={cn(
                "rounded-lg border-2 px-4 py-3 text-left transition-all duration-200 text-sm font-medium",
                isSelected
                  ? "border-primary bg-primary/5 text-foreground shadow-sm"
                  : "border-border/30 bg-card text-muted-foreground hover:border-primary/40 hover:bg-card/80"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={onPrev}
          disabled={!canGoBack}
          className="text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vorige
        </Button>

        <Button
          onClick={onNext}
          disabled={!selectedValue}
          className="px-8"
        >
          {isLast ? 'Bekijk resultaat' : 'Volgende'}
          {!isLast && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default DiagnoseQuestionComponent;
