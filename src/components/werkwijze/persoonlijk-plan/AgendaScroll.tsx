import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { agenda, days, losses, loss as lossCopy, type AgendaItem, type LossId } from "./content";

/**
 * "De agenda die leegloopt" (blok 2). Ronde 2, feedback Karel 20 nov 2026.
 *
 * Desktop (breed én hoog genoeg): kop, intro, weekagenda en de lijst met vijf verliezen staan samen vast in beeld.
 *   De verliezen staan dicht onder elkaar en wisselen niet; bij het scrollen licht het volgende verlies op en verdwijnen
 *   de bijbehorende afspraken. Na twee à drie korte scrollbewegingen is de week leeg, daarna scrolt de pagina door.
 * Mobiel: een klein agenda-icoon (ca. 2 x 2 cm) met een stip per afspraak, zoals de maandweergave op een telefoon.
 *   Icoon en het actieve verlies staan samen vast in beeld; bij het scrollen verdwijnen de stipjes.
 * Stap bepalen: scrollvoortgang door het vastgezette stuk (requestAnimationFrame), overgang in CSS. Geen bibliotheek,
 *   geen overname van het scrollen: de pagina scrolt gewoon, alleen het beeld blijft staan.
 * Zonder JavaScript en in de geprerenderde HTML: volle agenda en alle verliezen als gewone tekst. Effecten worden pas
 *   ingeschakeld na een echte scrollbeweging als de sectie nadert.
 * Minder beweging: geen vastgezet beeld; volle agenda, de vijf verliezen en daarna de lege week.
 * Toegankelijkheid: agenda en verliezen staan één keer als tekst voor screenreaders; de beelden zijn decoratief.
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

const TOTAL = losses.length + 1; // vijf verliezen + lege week
const DESKTOP_EXTRA_SVH = 130; // extra scrollafstand terwijl het beeld vaststaat
const MOBILE_EXTRA_SVH = 160;
const MIN_BLOCK_MINUTES = 60;
const DAY_START = 7;
const DAY_END = 18;
const HOURS = DAY_END - DAY_START;

const lossIndex = (id: LossId) => losses.findIndex((l) => l.id === id) + 1;
const toHours = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h + m / 60;
};
const orderInLoss = (item: AgendaItem) => agenda.filter((a) => a.loss === item.loss).indexOf(item);

type ItemState = "normal" | "active" | "gone";
const itemState = (item: AgendaItem, step: number, live: boolean): ItemState => {
  if (!live) return "normal";
  const idx = lossIndex(item.loss);
  if (step > losses.length || idx < step) return "gone";
  if (idx === step) return "active";
  return "normal";
};

/** Voortgang 0..1 → stap 0 (volle week) .. 6 (lege week); de lege week blijft het langst staan. */
const stepFromProgress = (p: number) => (p < 0.08 ? 0 : Math.min(TOTAL, 1 + Math.floor((p - 0.08) / 0.14)));

const useMedia = (query: string) => {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
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
    transition: `opacity 550ms ease ${delay}ms, transform 550ms ease ${delay}ms, background-color 350ms ease, box-shadow 350ms ease`,
  };
};

