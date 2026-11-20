import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { agenda, days, losses, loss as lossCopy, type AgendaItem, type LossId } from "./content";

/**
 * "De agenda die leegloopt" (werkwijzepagina persoonlijk plan, sectie 3).
 *
 * Werking:
 * - Een weekagenda staat vast in beeld; ernaast (desktop) of eronder (mobiel) scrollen de vijf verliezen.
 *   Bij elk verlies lichten de bijbehorende afspraken op; bij het volgende verlies verdwijnen ze.
 *   Na het vijfde verlies is de week leeg.
 * - Geen externe bibliotheek: stap bepalen op scrollpositie (requestAnimationFrame), overgang in CSS.
 * - Zonder JavaScript (en in de geprerenderde HTML): volle agenda en alle verliezen als gewone tekst.
 *   De effecten worden pas "ingeschakeld" (armed) na een echte scrollbeweging, als de sectie nadert.
 * - Minder beweging (prefers-reduced-motion): geen vastgezet beeld, maar volle agenda, de vijf
 *   verliezen en daarna de lege week.
 * - Toegankelijkheid: de agenda staat één keer als lijst voor screenreaders; de beelden zijn decoratief.
 * - Mobiel: lijstweergave ma tot wo (in een raster werden de titels afgekapt); alle vijf verliezen
 *   hebben afspraken op ma tot wo.
 *
 * Niet laten vervangen door Lovable (zie roadmap.md).
 */

const LOSS_COLOR: Record<LossId, string> = {
  identiteit: "#052940",
  zingeving: "#2C786F",
  ritme: "#6E8C99",
  mensen: "#5FA88E",
  bereiken: "#C8DC2A",
};

const lossIndex = (id: LossId) => losses.findIndex((l) => l.id === id) + 1;

const MOBILE_STEP_SVH = 42; // scrollafstand per stap op mobiel
const DAY_START = 7; // 07:00
const DAY_END = 18; // 18:00
const HOURS = DAY_END - DAY_START;

const toHours = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h + m / 60;
};

type ItemState = "normal" | "active" | "gone";

const itemState = (item: AgendaItem, step: number, live: boolean): ItemState => {
  if (!live) return "normal";
  const idx = lossIndex(item.loss);
  if (step > losses.length || idx < step) return "gone";
  if (idx === step) return "active";
  return "normal";
};

/** Volgorde binnen één verlies, voor een korte vertraging tussen afspraken */
const orderInLoss = (item: AgendaItem) => agenda.filter((a) => a.loss === item.loss).indexOf(item);

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
};

/* ---------- Beelden ---------- */

const itemStyle = (item: AgendaItem, state: ItemState): React.CSSProperties => {
  const color = LOSS_COLOR[item.loss];
  const delay = state === "gone" ? orderInLoss(item) * 90 : 0;
  return {
    borderLeftColor: color,
    backgroundColor: state === "active" ? `${color}2E` : `${color}14`,
    boxShadow: state === "active" ? `0 0 0 1.5px ${color}, 0 6px 18px -8px ${color}99` : "none",
    opacity: state === "gone" ? 0 : 1,
    transform: state === "gone" ? "scale(0.96)" : state === "active" ? "translateY(-1px)" : "none",
    transition: `opacity 650ms ease ${delay}ms, transform 650ms ease ${delay}ms, background-color 400ms ease, box-shadow 400ms ease`,
  };
};

const EmptyWeekLine = ({ visible }: { visible: boolean }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
    style={{ opacity: visible ? 1 : 0, transition: "opacity 900ms ease 500ms" }}
  >
    <p className="text-center text-lg md:text-2xl font-semibold text-primary text-balance">{lossCopy.emptyWeek}</p>
  </div>
);

