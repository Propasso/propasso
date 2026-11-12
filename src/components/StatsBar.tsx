import { useRef, useState, useEffect, useLayoutEffect } from "react";

interface StatItem {
  value: string;
  suffix: string;
  countTo?: number;
  description: string;
}

const stats: StatItem[] = [
  {
    value: "78",
    suffix: "%",
    countTo: 78,
    description:
      "van de MKB-ondernemers is niet klaar voor een exit als de kans zich aandient",
  },
  {
    value: "3–5",
    suffix: " jaar",
    description:
      "is de optimale voorbereidingstijd voor een succesvolle bedrijfsoverdracht",
  },
  {
    value: "40",
    suffix: "%+",
    countTo: 40,
    description:
      "hogere bedrijfswaarde is haalbaar met de juiste voorbereiding",
  },
];

// De teller begint op de eindwaarde, zodat de statische HTML (prerender) en
// crawlers het echte getal lezen in plaats van 0. Zodra het blok in beeld komt,
// zet useLayoutEffect de waarde vóór de eerstvolgende paint op 0 en telt op naar
// de eindwaarde. Voor de bezoeker verandert er niets.
// In headless Chrome (prerender, navigator.webdriver) blijft de eindwaarde staan,
// zodat de snapshot nooit een tussenstand bevat.
function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(target);

  useLayoutEffect(() => {
    if (!active) return;
    if (typeof navigator !== "undefined" && navigator.webdriver) return;

    setValue(0);
    const start = performance.now();
    let raf: number;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);

  return value;
}

const StatsBar = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Na het laden van JavaScript (niet in de prerender) worden de tellers
  // onzichtbaar tot het blok in beeld komt, zodat de bezoeker nooit eerst de
  // eindwaarde en daarna 0 ziet. De statische HTML toont de eindwaarde.
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    if (typeof navigator !== "undefined" && navigator.webdriver) return;
    setArmed(true);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count78 = useCountUp(78, 1200, isVisible);
  const count40 = useCountUp(40, 1200, isVisible);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: "#E7F2DC", padding: "56px 0" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <div
                  className="mx-8"
                  style={{
                    width: "1px",
                    height: "40px",
                    backgroundColor: "rgba(193, 206, 57, 0.45)",
                  }}
                />
              )}
              <div className="text-center flex-1">
                <div
                  style={{
                    fontSize: "52px",
                    fontWeight: 700,
                    color: "#042940",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.countTo != null ? (
                    <span style={{ opacity: armed && !isVisible ? 0 : 1 }}>
                      {i === 0 ? count78 : count40}
                      {stat.suffix}
                    </span>
                  ) : (
                    <span
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: "opacity 600ms ease-out",
                      }}
                    >
                      {stat.value}
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p
                  className="mt-3 mx-auto"
                  style={{
                    fontSize: "14px",
                    color: "#2C786F",
                    maxWidth: "240px",
                    lineHeight: 1.5,
                  }}
                >
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden flex-col items-center">
          {stats.map((stat, i) => (
            <div key={i} className="w-full">
              {i > 0 && (
                <div
                  className="mx-auto my-8"
                  style={{
                    width: "80%",
                    height: "1px",
                    backgroundColor: "rgba(193, 206, 57, 0.4)",
                  }}
                />
              )}
              <div className="text-center">
                <div
                  style={{
                    fontSize: "52px",
                    fontWeight: 700,
                    color: "#042940",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.countTo != null ? (
                    <span style={{ opacity: armed && !isVisible ? 0 : 1 }}>
                      {i === 0 ? count78 : count40}
                      {stat.suffix}
                    </span>
                  ) : (
                    <span
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: "opacity 600ms ease-out",
                      }}
                    >
                      {stat.value}
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p
                  className="mt-3 mx-auto"
                  style={{
                    fontSize: "14px",
                    color: "#2C786F",
                    maxWidth: "280px",
                    lineHeight: 1.5,
                  }}
                >
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
