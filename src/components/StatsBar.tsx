import { useRef, useState, useEffect } from "react";

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

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
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
                    <>
                      {i === 0 ? count78 : count40}
                      {stat.suffix}
                    </>
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
                    <>
                      {i === 0 ? count78 : count40}
                      {stat.suffix}
                    </>
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
