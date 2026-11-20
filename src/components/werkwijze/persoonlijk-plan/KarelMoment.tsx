import karelPortret from "@/assets/images/karel-portret-2026.jpg";
import { loss, meta } from "./content";

/**
 * Karel na de lege week: foto, citaat en onderschrift (sectie 3).
 * Het citaat is [ERVARING KAREL]. Zolang het leeg is, toont dit blok een zichtbare placeholder;
 * vóór livegang moet het gevuld zijn (voortgangsdocument). Later kan hier een video bij.
 */
const KarelMoment = () => {
  const { quote, caption } = loss.karel;
  return (
    <figure className="mt-20 lg:mt-28 grid gap-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-12 items-center max-w-5xl">
      <img
        src={karelPortret}
        alt={meta.altKarel}
        width={1240}
        height={1550}
        loading="lazy"
        decoding="async"
        className="w-40 md:w-full aspect-[4/5] object-cover rounded-2xl"
      />
      <div>
        {quote ? (
          <blockquote className="text-2xl md:text-3xl font-medium leading-snug text-foreground text-balance">
            “{quote}”
          </blockquote>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-primary/30 px-5 py-6 text-sm text-muted-foreground">
            [ERVARING KAREL] Citaat van Karel, twee tot vier zinnen (max 280 tekens). Wordt ingevuld vóór livegang.
          </div>
        )}
        <figcaption className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-lg">{caption}</figcaption>
      </div>
    </figure>
  );
};

export default KarelMoment;
