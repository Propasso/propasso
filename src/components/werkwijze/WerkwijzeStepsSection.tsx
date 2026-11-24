import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
 * Werkwijze, stappenblok "Ontdekken, Bouwen, Kiezen" (/werkwijze, anker #zo-werk-ik; de homepage linkt hiernaartoe).
 * Lichte sectie (section-neutral-bg) met twee sporen:
 * - "Je bedrijf": drie stappen, verbonden door één teal lijn. Bij 03 Kiezen splitst die in drie takken
 *   naar Verkopen / Overdragen aan familie of management / Doorgaan. Onder Verkopen staat de rolafbakening.
 * - "Jijzelf": een dunne stippellijn parallel aan de stappen, met de link naar het persoonlijke plan.
 *   Desktop: horizontaal onder de stappen. Mobiel: verticaal links naast de stappen.
 * Limoen alleen als vlak of stip met donkerblauw erop (knooppunt 03, eindstippen), nooit als tekst of lijn.
 * Animatie: alleen de lijn van "Je bedrijf" vult zich één keer bij het scrollen (loopt niet terug);
 * bij prefers-reduced-motion staat hij direct volledig. Lijnen en knooppunten zijn aria-hidden.
 * Besluit Karel 24 nov 2026: de losse alinea's (ritme, check-in, persoonlijk plan) vervallen, die staan op
 * /werkwijze/persoonlijk-plan-opstellen. Alleen de zin over de verkooppartij blijft, letterlijk.
 */

const content = {
  eyebrow: "Exit planning in drie stappen",
  heading: "Werken aan een beter bedrijf is de beste voorbereiding op de verkoop.",
  subheading: "Zo bepaal jij straks wanneer en aan wie je verkoopt.",
  companyTrack: "Je bedrijf",
  personalTrack: "Jijzelf",
  personalLink: { label: "Zo werkt het persoonlijke plan", href: "/werkwijze/persoonlijk-plan-opstellen" },
  steps: [
    {
      number: "01",
      title: "Ontdekken",
      text: "Inzicht in de gezondheid en potentie van je bedrijf, de ondernemingswaarde, gereedheid van ondernemer, groeikansen en mogelijke risico's.",
    },
    {
      number: "02",
      title: "Bouwen",
      text: "Versterk het management, verbeter de financiële resultaten, optimaliseer de bedrijfsvoering, breng de strategie op één lijn en bouw een bedrijf dat presteert zonder dat jij er steeds bij hoeft te zijn.",
    },
    {
      number: "03",
      title: "Kiezen",
      text: "Een beter stuurbaar en overdraagbaar bedrijf presteert vaak beter, heeft een hogere bedrijfswaarde en kan zelfstandig opereren. Zo kies jij voor de exit op jouw moment, onder jouw voorwaarden.",
    },
  ],
  choices: [
    {
      label: "Verkopen",
      note: "Kies je voor verkoop, dan help ik je de juiste verkooppartij te kiezen; het verkoopproces zelf doet die partij.",
    },
    { label: "Overdragen aan familie of management" },
    { label: "Doorgaan" },
  ],
} as const;

/** De drie stappen, ook gebruikt voor de ItemList-JSON-LD in Werkwijze.tsx (één bron voor tekst en schema). */
export const werkwijzeSteps = content.steps;

const LINE = "bg-[hsl(var(--tint-teal))]";

/** Lijnstuk van een knooppunt naar het volgende: verticaal op mobiel, horizontaal op desktop. */
const Segment = ({ progress, className }: { progress: MotionValue<number>; className: string }) => (
  <span aria-hidden="true" className={`pointer-events-none absolute bg-primary/10 ${className}`}>
    <motion.span className={`absolute inset-0 origin-top lg:hidden ${LINE}`} style={{ scaleY: progress }} />
    <motion.span className={`absolute inset-0 origin-left hidden lg:block ${LINE}`} style={{ scaleX: progress }} />
  </span>
);

/** Knooppunt met het stapnummer. Stap 03 is een limoen vlak met donkerblauw erop. */
const Node = ({ number, last }: { number: string; last: boolean }) => (
  <span
    aria-hidden="true"
    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary text-sm font-bold text-primary ${
      last ? "bg-accent" : "bg-background"
    }`}
  >
    {number}
  </span>
);

/*
 * Takken bij Kiezen als CSS-boom. Elke keuze krijgt een bocht (::before) naar zijn label en,
 * behalve de laatste, een doorlopende stam (::after) naar de volgende keuze.
 * Mobiel loopt de stam door vanaf het knooppunt erboven. Desktop komt de eerste tak recht uit de
 * horizontale lijn, dus daar geen bocht en begint de stam pas op lijnhoogte.
 */
const CHOICE =
  "relative pl-10 pb-5 last:pb-0 " +
  "before:absolute before:left-0 before:top-0 before:h-3 before:w-6 before:rounded-bl-xl before:border-b-2 before:border-l-2 before:border-[hsl(var(--tint-teal))] before:content-[''] " +
  "after:absolute after:left-0 after:top-0 after:bottom-0 after:border-l-2 after:border-[hsl(var(--tint-teal))] after:content-[''] last:after:hidden " +
  "lg:first:before:rounded-none lg:first:before:border-l-0 lg:first:after:top-3";

const WerkwijzeStepsSection = ({ id = "zo-werk-ik" }: { id?: string }) => {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 55%"] });

  // Voortgang die alleen oploopt: de lijn vult zich één keer en loopt niet terug bij omhoog scrollen.
  const reached = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > reached.get()) reached.set(v);
  });
  useEffect(() => {
    const v = scrollYProgress.get();
    if (v > reached.get()) reached.set(v);
  }, [scrollYProgress, reached]);

  const smooth = useSpring(reached, { stiffness: 70, damping: 26, restDelta: 0.001 });
  const seg1 = useTransform(smooth, [0, 1 / 3], [0, 1]);
  const seg2 = useTransform(smooth, [1 / 3, 2 / 3], [0, 1]);
  const seg3 = useTransform(smooth, [2 / 3, 1], [0, 1]);
  const full = useMotionValue(1);
  const segments = reduceMotion ? [full, full, full] : [seg1, seg2, seg3];

  return (
    <section id={id} aria-labelledby="stappen-titel" className="scroll-mt-28 section-neutral-bg py-16 md:py-24 lg:py-32">
      <div className="section-container">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="stappen-titel" className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance">
          {content.heading}
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{content.subheading}</p>

        <div className="relative mt-12 lg:mt-16 pl-8 lg:pl-0">
          {/* Spoor Jijzelf, mobiel: verticale stippellijn links naast de stappen, tot aan het label onderaan. */}
          <span
            aria-hidden="true"
            className="absolute left-[3px] top-2 bottom-9 border-l-2 border-dashed border-primary/35 lg:hidden"
          />

          <p className="text-sm font-semibold text-primary">{content.companyTrack}</p>

          <ol
            ref={listRef}
            className="relative mt-5 flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_18rem] lg:gap-x-10"
          >
            {content.steps.map((step, i) => {
              const last = i === content.steps.length - 1;
              return (
                <li key={step.number} className={last ? "lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-10" : ""}>
                  <div className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 lg:block">
                    <Segment
                      progress={segments[i]}
                      className={
                        last
                          ? "left-[23px] top-6 -bottom-6 w-0.5 lg:left-6 lg:-right-10 lg:top-[23px] lg:bottom-auto lg:h-0.5 lg:w-auto"
                          : "left-[23px] top-6 -bottom-10 w-0.5 lg:left-6 lg:-right-10 lg:top-[23px] lg:bottom-auto lg:h-0.5 lg:w-auto"
                      }
                    />
                    <Node number={step.number} last={last} />
                    <div className="pt-2.5 lg:pt-6">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-base text-muted-foreground leading-relaxed">{step.text}</p>
                    </div>
                  </div>

                  {last && (
                    <ul className="mt-6 ml-[23px] lg:ml-0 lg:mt-3">
                      {content.choices.map((choice) => (
                        <li key={choice.label} className={CHOICE}>
                          <span
                            aria-hidden="true"
                            className="absolute left-[18px] top-3 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-primary bg-accent"
                          />
                          <span className="block text-base font-semibold leading-6">{choice.label}</span>
                          {"note" in choice && (
                            <span className="mt-1 block text-sm text-muted-foreground leading-relaxed">{choice.note}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Spoor Jijzelf: desktop een horizontale stippellijn onder de stappen, mobiel het eindpunt van de verticale lijn. */}
          <div className="relative mt-10 lg:mt-14 lg:pr-[calc(18rem+2.5rem)]">
            <span
              aria-hidden="true"
              className="absolute -left-8 top-3 h-2.5 w-2.5 -translate-x-px -translate-y-1/2 rounded-full bg-primary/40 lg:hidden"
            />
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-5">
              <p className="text-sm font-semibold text-primary leading-6">{content.personalTrack}</p>
              <span aria-hidden="true" className="hidden lg:block flex-1 border-t-2 border-dashed border-primary/35" />
              <Link
                to={content.personalLink.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-4 hover:no-underline"
              >
                {content.personalLink.label}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WerkwijzeStepsSection;
