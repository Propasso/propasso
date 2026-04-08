import { useEffect, useCallback, useState } from "react";
import { DiagnoseQuestion as QuestionType } from "@/data/diagnoseData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ScenarioQuestion from "./ScenarioQuestion";

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
  const isSnapshot = question.category === "snapshot";
  const isScenario = question.format === "scenario";
  const isLikert = !isSnapshot && !isScenario; // format "likert" or undefined diagnostic
  const [direction, setDirection] = useState(1);


  const handleSelectAndAdvance = useCallback(
    (value: string) => {
      onSelect(value);
      const delay = isScenario ? 600 : 350;
      setTimeout(() => {
        setDirection(1);
        onNext();
      }, delay);
    },
    [onSelect, onNext, isScenario],
  );

  const handleScenarioSelect = useCallback(
    (value: string) => {
      onSelect(value);
      setTimeout(() => {
        setDirection(1);
        onNext();
      }, 600);
    },
    [onSelect, onNext],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") {
        if (selectedValue) {
          setDirection(1);
          onNext();
        }
      } else if (e.key === "ArrowLeft") {
        if (canGoBack) {
          setDirection(-1);
          onPrev();
        }
      } else if (isLikert) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 6) onSelect(num.toString());
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedValue, onNext, onPrev, onSelect, canGoBack, isLikert]);

  const handlePrev = () => {
    setDirection(-1);
    onPrev();
  };
  const handleNext = () => {
    setDirection(1);
    onNext();
  };

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
        {/* Question */}
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-10 leading-snug tracking-tight">
          {question.question}
        </h2>

        {/* Scenario cards */}
        {isScenario && (
          <ScenarioQuestion
            options={question.options}
            selectedValue={selectedValue}
            onSelect={handleScenarioSelect}
          />
        )}

        {/* Likert scale — individual labeled steps (reversed: 6 = Klopt helemaal shown first) */}
        {isLikert && (
          <div className="mb-10">
            <div className="grid grid-cols-6 gap-2">
              {question.options.map((option, idx) => {
                const val = option.score?.toString() || option.value;
                const isSelected = selectedValue === val;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAndAdvance(val)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg py-4 px-1 transition-all duration-200 touch-manipulation",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      "border-2",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.04]"
                        : "border-border/20 bg-card hover:border-primary/30 hover:bg-muted/40 text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "text-lg md:text-xl font-bold",
                        isSelected ? "text-primary-foreground" : "text-foreground",
                      )}
                    >
                      {option.score || idx + 1}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] md:text-xs leading-tight text-center font-medium",
                        isSelected ? "text-primary-foreground/90" : "text-muted-foreground",
                      )}
                    >
                      {likertLabels[idx]}
                    </span>
                  </button>
                );
              })}
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
                  onClick={() => handleSelectAndAdvance(val)}
                  className={cn(
                    "rounded-lg border-2 px-5 py-4 text-left transition-all duration-200 text-sm font-medium min-h-[52px] touch-manipulation",
                    isSelected
                      ? "border-primary bg-primary/5 text-foreground shadow-sm"
                      : "border-border/20 bg-card text-muted-foreground hover:border-primary/30 hover:bg-card/80 active:scale-[0.98]",
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
            <Button onClick={handleNext} disabled={!selectedValue} className="px-8 min-h-[48px]">
              {isLast ? "Bekijk resultaat" : "Volgende"}
              {!isLast && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickscanQuestionComponent;
