import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SectionTransitionProps {
  title: string;
  intro: string;
  isFirst: boolean;
  onContinue: () => void;
}

const SectionTransition = ({ title, intro, isFirst, onContinue }: SectionTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center py-8 md:py-16"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mb-10">
        {intro}
      </p>
      <Button onClick={onContinue} className="px-8 min-h-[48px]">
        {isFirst ? "Start" : "Volgende"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

export default SectionTransition;
