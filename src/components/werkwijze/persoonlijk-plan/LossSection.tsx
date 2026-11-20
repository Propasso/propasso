import AgendaScroll from "./AgendaScroll";
import KarelMoment from "./KarelMoment";
import { loss } from "./content";

/** Sectie 3: Wat je kwijtraakt (zwaartepunt van de pagina). */
const LossSection = () => (
  <section id="wat-je-kwijtraakt" className="py-24 md:py-32 section-neutral-bg scroll-mt-24">
    <div className="section-container">
      <p className="eyebrow">{loss.eyebrow}</p>
      <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance">{loss.title}</h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{loss.intro}</p>

      <AgendaScroll />

      <div className="mt-16 lg:mt-8 max-w-3xl">
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

      <KarelMoment />
    </div>
  </section>
);

export default LossSection;
