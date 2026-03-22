import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const CountUp = ({ target, suffix = "", prefix = "", duration = 1.2 }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

const stats = [
  {
    type: "count" as const,
    value: 78,
    suffix: "%",
    description: "van de MKB-ondernemers is niet klaar voor een exit als de kans zich aandient",
  },
  {
    type: "text" as const,
    display: "3–5 jaar",
    description: "is de optimale voorbereidingstijd voor een succesvolle bedrijfsoverdracht",
  },
  {
    type: "count" as const,
    value: 40,
    suffix: "%+",
    description: "hogere bedrijfswaarde is haalbaar met de juiste exitstrategie",
  },
];

const StatsBar = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      className="w-full py-14 bg-[hsl(var(--section-stats))]"
    >
      <div className="section-container">
        {/* Desktop: three columns */}
        <div className="hidden md:grid md:grid-cols-3 items-start">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-start">
              {i > 0 && (
                <div className="w-px h-10 bg-accent/40 shrink-0 mt-3" />
              )}
              <div className="flex-1 text-center px-6">
                <p className="text-4xl lg:text-5xl font-bold text-foreground leading-none mb-3">
                  {stat.type === "count" ? (
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.display}
                    </motion.span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mx-auto">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex md:hidden flex-col items-center gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="w-full">
              {i > 0 && (
                <div className="w-16 h-px bg-accent/40 mx-auto my-8" />
              )}
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground leading-none mb-2">
                  {stat.type === "count" ? (
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.display}
                    </motion.span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mx-auto">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
