import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { approach } from "./content";
import { pushEvent } from "@/lib/tracking";

/**
 * Tijdlijn met eigen verkoopjaar (blok 5).
 * - Zonder JavaScript en in de geprerenderde HTML: de vier momenten als gewone tekst; de jaarknoppen zijn verborgen.
 * - Met JavaScript: keuze uit de komende tien jaar plus "Later"; het huidige jaar rekent de browser uit,
 *   zodat de keuze ook klopt als de statische HTML ouder is.
 * - Uitkomst onder de tijdlijn, voorgelezen via aria-live, eindigt met "Plan een kennismaking".
 * - Meten: timeline_select (categorie) en cta_click_contact met event_source "timeline".
 * - Niets opgeslagen, geen formulier.
 */

type OutcomeKey = keyof typeof approach.timeline.outcomes;

const categoryFor = (diff: number | "later"): { key: OutcomeKey; label: string } => {
  if (diff === "later" || diff > 10) return { key: "over10", label: ">10" };
  if (diff <= 1) return { key: "within1", label: "0-1" };
  if (diff <= 2) return { key: "y1to2", label: "1-2" };
  if (diff <= 5) return { key: "y3to5", label: "3-5" };
  return { key: "y6to10", label: "6-10" };
};

const SaleYearTimeline = () => {
  const t = approach.timeline;
  const groupId = useId();
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [choice, setChoice] = useState<number | "later" | null>(null);

  useEffect(() => setCurrentYear(new Date().getFullYear()), []);

  const years = currentYear ? Array.from({ length: 10 }, (_, i) => currentYear + 1 + i) : [];
  const diff = choice === null || currentYear === null ? null : choice === "later" ? "later" : choice - currentYear;
  const category = diff === null ? null : categoryFor(diff);
  const outcome = category ? t.outcomes[category.key] : null;

  const choose = (value: number | "later") => {
    setChoice(value);
    if (currentYear === null) return;
    const c = categoryFor(value === "later" ? "later" : value - currentYear);
    pushEvent("timeline_select", { timeline_category: c.label });
  };

  return (
    <div className="mt-14">
      {/* Jaarkeuze: pas zichtbaar als JavaScript draait */}
      {currentYear && (
        <fieldset>
          <legend className="text-xl md:text-2xl font-semibold text-foreground">{t.question}</legend>
          <div className="mt-5 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
            {[...years, "later" as const].map((y) => {
              const id = `${groupId}-${y}`;
              const checked = choice === y;
              return (
                <div key={y}>
                  <input
                    type="radio"
                    id={id}
                    name={`${groupId}-jaar`}
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => choose(y)}
                  />
                  <label
                    htmlFor={id}
                    className="flex h-11 cursor-pointer items-center justify-center rounded-full border border-primary/25 bg-white text-sm font-semibold tabular-nums text-primary transition-colors hover:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
                  >
                    {y === "later" ? t.laterLabel : y}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* De vier momenten */}
      <ol className="mt-10 grid gap-6 lg:grid-cols-4 lg:gap-0 relative">
        <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 top-[0.4rem] h-px bg-primary/25" />
        {t.moments.map((m, i) => {
          const here = outcome && outcome.moment === i;
          return (
            <li key={m.label} className="relative pl-6 lg:pl-0 lg:pr-8 border-l border-primary/25 lg:border-l-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[0.4rem] lg:left-0 top-0 h-3.5 w-3.5 rounded-full border-2 ${here ? "bg-accent border-primary" : "bg-white border-primary/50"}`}
              />
              <p className="lg:mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{m.label}</p>
              {here && <p className="mt-1 text-sm font-semibold text-primary">▲ {t.youAreHere}</p>}
              <p className="mt-2 text-lg font-semibold text-foreground">{m.title}</p>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">{m.text}</p>
            </li>
          );
        })}
      </ol>

      {/* Uitkomst */}
      <div aria-live="polite">
        {outcome && (
          <div className="mt-10 rounded-2xl bg-white border border-primary/20 p-6 md:p-8 shadow-[0_18px_40px_-24px_rgba(5,41,64,0.35)]">
            <h4 className="text-xl md:text-2xl font-semibold text-foreground text-balance">{outcome.title}</h4>
            <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">{outcome.text}</p>
            <ul className="mt-5 space-y-2">
              {outcome.actions.map((a) => (
                <li key={a} className="flex gap-3 text-base text-foreground">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              onClick={() => pushEvent("cta_click_contact", { event_source: "timeline" })}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:brightness-110 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t.cta}
              <ChevronRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleYearTimeline;
