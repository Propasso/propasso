import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, RotateCcw, Undo2 } from "lucide-react";
import { approach } from "./content";
import Placeholder from "./Placeholder";
import SaleYearTimeline from "./SaleYearTimeline";

const LINK_TEXT = "drie verhalen";
const [s1, s2, s3] = approach.steps;
const c = approach.cycle;

type Step = (typeof approach.steps)[number];

/** Eén stap: zelfde opmaak voor 1, 2 en 3. */
const StepCard = ({ step, tag }: { step: Step; tag?: string }) => (
  <div className="h-full rounded-2xl bg-white p-6">
    <span className="stat-number block text-3xl leading-none">{step.number}</span>
    <p className="mt-3 text-lg font-semibold text-foreground">{step.title}</p>
    <p className="mt-2 text-base text-muted-foreground leading-relaxed">{step.text}</p>
    {tag && <p className="mt-4 inline-block rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">{tag}</p>}
  </div>
);
const [introBefore, introAfter] = approach.intro.split(LINK_TEXT);

/**
 * Stap C van de route ("Wat gaan we doen?"): drie stappen in gewone taal (geen fasenamen, briefing 4.1).
 * Stap 1 eenmalig (A en B), stap 2 en 3 als lus per kwartaal met de vraag "klaar voor de exit?";
 * nog niet = terug naar 2, ja = de verkoop. Daarna tijdlijn, specialisten, voorbeeld.
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

    {/* Cyclus: stap 1 eenmalig, stap 2 en 3 als lus per kwartaal, daarna de verkoop */}
    <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.15fr)_minmax(0,0.85fr)] lg:items-stretch">
      <StepCard step={s1} tag={c.once} />

      <div className="relative rounded-3xl border-2 border-dashed border-primary/25 p-3 md:p-4">
        <p className="flex items-center gap-1.5 px-2 pb-3 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          <RotateCcw size={14} aria-hidden="true" />
          {c.loop}
        </p>
        <ol className="grid gap-3 sm:grid-cols-2" start={2}>
          <li><StepCard step={s2} /></li>
          <li><StepCard step={s3} /></li>
        </ol>
        <p className="mt-3 flex items-center gap-1.5 px-2 text-sm font-medium text-muted-foreground">
          <Undo2 size={15} aria-hidden="true" />
          {c.notYet}
        </p>
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-primary p-6 text-primary-foreground">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/70">
          <ArrowRight size={14} aria-hidden="true" className="hidden lg:block" />
          <ArrowDown size={14} aria-hidden="true" className="lg:hidden" />
          {c.yes}
        </p>
        <p className="mt-3 flex items-center gap-2 text-lg font-semibold">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />
          {c.endTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">{c.endText}</p>
      </div>
    </div>
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
