import { ArrowDown } from "lucide-react";
import { plan, route, approach } from "./content";
import RouteStep from "./RouteStep";
import KarelQuote from "./KarelQuote";
import RhythmContent from "./ApproachSection";

/**
 * Blok 4: het persoonlijke plan als één route in drie stappen (feedback Karel 20 nov 2026).
 * A Visie: vier vragen aan de keukentafel. B Plan: twee onderdelen en wie ze maakt. C Ritme: van schets tot tekenen.
 * Achtergrond loopt geleidelijk van blauwgrijs naar mint, zodat het verloop van de pagina blijft en het blok één geheel is.
 */
const PlanSection = () => (
  <section
    id="het-plan"
    className="py-20 md:py-28 scroll-mt-24"
    style={{ background: "linear-gradient(to bottom, hsl(var(--section-neutral)) 0%, hsl(var(--section-neutral)) 25%, hsl(var(--section-alt)) 75%, hsl(var(--section-alt)) 100%)" }}
  >
    <div className="section-container">
      <p className="eyebrow">{plan.eyebrow}</p>
      <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance">{plan.title}</h2>
      <div className="mt-6 space-y-5 max-w-2xl">
        {plan.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="text-lg text-muted-foreground leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-16 md:mt-20">
        {/* A. Visie */}
        <RouteStep letter="A" label={route.a} title={plan.questions.title}>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12 lg:items-start">
            <div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {plan.questions.cards.map((c) => (
                  <li key={c.label} className="rounded-2xl bg-white border border-border p-5 md:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">{c.label}</p>
                    <p className="mt-2.5 text-base text-foreground leading-relaxed">{c.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-center gap-2 text-lg font-semibold text-primary">
                <ArrowDown size={18} aria-hidden="true" />
                {plan.questions.outcome}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{plan.questions.microcopy}</p>
            </div>
            <KarelQuote text={plan.questions.quote} />
          </div>
        </RouteStep>

        {/* B. Plan */}
        <RouteStep letter="B" label={route.b} title={plan.parts.title}>
          <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-stretch">
            {plan.parts.main.map((c) => {
              const dark = Boolean(c.together);
              return (
                <div
                  key={c.title}
                  className={`rounded-2xl p-6 md:p-8 flex flex-col ${dark ? "bg-primary text-primary-foreground" : "bg-white border border-border"}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {dark && (
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{plan.parts.highlightLabel}</span>
                    )}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${dark ? "border border-primary-foreground/30 text-primary-foreground" : "border border-primary/25 text-primary"}`}
                    >
                      {c.who}
                    </span>
                  </div>
                  <p className={`mt-5 text-xl font-semibold leading-snug ${dark ? "" : "text-foreground"}`}>{c.title}</p>
                  <p className={`mt-3 text-base leading-relaxed ${dark ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{c.text}</p>
                  {c.sub && (
                    <div className="mt-6 border-t border-border pt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{plan.parts.subLabel}</p>
                      <ul className="mt-3 divide-y divide-border">
                        {c.sub.map((s) => (
                          <li key={s.title} className="py-3 first:pt-0 last:pb-0 sm:flex sm:items-start sm:justify-between sm:gap-6">
                            <div>
                              <p className="text-base font-semibold text-foreground">{s.title}</p>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                            </div>
                            <span className="mt-2 sm:mt-0 inline-block shrink-0 rounded-full border border-primary/25 px-3 py-1 text-xs font-semibold text-primary sm:max-w-[11rem] sm:text-right">
                              {s.who}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-lg text-foreground leading-relaxed max-w-2xl">{plan.parts.after}</p>
        </RouteStep>

        {/* C. Ritme */}
        <RouteStep letter="C" label={`${route.c} · ${approach.eyebrow}`} title={approach.title} last>
          <RhythmContent />
        </RouteStep>
      </div>
    </div>
  </section>
);

export default PlanSection;
