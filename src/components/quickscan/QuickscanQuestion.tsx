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

  // Auto-advance for snapshot questions
  const handleSelect = useCallback((value: string) => {
    onSelect(value);
    if (isSnapshot) {
      setTimeout(() => {
        setDirection(1);
        onNext();
      }, 300);
    }
  }, [onSelect, onNext, isSnapshot]);

  // Keyboard navigation: 1-6 for Likert, arrow keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (selectedValue) {
          setDirection(1);
          onNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (canGoBack) {
          setDirection(-1);
          onPrev();
        }
      } else if (!isSnapshot) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 6) {
          onSelect(num.toString());
        }
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
          {question.options.map((option, idx) => {
            const val = option.score?.toString() || option.value;
            const isSelected = selectedValue === val;
            return (
              <button
                key={option.label}
                onClick={() => handleSelect(val)}
                className={cn(
                  "rounded-lg border-2 px-4 py-4 md:py-3 text-left transition-all duration-200 text-sm md:text-sm font-medium min-h-[48px] touch-manipulation",
                  isSelected
                    ? "border-primary bg-primary/5 text-foreground shadow-sm scale-[1.02]"
                    : "border-border/30 bg-card text-muted-foreground hover:border-primary/40 hover:bg-card/80 active:scale-[0.98]"
                )}
              >
                {!isSnapshot && (
                  <span className="text-xs text-muted-foreground/50 mr-1.5">{idx + 1}</span>
                )}
                {option.label}
              </button>
            );
          })}
        </div>

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
