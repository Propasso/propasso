import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const heroSubtitles = [
  "Met betere resultaten.",
  "Met een overdraagbaar bedrijf.",
  "Met onafhankelijkheid.",
  "Met inzicht in je bedrijfswaarde.",
  "Met verkoopklaarheid.",
  "Met een helder plan voor daarna.",
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrollHovered, setIsScrollHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSubtitles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Yellow accent circle */}
      <div className="absolute top-20 right-0 w-[320px] h-[320px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] rounded-full bg-accent opacity-90 translate-x-1/4 md:translate-x-1/6" />

      <div className="section-container relative z-10 py-16 md:py-24">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-foreground text-balance"
          >
            Een succesvolle verkoop <span className="text-muted-foreground">begint jaren vóór de deal.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 h-10 md:h-12 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-2xl md:text-3xl font-semibold"
                style={{ color: "hsl(var(--teal-medium))" }}
              >
                {heroSubtitles[activeIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl"
          >
            Wij begeleiden MKB-ondernemers in de 3-5 jaar vóór de bedrijfsoverdracht naar maximale waarde en
            verkoopbaarheid, met een helder plan en regie voor de ondernemer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground hover:bg-teal-medium transition-colors"
            >
              Krijg inzicht in je verkoopklaarheid
              <ChevronRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-7 py-4 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Plan een kennismaking
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        {/* Vertical line */}
        <div className="w-[1.5px] h-16 bg-foreground" />
        {/* Circle with arrow */}
        <div className="relative w-10 h-10 -mt-[1px] flex items-center justify-center">
          {/* Solid circle — default */}
          <svg className="absolute inset-0 w-full h-full transition-opacity duration-300 group-hover:opacity-0" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18.5" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          </svg>
          {/* Dashed circle — hover */}
          <svg className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18.5" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="3.5 3.5" />
          </svg>
          {/* Yellow dot on hover */}
          <div className="absolute w-5 h-5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Chevron */}
          <ChevronRight size={16} className="text-foreground relative z-10 rotate-90" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
