import karelPortret from "@/assets/images/karel-portret-2026.jpg";
import { karel, meta } from "./content";
import Placeholder from "./Placeholder";

/**
 * Blok 3: "Ik heb het zelf meegemaakt". Foto en citaat van Karel, wat een koper merkt als de verkoper twijfelt,
 * en de brug naar het plan. Citaat en CRH-ervaring zijn [ERVARING KAREL]; leeg = placeholder in de preview.
 * Volgorde mobiel: kop, foto, tekst. Desktop: foto links over de volle hoogte, kop en tekst rechts.
 */
const KarelMoment = () => (
  <section id="ervaring" className="py-20 md:py-28 bg-background scroll-mt-24">
    <div className="section-container">
      <div className="grid gap-x-14 lg:gap-x-20 gap-y-8 max-w-6xl md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] md:grid-rows-[auto_1fr]">
        <div className="md:col-start-2 md:row-start-1">
          <p className="eyebrow">{karel.eyebrow}</p>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">{karel.title}</h2>
        </div>

        <figure className="max-w-[12rem] md:max-w-none md:col-start-1 md:row-start-1 md:row-span-2">
          <img
            src={karelPortret}
            alt={meta.altKarel}
            width={1240}
            height={1550}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[4/5] object-cover rounded-2xl"
          />
          <figcaption className="mt-4 text-sm text-muted-foreground leading-relaxed">{karel.caption}</figcaption>
        </figure>

        <div className="md:col-start-2 md:row-start-2">
          {karel.quote ? (
            <blockquote className="text-2xl md:text-3xl font-medium leading-snug text-foreground text-balance">
              “{karel.quote}”
            </blockquote>
          ) : (
            <Placeholder>
              [ERVARING KAREL] Citaat over de tijd na Worxx: welk verlies kwam het hardst binnen? Twee tot vier zinnen
              (max 280 tekens).
            </Placeholder>
          )}

          <div className="mt-10 space-y-5 max-w-2xl">
            {karel.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-lg text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
            {karel.crh ? (
              <p className="text-lg text-muted-foreground leading-relaxed">{karel.crh}</p>
            ) : (
              <Placeholder>
                [ERVARING KAREL] Wat je bij CRH zag: een deal die stuitte of veranderde omdat de verkoper twijfelde. Eén of
                twee zinnen, zonder namen.
              </Placeholder>
            )}
          </div>

          <p className="mt-10 border-l-4 border-accent pl-5 text-xl md:text-2xl font-semibold text-primary leading-snug max-w-2xl text-balance">
            {karel.pullQuote}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default KarelMoment;
