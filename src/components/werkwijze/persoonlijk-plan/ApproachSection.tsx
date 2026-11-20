import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { approach } from "./content";
import Placeholder from "./Placeholder";
import SaleYearTimeline from "./SaleYearTimeline";

const LINK_TEXT = "drie verhalen";
const [introBefore, introAfter] = approach.intro.split(LINK_TEXT);

/**
 * Stap C van de route ("Wat gaan we doen?"): drie stappen in gewone taal (geen fasenamen, briefing 4.1),
 * met een terugloop "elk kwartaal" en "Klaar om te tekenen" als eindpunt. Daarna tijdlijn, specialisten, voorbeeld.
 */
const RhythmContent = () => (
  <>
    <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
      {introBefore}
      <Link to="/werkwijze" className="text-primary underline underline-offset-4 hover:no-underline">
        {LINK_TEXT}
      </Link>
      {introAfter}
    </p>

    <ol className="mt-8 grid gap-4 md:grid-cols-3">
      {approach.steps.map((s, i) => (
        <li key={s.number} className="relative rounded-2xl bg-white p-6">
          <span className="stat-number block text-3xl leading-none">{s.number}</span>
          <p className="mt-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            {i === approach.steps.length - 1 && <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />}
            {s.title}
          </p>
          <p className="mt-2 text-base text-muted-foreground leading-relaxed">{s.text}</p>
          {i === 1 && (
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <RotateCcw size={13} aria-hidden="true" />
              elk kwartaal
            </p>
          )}
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

    <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-14">
      <div>
        <h4 className="text-xl md:text-2xl font-semibold text-foreground">{approach.specialists.title}</h4>
        <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{approach.specialists.text}</p>
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
  </>
);

export default RhythmContent;
