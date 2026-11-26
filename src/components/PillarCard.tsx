import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { SanityPostTheme } from "@/types/sanity";

interface PillarCardProps {
  theme?: SanityPostTheme | null;
  /** _id van het artikel waarop de kaart staat; het hoofdartikel zelf toont geen kaart. */
  currentPostId: string;
}

/**
 * Hoofdartikelkaart: verwijst vanuit een kennisbankartikel naar het hoofdartikel van zijn thema.
 * Gestuurd vanuit Sanity (category.pillarPost, pillarPitch, pillarLinkLabel).
 * Opmaak volgt de navigatiekaarten van de template (inhoudsopgave, themakaart bij "Verder lezen"),
 * niet de Verkoopklaarscan-callout: navigatie is een link, de scan is de actie.
 */
const PillarCard = ({ theme, currentPostId }: PillarCardProps) => {
  const pillar = theme?.pillar;
  const pitch = theme?.pillarPitch?.trim();
  const label = theme?.pillarLinkLabel?.trim();

  if (!pillar?.slug || !pitch || !label) return null;
  // Drafts hebben het voorvoegsel "drafts."; vergelijk op het kale _id.
  if (pillar._id.replace(/^drafts\./, "") === currentPostId.replace(/^drafts\./, "")) return null;

  return (
    <aside
      aria-label="Hoofdartikel van dit thema"
      className="group relative mt-8 rounded-2xl border border-border/40 border-l-4 border-l-primary bg-card p-5 md:p-6 break-words transition-all hover:border-primary/30 hover:border-l-primary hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
    >
      {theme?.title && (
        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Onderdeel van het thema {theme.title}
        </p>
      )}
      <p className="text-lg text-foreground leading-relaxed">{pitch}</p>
      <Link
        to={`/kennisbank/${pillar.slug}`}
        data-cta="kennisbank-hoofdartikel"
        className="mt-3 inline-block py-2 font-semibold text-primary underline-offset-4 group-hover:underline after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none"
      >
        {label}
        <ArrowRight className="ml-1.5 inline-block h-4 w-4 -translate-y-px align-middle transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </aside>
  );
};

export default PillarCard;
