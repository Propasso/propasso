import { useCallback } from "react";
import { DiagnoseOption } from "@/data/diagnoseData";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ScenarioQuestionProps {
  options: DiagnoseOption[];
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
}

const ScenarioQuestion = ({ options, selectedValue, onSelect }: ScenarioQuestionProps) => {
  const handleSelect = useCallback(
    (value: string) => {
      onSelect(value);
    },
    [onSelect],
  );

  return (
    <div className="flex flex-col gap-3 mb-10">
      {options.map((option, idx) => {
        const val = option.score?.toString() || option.value;
        const isSelected = selectedValue === val;
        return (
          <motion.button
            key={val}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut", delay: idx * 0.05 }}
            onClick={() => handleSelect(val)}
            className={cn(
              "w-full text-left rounded-lg px-4 py-4 transition-all duration-200 touch-manipulation",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "flex items-center justify-between gap-3",
              isSelected
                ? "border-2 border-primary bg-primary/10 shadow-md"
                : "border border-border/40 bg-card hover:border-primary/40 hover:shadow-sm"
            )}
          >
            <span
              className={cn(
                "text-sm md:text-base leading-relaxed",
                isSelected ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {option.label}
            </span>
            {isSelected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
                className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
              >
                <Check className="w-3.5 h-3.5 text-primary-foreground" />
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ScenarioQuestion;
