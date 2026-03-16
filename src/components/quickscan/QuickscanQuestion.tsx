import { useEffect, useCallback, useState } from "react";
import { DiagnoseQuestion as QuestionType, SNAPSHOT_COUNT } from "@/data/diagnoseData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuickscanQuestionProps {
  question: QuestionType;
  currentIndex: number;
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  isLast: boolean;
}

const likertLabels = ['Helemaal niet', 'Nauwelijks', 'Beperkt', 'Redelijk', 'Grotendeels', 'Volledig'];

const QuickscanQuestionComponent = ({
  question,
  currentIndex,
  selectedValue,
  onSelect,
  onNext,
  onPrev,
  canGoBack,
  isLast,
}: QuickscanQuestionProps) => {
  const isSnapshot = question.category === 'snapshot';
  const [direction, setDirection] = useState(1);
  const sectionLabel = isSnapshot
    ? 'Uw bedrijf'
    : currentIndex < SNAPSHOT_COUNT + 5
      ? 'Aantrekkelijkheid van het Bedrijf'
      : currentIndex < SNAPSHOT_COUNT + 10
        ? 'Verkoopklaarheid van het Bedrijf'
        : 'Verkoopklaarheid van de Ondernemer';

  const handleSelect = useCallback((value: string) => {
    onSelect(value);
    if (isSnapshot) {
      setTimeout(() => {
        setDirection(1);
        onNext();
      }, 300);
    }
  }, [onSelect, onNext, isSnapshot]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (selectedValue) { setDirection(1); onNext(); }
      } else if (e.key === 'ArrowLeft') {
        if (canGoBack) { setDirection(-1); onPrev(); }
      } else if (!isSnapshot) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 6) onSelect(num.toString());
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedValue, onNext, onPrev, onSelect, canGoBack, isSnapshot]);

  const handlePrev = () => { setDirection(-1); onPrev(); };
  const handleNext = () => { setDirection(1); onNext(); };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Section label */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-accent" />
          <span className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground">
            {sectionLabel}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-10 leading-snug tracking-tight">
          {question.question}
        </h2>

        {/* Likert scale — segmented horizontal control */}
        {!isSnapshot && (
          <div className="mb-10">
            {/* Segmented bar */}
            <div className="flex rounded-xl overflow-hidden border border-border/30 bg-card">
              {question.options.map((option, idx) => {
                const val = option.score?.toString() || option.value;
                const isSelected = selectedValue === val;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(val)}
                    className={cn(
                      "flex-1 relative py-4 md:py-5 transition-all duration-200 text-center min-h-[56px] touch-manipulation",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                      idx > 0 && "border-l border-border/20",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-inner"
                        : "hover:bg-muted/60 text-muted-foreground"
                    )}
                  >
                    <span className={cn(
                      "block text-lg md:text-xl font-bold transition-transform duration-200",
                      isSelected && "scale-110"
                    )}>
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Labels below */}
            <div className="flex justify-between mt-2.5 px-1">
              <span className="text-xs text-muted-foreground">{likertLabels[0]}</span>
              <span className="text-xs text-muted-foreground">{likertLabels[5]}</span>
            </div>
          </div>
        )}

        {/* Snapshot options — clean pill buttons */}
        {isSnapshot && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {question.options.map((option) => {
              const val = option.score?.toString() || option.value;
              const isSelected = selectedValue === val;
              return (
                <button
                  key={option.label}
                  onClick={() => handleSelect(val)}
                  className={cn(
                    "rounded-lg border-2 px-5 py-4 text-left transition-all duration-200 text-sm font-medium min-h-[52px] touch-manipulation",
                    isSelected
                      ? "border-primary bg-primary/5 text-foreground shadow-sm"
                      : "border-border/20 bg-card text-muted-foreground hover:border-primary/30 hover:bg-card/80 active:scale-[0.98]"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={!canGoBack}
            className="text-muted-foreground min-h-[48px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vorige
          </Button>

          {!isSnapshot && (
            <Button
              onClick={handleNext}
              disabled={!selectedValue}
              className="px-8 min-h-[48px]"
            >
              {isLast ? 'Bekijk resultaat' : 'Volgende'}
              {!isLast && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickscanQuestionComponent;
