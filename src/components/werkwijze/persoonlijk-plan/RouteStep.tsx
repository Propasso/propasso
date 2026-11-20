import type { ReactNode } from "react";

/**
 * Eén stap op de route visie, plan, ritme (blok 4). Links een smalle kolom met een knooppunt (A, B, C)
 * en een doorgaande lijn naar de volgende stap. Op mobiel is die kolom smal (1.75rem), zodat de inhoud
 * bijna de volle breedte houdt.
 */
const RouteStep = ({ letter, label, title, last = false, children }: { letter: string; label: string; title: string; last?: boolean; children: ReactNode }) => (
  <div className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] md:grid-cols-[3rem_minmax(0,1fr)] gap-x-3 md:gap-x-8">
    <div className="relative" aria-hidden="true">
      <span className="relative z-10 flex h-7 w-7 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary text-xs md:text-lg font-semibold text-primary-foreground">
        {letter}
      </span>
      {!last && <span className="absolute left-1/2 top-7 md:top-12 -bottom-2 w-px -translate-x-1/2 bg-primary/30" />}
    </div>
    <div className={last ? "" : "pb-16 md:pb-24"}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground md:pt-1">{label}</p>
      <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-foreground text-balance">{title}</h3>
      {children}
    </div>
  </div>
);

export default RouteStep;
