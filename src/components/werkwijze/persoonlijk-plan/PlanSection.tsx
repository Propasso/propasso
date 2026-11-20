import { plan } from "./content";
import Placeholder from "./Placeholder";

/** Blok 4: wat een persoonlijk plan is. Vier vragen, vier onderdelen met wie ze maakt, vijf gebeurtenissen. */
const PlanSection = () => (
  <section id="het-plan" className="py-20 md:py-28 section-neutral-bg scroll-mt-24">
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

      {/* Vier vragen */}
      <h3 className="mt-16 text-2xl md:text-3xl font-semibold text-foreground">{plan.questions.title}</h3>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {plan.questions.cards.map((c) => (
          <li
            key={c.label}
            className={`rounded-2xl bg-white p-6 border ${c.highlight ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary))]" : "border-border"}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{c.label}</p>
            <p className="mt-3 text-base text-foreground leading-relaxed">{c.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 max-w-2xl">
        <p className="text-lg text-foreground leading-relaxed">
          {plan.questions.note} {plan.questions.noteWhy}
        </p>
        {!plan.questions.noteWhy && (
          <Placeholder className="mt-3">[ERVARING KAREL] Waarom belevingen? Eén zin in je eigen woorden.</Placeholder>
        )}
        <p className="mt-3 text-sm text-muted-foreground">{plan.questions.microcopy}</p>
      </div>

      {/* Vier onderdelen */}
      <h3 className="mt-20 text-2xl md:text-3xl font-semibold text-foreground">{plan.parts.title}</h3>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {plan.parts.cards.map((c) => (
          <li
            key={c.title}
            className={`relative rounded-2xl p-6 flex flex-col ${c.highlight ? "bg-primary text-primary-foreground" : "bg-white border border-border"}`}
          >
            {c.highlight && (
              <span className="self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                {plan.parts.highlightLabel}
              </span>
            )}
            <p className={`text-lg font-semibold leading-snug ${c.highlight ? "mt-4" : ""}`}>{c.title}</p>
            <p className={`mt-3 text-base leading-relaxed ${c.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{c.text}</p>
            <p className={`mt-auto pt-5 text-sm font-medium ${c.highlight ? "text-primary-foreground" : "text-primary"}`}>{c.who}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-lg text-foreground leading-relaxed max-w-2xl">{plan.parts.after}</p>

      {/* Vijf gebeurtenissen, compact */}
      <div className="mt-16 rounded-2xl bg-white border border-border p-6 md:p-8 max-w-5xl">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">{plan.events.title}</h3>
        <ol className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {plan.events.items.map((e, i) => (
            <li key={e} className="flex items-baseline gap-2 text-base text-foreground">
              <span className="stat-number text-lg leading-none">{String(i + 1).padStart(2, "0")}</span>
              {e}
            </li>
          ))}
        </ol>
        <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-3xl">{plan.events.text}</p>
      </div>
    </div>
  </section>
);

export default PlanSection;
