import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowDown } from "lucide-react";

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
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => {
          const section = document.getElementById("aanpak");
          section?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 group cursor-pointer flex flex-col items-center focus:outline-none"
        aria-label="Scroll naar beneden"
      >
        {/* Container for line + sliding arrow */}
        <div className="relative h-16 w-8 flex items-center justify-center">
          {/* Static vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-border/40 group-hover:border-dashed" />
          {/* Arrow that bounces along the line */}
          <div className="absolute left-1/2 -translate-x-1/2 animate-scroll-bounce">
            <div className="w-8 h-8 rounded-full border border-border/40 bg-background flex items-center justify-center group-hover:border-dashed group-hover:border-border/60 transition-all duration-300">
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <ArrowDown size={14} className="text-muted-foreground relative z-10" />
            </div>
          </div>
        </div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
