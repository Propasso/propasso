import AgendaScroll from "./AgendaScroll";
import { loss } from "./content";

/** Blok 2: je bedrijf was altijd je identiteit. De agenda die leegloopt, daarna de laag die niemand hardop zegt. */
const LossSection = () => (
  <section id="wat-je-kwijtraakt" className="pt-16 pb-20 md:pt-20 md:pb-28 section-neutral-bg scroll-mt-24">
    <div className="section-container">
      <AgendaScroll
        header={
          <div>
            <p className="eyebrow">{loss.eyebrow}</p>
            <h2 className="mt-4 text-3xl md:text-4xl xl:text-5xl font-bold max-w-3xl leading-tight text-balance">{loss.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">{loss.intro}</p>
          </div>
        }
      />

      <div className="mt-14 max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-semibold text-foreground">{loss.secondLayer.title}</h3>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{loss.secondLayer.text}</p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {loss.secondLayer.labels.map((label) => (
            <li key={label} className="rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-primary">
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default LossSection;
