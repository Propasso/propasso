import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Waves, Compass, Rocket } from "lucide-react";

const phases = [
  {
    number: "01",
    title: "Analysefase",
    subtitle: "Begrijpen",
    icon: Search,
    description:
      "De basis: inzicht in de ondernemer, de onderneming en de financiële werkelijkheid. Waar staat het bedrijf écht?",
    questions: [
      "Wat zijn de persoonlijke ambities van de ondernemer?",
      "Hoe ziet de financiële gezondheid van het bedrijf eruit?",
      "Welke risico's en afhankelijkheden bestaan er?",
      "Wat is de huidige marktpositie?",
    ],
    deliverables: ["Ondernemersverhaal", "Analyse van de onderneming", "Financiële analyse"],
  },
  {
    number: "02",
    title: "De Realiteit",
    subtitle: "Identificeren",
    icon: Waves,
    description:
      "Waar schuurt het? Identificatie van de spanning tussen de ambities van de ondernemer, de realiteit van het bedrijf en de financiële prestaties.",
    questions: [
      "Sluit de bedrijfsrichting aan bij de ambitie van de ondernemer?",
      "Waar zit de kloof tussen wens en werkelijkheid?",
      "Welke patronen houden verandering tegen?",
      "Wat zijn de onuitgesproken knelpunten?",
    ],
    deliverables: [
      "Frictieanalyse ondernemer / bedrijf / cijfers",
      "Alignment-overzicht",
      "Prioritering van knelpunten",
    ],
  },
  {
    number: "03",
    title: "Koers bepalen",
    subtitle: "Richting geven",
    icon: Compass,
    description:
      "Strategische richting, prioriteiten en een concreet waardecreatieplan. Van inzicht naar een helder actieplan.",
    questions: [
      "Welke waardedrijvers hebben de meeste impact?",
      "Wat is de gewenste tijdshorizon?",
      "Welke strategische keuzes moeten nu gemaakt worden?",
      "Hoe vertalen we ambities naar meetbare doelen?",
    ],
    deliverables: ["Strategische richting", "Waardecreatieplan", "OGSM-structuur"],
  },
  {
    number: "04",
    title: "Doorpakken",
    subtitle: "Realiseren",
    icon: Rocket,
    description:
      "Uitvoering, governance en implementatie. Structuur en ritme om de koers vast te houden en resultaten te realiseren.",
    questions: [
      "Hoe borgen we uitvoering in de organisatie?",
      "Welke governance-structuur past bij het bedrijf?",
      "Hoe houden we momentum en focus?",
      "Wanneer is het bedrijf écht verkoopklaar?",
    ],
    deliverables: ["Implementatieplan", "Governance-structuur", "Ritme van uitvoering"],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const MethodologyFramework = () => {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-40 relative">
      {/* Subtle centerpiece background treatment */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1200px,200vw)] h-[800px] rounded-full opacity-[0.025]"
          style={{
            background: "radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Onze methodiek</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          Van analyse naar uitvoering, in vier strategische fases
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Een gestructureerd traject dat begint bij inzicht en eindigt bij verkoopklaarheid. Elke fase bouwt voort op de
          vorige.
        </motion.p>

        {/* ── Horizontal roadmap (desktop) ── */}
        <div className="mt-20 hidden lg:block">
          {/* Connecting line */}
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-px bg-border" />

            {/* Phase nodes */}
            <div className="grid grid-cols-4 gap-0">
              {phases.map((phase, i) => {
                const Icon = phase.icon;
                const isActive = activePhase === i;

                return (
                  <motion.div
                    key={phase.number}
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="relative"
                    onMouseEnter={() => setActivePhase(i)}
                    onMouseLeave={() => setActivePhase(null)}
                  >
                    {/* Node circle */}
                    <div className="flex items-center mb-10">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          backgroundColor: isActive ? "hsl(var(--accent))" : "hsl(var(--background))",
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border shadow-sm"
                      >
                        <Icon
                          size={24}
                          className={`transition-colors duration-250 ${
                            isActive ? "text-accent-foreground" : "text-primary"
                          }`}
                        />
                      </motion.div>

                      {/* Connector bar (not on last) */}
                      {i < phases.length - 1 && <div className="flex-1 h-px bg-border mx-2" />}
                    </div>

                    {/* Phase content */}
                    <div className="pr-8 cursor-default">
                      <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        Fase {phase.number}
                      </span>
                      <h3
                        className={`mt-2 text-xl font-bold transition-colors duration-250 ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {phase.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-muted-foreground italic">{phase.subtitle}</p>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{phase.description}</p>

                      {/* Expandable detail on hover */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            {/* Key questions */}
                            <div className="mt-5 pt-5 border-t border-border/50">
                              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                                Kernvragen
                              </span>
                              <ul className="mt-2 space-y-1.5">
                                {phase.questions.map((q) => (
                                  <li
                                    key={q}
                                    className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                    {q}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Deliverables */}
                            <div className="mt-4">
                              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                                Resultaat
                              </span>
                              <ul className="mt-2 space-y-1.5">
                                {phase.deliverables.map((d) => (
                                  <li key={d} className="text-sm font-medium text-foreground flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Vertical timeline (mobile / tablet) ── */}
        <div className="mt-16 lg:hidden">
          <div className="relative pl-10">
            {/* Vertical line */}
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {phases.map((phase, i) => {
                const Icon = phase.icon;
                const isActive = activePhase === i;

                return (
                  <motion.div
                    key={phase.number}
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="relative"
                    onClick={() => setActivePhase(isActive ? null : i)}
                  >
                    {/* Node */}
                    <div
                      className={`absolute -left-10 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-250 ${
                        isActive ? "bg-accent border-accent" : "bg-background border-border"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`transition-colors duration-250 ${
                          isActive ? "text-accent-foreground" : "text-primary"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        Fase {phase.number}
                      </span>
                      <h3 className="mt-1 text-xl font-bold">{phase.title}</h3>
                      <p className="mt-0.5 text-sm font-medium text-muted-foreground italic">{phase.subtitle}</p>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{phase.description}</p>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 pt-5 border-t border-border/50">
                              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                                Kernvragen
                              </span>
                              <ul className="mt-2 space-y-1.5">
                                {phase.questions.map((q) => (
                                  <li
                                    key={q}
                                    className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                    {q}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-4">
                              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                                Resultaat
                              </span>
                              <ul className="mt-2 space-y-1.5">
                                {phase.deliverables.map((d) => (
                                  <li key={d} className="text-sm font-medium text-foreground flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologyFramework;