const EmptyWeekLine = ({ visible, className = "" }: { visible: boolean; className?: string }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 flex items-center justify-center px-6 ${className}`}
    style={{ opacity: visible ? 1 : 0, transition: "opacity 700ms ease 400ms" }}
  >
    <p className="text-center text-lg md:text-2xl font-semibold text-primary text-balance">{lossCopy.emptyWeek}</p>
  </div>
);

/** Weekweergave (desktop). Hoogte schaalt mee met het scherm, zodat kop en agenda samen passen. */
const WeekGrid = ({ step, live, fit }: { step: number; live: boolean; fit: boolean }) => (
  <div aria-hidden="true" className="rounded-2xl border border-border bg-white shadow-[0_24px_60px_-30px_rgba(5,41,64,0.35)] overflow-hidden">
    <div className="grid grid-cols-[3rem_repeat(5,minmax(0,1fr))] border-b border-border">
      <div />
      {days.map((d) => (
        <div key={d.id} className="py-2.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground border-l border-border/70">
          {d.label}
        </div>
      ))}
    </div>
    <div
      className="relative grid grid-cols-[3rem_repeat(5,minmax(0,1fr))]"
      style={{ height: fit ? "clamp(17rem, calc(100svh - 25.5rem), 32rem)" : "32rem" }}
    >
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
      <div className="pointer-events-none absolute inset-y-0 left-[3rem] right-0">
        {Array.from({ length: HOURS - 1 }, (_, i) => (
          <div key={i} className="absolute inset-x-0 border-t border-border/60" style={{ top: `${((i + 1) / HOURS) * 100}%` }} />
        ))}
      </div>
      {days.map((d) => (
        <div key={d.id} className="relative border-l border-border/70">
          {agenda
            .filter((a) => a.day === d.id)
            .map((a) => {
              const top = ((toHours(a.start) - DAY_START) / HOURS) * 100;
              // Minimale hoogte, zodat korte afspraken (30 min) hun titel kunnen tonen; de tijd zelf blijft zoals ingevuld.
              const height = (Math.max(a.minutes, MIN_BLOCK_MINUTES) / 60 / HOURS) * 100;
              return (
                <div
                  key={a.title}
                  className="absolute left-1 right-1 rounded-md border-l-[3px] px-2 py-1 overflow-hidden"
                  style={{ top: `${top}%`, height: `calc(${height}% - 3px)`, ...itemStyle(a, itemState(a, step, live)) }}
                >
                  <p className={`text-[10px] leading-tight tabular-nums text-muted-foreground ${fit ? "[@media(max-height:860px)]:hidden" : ""}`}>{a.start}</p>
                  <p className="mt-0.5 text-[12px] xl:text-[13px] font-semibold leading-tight text-primary hyphens-auto break-words line-clamp-2" lang="nl">
                    {a.title}
                  </p>
                </div>
              );
            })}
        </div>
      ))}
      <EmptyWeekLine visible={live && step > losses.length} />
    </div>
  </div>
);

/** Agenda-icoon (mobiel): een stip per afspraak, per dag een kolom, zoals een maandweergave op de telefoon. */
const AgendaIcon = ({ step, live }: { step: number; live: boolean }) => (
  <div
    aria-hidden="true"
    className="relative h-[7.5rem] w-[7.5rem] shrink-0 rounded-[1.6rem] border border-border bg-white shadow-[0_14px_30px_-16px_rgba(5,41,64,0.45)] overflow-hidden"
  >
    <div className="flex h-7 items-center justify-center bg-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
      Week
    </div>
    <div className="grid grid-cols-5 gap-x-1 px-2.5 pt-2">
      {days.map((d) => (
        <div key={d.id} className="flex flex-col items-center">
          <span className="text-[9px] font-semibold uppercase text-muted-foreground">{d.label.charAt(0)}</span>
          <div className="mt-1.5 flex flex-col items-center gap-[5px]">
            {agenda
              .filter((a) => a.day === d.id)
              .map((a) => {
                const state = itemState(a, step, live);
                const delay = state === "gone" ? orderInLoss(a) * 90 : 0;
                return (
                  <span
                    key={a.title}
                    className="block h-[9px] w-[9px] rounded-full"
                    style={{
                      backgroundColor: LOSS_COLOR[a.loss],
                      opacity: state === "gone" ? 0 : 1,
                      transform: state === "gone" ? "scale(0.2)" : state === "active" ? "scale(1.35)" : "scale(1)",
                      transition: `opacity 450ms ease ${delay}ms, transform 450ms ease ${delay}ms`,
                    }}
                  />
                );
              })}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Tekst ---------- */

/** Compacte lijst met de vijf verliezen (desktop en statische weergave). */
const LossList = ({ step, live, hidden }: { step: number; live: boolean; hidden?: boolean }) => (
  <ol className="space-y-6" aria-hidden={hidden || undefined}>
    {losses.map((l, i) => {
      const active = !live || step === 0 || step === i + 1;
      return (
        <li key={l.id} className="transition-opacity duration-500" style={{ opacity: active ? 1 : 0.3 }}>
          <p className="flex items-baseline gap-3">
            <span className="stat-number text-2xl leading-none">{l.number}</span>
            <span className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LOSS_COLOR[l.id] }} />
              {l.label}
            </span>
          </p>
          <p className="mt-1.5 text-[15px] text-muted-foreground leading-relaxed">{l.text}</p>
        </li>
      );
    })}
  </ol>
);

/** Het actieve verlies naast het icoon (mobiel, vastgezet). */
const ActiveLoss = ({ step }: { step: number }) => (
  <div className="relative min-h-[8.5rem] flex-1" aria-hidden="true">
    {losses.map((l, i) => {
      const shown = step === i + 1 || (step === 0 && i === 0);
      return (
        <div
          key={l.id}
          className="absolute inset-0"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(6px)",
            transition: shown ? "opacity 300ms ease 200ms, transform 300ms ease 200ms" : "opacity 180ms ease, transform 180ms ease",
          }}
        >
          <p className="flex items-baseline gap-2">
            <span className="stat-number text-xl leading-none">{l.number}</span>
            <span className="text-base font-semibold text-foreground">{l.label}</span>
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{l.text}</p>
        </div>
      );
    })}
    <p
      className="absolute inset-0 flex items-center text-lg font-semibold text-primary"
      style={{ opacity: step > losses.length ? 1 : 0, transition: "opacity 400ms ease 300ms" }}
    >
      {lossCopy.emptyWeek}
    </p>
  </div>
);

/** Agenda en verliezen één keer als tekst voor screenreaders (bij de vastgezette weergave). */
const ScreenReaderText = () => (
  <div className="sr-only">
    <ul>
      {days.map((d) => (
        <li key={d.id}>
          {d.label}: {agenda.filter((a) => a.day === d.id).map((a) => `${a.start} ${a.title}`).join(", ")}
        </li>
      ))}
    </ul>
    <ol>
      {losses.map((l) => (
        <li key={l.id}>
          {l.label}: {l.text}
        </li>
      ))}
    </ol>
    <p>{lossCopy.emptyWeek}</p>
  </div>
);

/* ---------- Component ---------- */

const AgendaScroll = ({ header }: { header: ReactNode }) => {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const isDesktop = useMedia("(min-width: 1024px)");
  const fitsDesktop = useMedia("(min-width: 1024px) and (min-height: 700px)");
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [step, setStep] = useState(0);

  // Inschakelen zodra de sectie nadert én er echt gescrold is, zodat de prerender de tekstversie vastlegt.
  useEffect(() => {
    if (reduced || armed || !rootRef.current) return;
    let near = false;
    let scrolled = false;
    const tryArm = () => near && scrolled && setArmed(true);
    const io = new IntersectionObserver((e) => {
      near = e.some((x) => x.isIntersecting);
      tryArm();
    }, { rootMargin: "0px 0px 150% 0px" });
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

  const live = armed && !reduced && (fitsDesktop || !isDesktop);

  const update = useCallback(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;
    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const distance = track.offsetHeight - sticky.offsetHeight;
    const travelled = stickyTop - track.getBoundingClientRect().top;
    const p = distance > 0 ? Math.min(1, Math.max(0, travelled / distance)) : 0;
    const next = stepFromProgress(p);
    setStep((prev) => (prev === next ? prev : next));
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
  }, [live, update, isDesktop]);

  /* Minder beweging: statisch, voor en na */
  if (reduced) {
    return (
      <div ref={rootRef}>
        {header}
        <figure className="mt-10">
          <figcaption className="sr-only">{lossCopy.figureDescription}</figcaption>
          <div className="hidden lg:block"><WeekGrid step={0} live={false} fit={false} /></div>
          <div className="lg:hidden"><AgendaIcon step={0} live={false} /></div>
        </figure>
        <div className="mt-10 max-w-2xl"><LossList step={0} live={false} /></div>
        <div className="mt-10 flex items-center gap-5">
          <div className="hidden lg:block w-full"><WeekGrid step={TOTAL} live fit={false} /></div>
          <div className="lg:hidden"><AgendaIcon step={TOTAL} live /></div>
          <p className="lg:hidden text-lg font-semibold text-primary">{lossCopy.emptyWeek}</p>
        </div>
      </div>
    );
  }

  /* Statisch (prerender, zonder JavaScript, of desktop te laag voor het vastgezette beeld) */
  if (!live) {
    return (
      <div ref={rootRef}>
        {header}
        <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16 lg:items-start">
          <figure>
            <figcaption className="sr-only">{lossCopy.figureDescription}</figcaption>
            <div className="hidden lg:block"><WeekGrid step={0} live={false} fit={false} /></div>
            <div className="lg:hidden"><AgendaIcon step={0} live={false} /></div>
          </figure>
          <div className="mt-8 lg:mt-0">
            <LossList step={0} live={false} />
            <p className="mt-8 text-xl font-semibold text-primary">{lossCopy.emptyWeek}</p>
          </div>
        </div>
      </div>
    );
  }

  /* Desktop: kop, agenda en lijst samen vast in beeld */
  if (isDesktop) {
    return (
      <div ref={rootRef}>
        <ScreenReaderText />
        <div ref={trackRef} className="relative" style={{ height: `calc(100svh - 6rem + ${DESKTOP_EXTRA_SVH}svh)` }}>
          <div ref={stickyRef} className="sticky top-24 flex h-[calc(100svh-6rem)] flex-col justify-center py-6">
            {header}
            <div className="mt-8 grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-12 xl:gap-16 items-center">
              <figure>
                <figcaption className="sr-only">{lossCopy.figureDescription}</figcaption>
                <WeekGrid step={step} live fit />
              </figure>
              <LossList step={step} live hidden />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Mobiel: kop, icoon en actief verlies samen vast in beeld, midden in het scherm */
  return (
    <div ref={rootRef}>
      <ScreenReaderText />
      <div ref={trackRef} className="relative" style={{ height: `calc(100svh - 6rem + ${MOBILE_EXTRA_SVH}svh)` }}>
        <div ref={stickyRef} className="sticky top-24 flex h-[calc(100svh-6rem)] flex-col justify-center py-4">
          {header}
          <div className="mt-8 flex items-start gap-5">
            <figure>
              <figcaption className="sr-only">{lossCopy.figureDescription}</figcaption>
              <AgendaIcon step={step} live />
            </figure>
            <ActiveLoss step={step} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaScroll;
