import { Link } from "react-router-dom";
import { approach } from "./content";
import Placeholder from "./Placeholder";
import SaleYearTimeline from "./SaleYearTimeline";

const LINK_TEXT = "drie verhalen";
const [introBefore, introAfter] = approach.intro.split(LINK_TEXT);

/** Blok 5: "Wat gaan we doen?" Drie fasen in gewone taal (geen fasenamen, briefing 4.1), tijdlijn, specialisten. */
const ApproachSection = () => (
  <section id="wat-gaan-we-doen" className="py-20 md:py-28 section-alt-bg scroll-mt-24">
    <div className="section-container">
      <p className="eyebrow">{approach.eyebrow}</p>
      <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance">{approach.title}</h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
        {introBefore}
        <Link to="/werkwijze" className="text-primary underline underline-offset-4 hover:no-underline">
          {LINK_TEXT}
        </Link>
        {introAfter}
      </p>

      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {approach.steps.map((s) => (
          <li key={s.number} className="rounded-2xl bg-white p-6 md:p-7">
            <span className="stat-number block text-4xl leading-none">{s.number}</span>
            <p className="mt-4 text-xl font-semibold text-foreground">{s.title}</p>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">{s.text}</p>
          </li>
        ))}
      </ol>
      {approach.practical ? (
        <p className="mt-6 text-lg text-foreground leading-relaxed max-w-2xl">{approach.practical}</p>
      ) : (
        <Placeholder className="mt-6 max-w-2xl">
          [KAREL VULT AAN] Hoe vaak we elkaar zien en wat je na de eerste fase op papier hebt.
        </Placeholder>
      )}

      <SaleYearTimeline />

      <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 className="text-2xl font-semibold text-foreground">{approach.specialists.title}</h3>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{approach.specialists.text}</p>
        </div>
        <div>
          {approach.example ? (
            <p className="text-lg text-foreground leading-relaxed">{approach.example}</p>
          ) : (
            <Placeholder>
              [ERVARING KAREL] Eén anoniem klantvoorbeeld: wat speelde er, wat hebben jullie gedaan, wat veranderde er
              (max 450 tekens).
            </Placeholder>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default ApproachSection;
