import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Homepage, drie-stappenblok "Ontdekken, Bouwen, Kiezen".
 * Eén doorlopende lijn verbindt de stappen (teal bij 01 en 02); bij 03 splitst hij in drie takken
 * (lime) naar de keuzes. Desktop (lg): lijn horizontaal, takken rechts van stap 03. Mobiel: lijn
 * verticaal, takken onder stap 03.
 *
 * Animatie: de lijn vult zich met de scrollpositie, maar loopt nooit terug (speelt één keer af).
 * De takken tekenen zich pas als de lijn bij stap 03 is. Bij prefers-reduced-motion staat alles
 * direct volledig in beeld. Lijn, knooppunten en takken zijn decoratief (aria-hidden); alle tekst
 * staat in een sectie met een h2 en een geordende lijst, in leesvolgorde.
 * Kleuren uit de tokens: --primary (navy), --tint-teal (#2C786F), --accent (lime).
 */

const content = {
  heading: "Werken aan een beter bedrijf is de beste voorbereiding op de verkoop.",
  subheading: "Zo bepaal jij straks wanneer en aan wie je verkoopt.",
  steps: [
    {
      number: "01",
      title: "ONTDEKKEN",
      text: "Inzicht in de gezondheid van je bedrijf, de ondernemingswaarde, je eigen gereedheid, groeikansen en mogelijke risico's.",
    },
    {
      number: "02",
      title: "BOUWEN",
      text: "Versterk het management, verbeter de financiële resultaten, optimaliseer de bedrijfsvoering, breng de strategie op één lijn en bouw een bedrijf dat presteert zonder dat jij er steeds bij hoeft te zijn.",
    },
    {
      number: "03",
      title: "KIEZEN",
      text: "Als je bedrijf gezond en waardevol is, zit je niet vast aan je omstandigheden. Dan kies je zelf je toekomst.",
    },
  ],
  choices: ["Verkopen", "Overdragen aan familie of management", "Doorgaan"],
} as const;

const TEAL = "bg-[hsl(var(--tint-teal))]";
const EASE = [0.25, 0.1, 0.25, 1] as const;

/* Takken. Mobiel: start onder het knooppunt (x 24), eindigt rechts op y 32/96/160.
   Desktop: start rechts van stap 03 op lijnhoogte (y 24), eindigt op y 24/96/168. */
const MOBILE_BRANCHES = [
  { d: "M24 0 V8 Q24 32 48 32 H72", end: 32 },
  { d: "M24 0 V72 Q24 96 48 96 H72", end: 96 },
  { d: "M24 0 V136 Q24 160 48 160 H72", end: 160 },
];
const DESKTOP_BRANCHES = [
  { d: "M0 24 H84", end: 24 },
  { d: "M0 24 H24 Q48 24 48 48 V72 Q48 96 72 96 H84", end: 96 },
  { d: "M0 24 H24 Q48 24 48 48 V144 Q48 168 72 168 H84", end: 168 },
];
const LABEL_POSITION = ["top-8 lg:top-6", "top-24 lg:top-24", "top-40 lg:top-[168px]"];

/** Lijnstuk van een knooppunt naar het volgende: verticaal op mobiel, horizontaal op desktop. */
const Segment = ({ progress, color, className }: { progress: MotionValue<number>; color: string; className: string }) => (
  <span aria-hidden="true" className={`pointer-events-none absolute bg-primary-foreground/15 ${className}`}>
    <motion.span className={`absolute inset-0 origin-top lg:hidden ${color}`} style={{ scaleY: progress }} />
    <motion.span className={`absolute inset-0 origin-left hidden lg:block ${color}`} style={{ scaleX: progress }} />
  </span>
);

/** Knooppunt met het stapnummer; de gekleurde ring licht op als de lijn het punt bereikt. */
const Node = ({ number, lit, ring }: { number: string; lit: MotionValue<number>; ring: string }) => (
  <span
    aria-hidden="true"
    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-foreground/25 bg-primary text-sm font-semibold tracking-wide text-primary-foreground"
  >
    <motion.span className={`absolute -inset-0.5 rounded-full border-2 ${ring}`} style={{ opacity: lit }} />
    {number}
  </span>
);

const HomeStepsSection = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 55%"] });

  // Voortgang die alleen oploopt: zo speelt de animatie één keer af en loopt hij niet terug bij omhoog scrollen.
  const reachedProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > reachedProgress.get()) reachedProgress.set(v);
  });
  useEffect(() => {
    // Pagina geladen halverwege of onder het blok: direct de huidige stand overnemen.
    const v = scrollYProgress.get();
    if (v > reachedProgress.get()) reachedProgress.set(v);
  }, [scrollYProgress, reachedProgress]);

  // Rustig en zonder doorschieten (overgedempte veer).
  const smooth = useSpring(reachedProgress, { stiffness: 70, damping: 26, restDelta: 0.001 });

  const seg1 = useTransform(smooth, [0, 1 / 3], [0, 1]);
  const seg2 = useTransform(smooth, [1 / 3, 2 / 3], [0, 1]);
  const seg3 = useTransform(smooth, [2 / 3, 0.97], [0, 1]);
  const lit1 = useTransform(smooth, [0, 0.04], [0, 1]);
  const lit2 = useTransform(smooth, [1 / 3 - 0.02, 1 / 3 + 0.02], [0, 1]);
  const lit3 = useTransform(smooth, [2 / 3 - 0.02, 2 / 3 + 0.02], [0, 1]);
  const full = useMotionValue(1);

  const [branchesOpen, setBranchesOpen] = useState(false);
  useMotionValueEvent(smooth, "change", (v) => {
    if (v >= 0.97 && !branchesOpen) setBranchesOpen(true);
  });

  const show = reduceMotion || branchesOpen;
  const segments = reduceMotion ? [full, full, full] : [seg1, seg2, seg3];
  const lights = reduceMotion ? [full, full, full] : [lit1, lit2, lit3];

  const branchPath = (d: string, i: number) => (
    <motion.path
      key={d}
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
      animate={show ? { pathLength: 1 } : { pathLength: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: EASE, delay: i * 0.12 }}
    />
  );
  const branchDot = (x: number, y: number, i: number) => (
    <motion.circle
      key={`${x}-${y}`}
      cx={x}
      cy={y}
      r={4}
      fill="currentColor"
      initial={{ opacity: reduceMotion ? 1 : 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: EASE, delay: 0.7 + i * 0.12 }}
    />
  );

  return (
    <section aria-labelledby="stappen-titel" className="bg-primary py-16 md:py-24 lg:py-36 text-primary-foreground">
      <div className="section-container">
        <h2
          id="stappen-titel"
          className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance text-primary-foreground"
        >
          {content.heading}
        </h2>
        <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
          {content.subheading}
        </p>

        <ol
          ref={listRef}
          className="relative mt-14 lg:mt-20 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-x-10 lg:pr-72"
        >
          {content.steps.map((step, i) => {
            const last = i === content.steps.length - 1;
            return (
              <li key={step.number} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 lg:block">
                {last ? (
                  <Segment
                    progress={segments[i]}
                    color="bg-accent"
                    className="left-[23px] top-6 bottom-[192px] w-0.5 lg:left-6 lg:right-0 lg:top-[23px] lg:bottom-auto lg:h-0.5 lg:w-auto"
                  />
                ) : (
                  <Segment
                    progress={segments[i]}
                    color={TEAL}
                    className="left-[23px] top-6 h-[calc(100%+2.5rem)] w-0.5 lg:left-6 lg:top-[23px] lg:h-0.5 lg:w-[calc(100%+2.5rem)]"
                  />
                )}

                <Node number={step.number} lit={lights[i]} ring={last ? "border-accent" : "border-[hsl(var(--tint-teal))]"} />

                <div className="pt-2.5 lg:pt-6">
                  <h3 className="text-lg font-bold tracking-[0.12em] text-primary-foreground">{step.title}</h3>
                  <p className="mt-3 text-base text-primary-foreground/80 leading-relaxed">{step.text}</p>
                </div>

                {last && (
                  <div className="relative col-span-2 mt-8 h-[192px] lg:absolute lg:left-full lg:top-0 lg:mt-0 lg:h-[200px] lg:w-72">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 72 192"
                      className="absolute left-0 top-0 h-[192px] w-[72px] overflow-visible text-accent lg:hidden"
                    >
                      {MOBILE_BRANCHES.map((b, j) => branchPath(b.d, j))}
                      {MOBILE_BRANCHES.map((b, j) => branchDot(72, b.end, j))}
                    </svg>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 84 200"
                      className="absolute left-0 top-0 hidden h-[200px] w-[84px] overflow-visible text-accent lg:block"
                    >
                      {DESKTOP_BRANCHES.map((b, j) => branchPath(b.d, j))}
                      {DESKTOP_BRANCHES.map((b, j) => branchDot(84, b.end, j))}
                    </svg>
                    <ul className="absolute inset-0">
                      {content.choices.map((choice, j) => (
                        <motion.li
                          key={choice}
                          className={`absolute left-[84px] right-0 -translate-y-1/2 text-base font-medium leading-snug text-accent lg:left-[100px] ${LABEL_POSITION[j]}`}
                          initial={{ opacity: reduceMotion ? 1 : 0 }}
                          animate={{ opacity: show ? 1 : 0 }}
                          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE, delay: 0.75 + j * 0.12 }}
                        >
                          {choice}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HomeStepsSection;