/** Weekweergave (desktop) */
const WeekGrid = ({ step, live }: { step: number; live: boolean }) => {
  const empty = live && step > losses.length;
  return (
    <div aria-hidden="true" className="rounded-2xl border border-border bg-white shadow-[0_24px_60px_-30px_rgba(5,41,64,0.35)] overflow-hidden">
      <div className="grid grid-cols-[3.25rem_repeat(5,minmax(0,1fr))] border-b border-border">
        <div />
        {days.map((d) => (
          <div key={d.id} className="py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground border-l border-border/70">
            {d.label}
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-[3.25rem_repeat(5,minmax(0,1fr))] h-[32rem] xl:h-[36rem]">
        {/* Uurlijnen en tijden */}
        <div className="relative">
          {Array.from({ length: HOURS }, (_, i) => (
            <span
              key={i}
              className="absolute right-2 -translate-y-1/2 text-[10px] tabular-nums text-muted-foreground/80"
              style={{ top: `${(i / HOURS) * 100}%` }}
            >
              {i === 0 ? "" : `${String(DAY_START + i).padStart(2, "0")}:00`}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-[3.25rem] right-0">
          {Array.from({ length: HOURS - 1 }, (_, i) => (
            <div key={i} className="absolute inset-x-0 border-t border-border/60" style={{ top: `${((i + 1) / HOURS) * 100}%` }} />
          ))}
        </div>

        {days.map((d) => (
          <div key={d.id} className="relative border-l border-border/70">
            {agenda
              .filter((a) => a.day === d.id)
              .map((a) => {
                const state = itemState(a, step, live);
                const top = ((toHours(a.start) - DAY_START) / HOURS) * 100;
                const height = (a.minutes / 60 / HOURS) * 100;
                return (
                  <div
                    key={a.title}
                    className="absolute left-1 right-1 rounded-md border-l-[3px] px-2 py-1.5 overflow-hidden"
                    style={{ top: `${top}%`, height: `calc(${height}% - 3px)`, ...itemStyle(a, state) }}
                  >
                    <p className="text-[10px] leading-tight tabular-nums text-muted-foreground">{a.start}</p>
                    <p className="mt-0.5 text-[12px] xl:text-[13px] font-semibold leading-snug text-primary hyphens-auto break-words" lang="nl">{a.title}</p>
                  </div>
                );
              })}
          </div>
        ))}

        <EmptyWeekLine visible={empty} />
      </div>
    </div>
  );
};

/** Lijstweergave van ma tot wo (mobiel), zoals de agenda op een telefoon */
const MOBILE_DAYS = days.slice(0, 3);

const DayList = ({ step, live }: { step: number; live: boolean }) => {
  const empty = live && step > losses.length;
  return (
    <div aria-hidden="true" className="relative rounded-2xl border border-border bg-white shadow-[0_18px_40px_-24px_rgba(5,41,64,0.35)] px-4 py-3">
      {MOBILE_DAYS.map((d) => (
        <div key={d.id} className="py-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{d.label}</p>
          <ul className="mt-1 space-y-1">
            {agenda
              .filter((a) => a.day === d.id)
              .map((a) => {
                const state = itemState(a, step, live);
                return (
                  <li
                    key={a.title}
                    className="flex items-center gap-3 rounded-md border-l-[3px] px-2.5 py-1"
                    style={itemStyle(a, state)}
                  >
                    <span className="w-10 shrink-0 text-[11px] tabular-nums text-muted-foreground">{a.start}</span>
                    <span className="truncate text-[13px] font-semibold text-primary">{a.title}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
      <EmptyWeekLine visible={empty} />
    </div>
  );
};

/* ---------- Tekst ---------- */

const LossStep = ({ index, active, live }: { index: number; active: boolean; live: boolean }) => {
  const l = losses[index];
  return (
    <div
      className="transition-opacity duration-500"
      style={{ opacity: live && !active ? 0.28 : 1 }}
    >
      <span className="stat-number block text-4xl md:text-5xl leading-none">{l.number}</span>
      <h3 className="mt-3 flex items-center gap-2.5 text-xl md:text-2xl font-semibold text-foreground">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LOSS_COLOR[l.id] }} />
        {l.label}
      </h3>
      <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">{l.text}</p>
    </div>
  );
};

const EndStep = ({ live }: { active?: boolean; live: boolean }) => (
  <p
    className="text-xl md:text-2xl font-semibold text-primary transition-opacity duration-500"
    style={{ opacity: live ? 0 : 1 }}
  >
    {lossCopy.emptyWeek}
  </p>
);

/** De volledige agenda voor screenreaders, één keer in de HTML */
const ScreenReaderAgenda = () => (
  <ul className="sr-only">
    {days.map((d) => (
      <li key={d.id}>
        {d.label}:{" "}
        {agenda
          .filter((a) => a.day === d.id)
          .map((a) => `${a.start} ${a.title}`)
          .join(", ")}
      </li>
    ))}
  </ul>
);

/* ---------- Component ---------- */

const AgendaScroll = () => {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [armed, setArmed] = useState(false);
  const [step, setStep] = useState(0);

  // Inschakelen zodra de sectie in de buurt van het scherm komt, en pas na een echte scrollbeweging,
  // zodat de prerender (die niet scrolt) de gewone tekstversie vastlegt.
  // De ruime marge zorgt dat de opbouw wijzigt ruim voordat de sectie in beeld is (geen verspringen).
  useEffect(() => {
    if (reduced || armed || !rootRef.current) return;
    let near = false;
    let scrolled = false;
    const tryArm = () => {
      if (near && scrolled) setArmed(true);
    };
    const io = new IntersectionObserver(
      (entries) => {
        near = entries.some((e) => e.isIntersecting);
        tryArm();
      },
      { rootMargin: "0px 0px 150% 0px" },
    );
    const onScroll = () => {
      scrolled = true;
      tryArm();
    };
    io.observe(rootRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, armed]);

  const live = armed && !reduced;

  const update = useCallback(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const triggerY = window.innerHeight * (isDesktop ? 0.5 : 0.6);
    const perVariant = losses.length + 1; // vijf verliezen + lege week
    let current = 0;
    stepRefs.current.forEach((el, i) => {
      if (!el || el.offsetParent === null) return; // verborgen variant (desktop of mobiel) overslaan
      if (el.getBoundingClientRect().top < triggerY) current = (i % perVariant) + 1;
    });
    setStep((prev) => (prev === current ? prev : current));
  }, []);

  useEffect(() => {
    if (!live) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [live, update]);

  const totalSteps = losses.length + 1;
  const setStepRef = useMemo(
    () => (i: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[i] = el;
    },
    [],
  );

  /* Minder beweging: statisch, voor en na */
  if (reduced) {
    return (
      <div ref={rootRef}>
        <ScreenReaderAgenda />
        <figure className="mt-12">
          <figcaption className="sr-only">{lossCopy.figureDescription}</figcaption>
          <div className="hidden lg:block"><WeekGrid step={0} live={false} /></div>
          <div className="lg:hidden"><DayList step={0} live={false} /></div>
        </figure>
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {losses.map((_, i) => (
            <LossStep key={i} index={i} active live={false} />
          ))}
        </div>
        <div className="mt-14">
          <div className="hidden lg:block"><WeekGrid step={totalSteps} live /></div>
          <div className="lg:hidden"><DayList step={totalSteps} live /></div>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="mt-12 lg:mt-16">
      <ScreenReaderAgenda />

      {/* Desktop: agenda links vast, verliezen rechts */}
      <div className="hidden lg:grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-14 xl:gap-20">
        <figure className={live ? "sticky top-[calc(6rem+max(1.5rem,(100svh-6rem-39rem)/2))] self-start" : ""}>
          <figcaption className="sr-only">{lossCopy.figureDescription}</figcaption>
          <WeekGrid step={step} live={live} />
        </figure>
        <div className={live ? "py-[22vh]" : "space-y-12"}>
          {losses.map((_, i) => (
            <div key={i} ref={setStepRef(i)} className={live ? "min-h-[55vh] flex items-center" : ""}>
              <LossStep index={i} active={step === i + 1} live={live} />
            </div>
          ))}
          <div ref={setStepRef(losses.length)} className={live ? "min-h-[55vh] flex items-center" : ""}>
            <EndStep live={live} />
          </div>
        </div>
      </div>

      {/* Mobiel: agenda en het actieve verlies samen vast in beeld; onzichtbare markeringen bepalen de stap */}
      <div className="lg:hidden">
        {live ? (
          <div className="relative" style={{ height: `${totalSteps * MOBILE_STEP_SVH + 45}svh` }}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                ref={setStepRef(i + totalSteps)}
                aria-hidden="true"
                className="absolute inset-x-0 h-px"
                style={{ top: `${18 + i * MOBILE_STEP_SVH}svh` }}
              />
            ))}
            <div className="sticky top-20 z-10 pt-3">
              <figure>
                <figcaption className="sr-only">{lossCopy.figureDescription}</figcaption>
                <DayList step={step} live={live} />
              </figure>
              <div className="relative mt-6 h-[12rem]">
                {losses.map((_, i) => {
                  const shown = step === i + 1 || (step === 0 && i === 0);
                  return (
                    <div
                      key={i}
                      className="absolute inset-0"
                      style={{
                        opacity: shown ? 1 : 0,
                        transform: shown ? "none" : "translateY(6px)",
                        // eerst de oude tekst weg, dan de nieuwe erin: nooit twee teksten door elkaar
                        transition: shown
                          ? "opacity 320ms ease 240ms, transform 320ms ease 240ms"
                          : "opacity 200ms ease, transform 200ms ease",
                      }}
                      aria-hidden={!shown}
                    >
                      <LossStep index={i} active={step !== 0} live={live} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <>
            <figure>
              <figcaption className="sr-only">{lossCopy.figureDescription}</figcaption>
              <DayList step={0} live={false} />
            </figure>
            <div className="mt-10 space-y-8">
              {losses.map((_, i) => (
                <LossStep key={i} index={i} active live={false} />
              ))}
              <EndStep live={false} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgendaScroll;
