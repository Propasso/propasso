import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ChevronRight, RotateCcw, Undo2 } from "lucide-react";
import karelPortret from "@/assets/images/karel-portret-2026.jpg";
import { pushEvent } from "@/lib/tracking";
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
 * nog niet = terug naar 2, ja = de verkoop. Daarna tijdlijn en het klantvoorbeeld als eigen kaart met knop.
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

    {/* Klantvoorbeeld: eigen kaart, zodat het verhaal niet wegvalt in de tekst eromheen */}
    <figure className="mt-16 rounded-3xl bg-white p-6 md:p-10 shadow-[0_24px_60px_-30px_rgba(5,41,64,0.35)] border border-border">
      <p className="eyebrow">{approach.exampleLabel}</p>
      {approach.example ? (
        <blockquote className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-foreground text-pretty">“{approach.example}”</blockquote>
      ) : (
        <Placeholder className="mt-6">[ERVARING KAREL] Eén anoniem klantvoorbeeld.</Placeholder>
      )}
      <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-5">
        <span className="flex items-center gap-3 text-sm">
          <img src={karelPortret} alt="" width={40} height={40} loading="lazy" decoding="async" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-semibold text-foreground">Karel Cremers</span>
        </span>
        <Link
          to="/contact"
          onClick={() => pushEvent("cta_click_contact", { event_source: "example" })}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:brightness-110 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {approach.exampleCta}
          <ChevronRight size={18} />
        </Link>
      </figcaption>
    </figure>
  </>
);

export default RhythmContent;
