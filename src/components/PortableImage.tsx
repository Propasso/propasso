import { urlFor } from "@/lib/sanity";

/**
 * Afbeelding uit de Sanity-body (blocktype "image", met velden alt en caption).
 * Gebruikt in de PortableText-body van KennisbankArticle en KennisbankPillar.
 * Breedte en hoogte komen uit de asset-referentie, zodat de pagina niet verspringt tijdens het laden.
 */

export type PortableImageValue = {
  _key?: string;
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
};

/** "image-<id>-1520x840-png" -> { width: 1520, height: 840 } */
const getDimensions = (ref?: string) => {
  const match = ref?.match(/-(\d+)x(\d+)-[a-z0-9]+$/i);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
};

const PortableImage = ({ value }: { value: PortableImageValue }) => {
  if (!value?.asset?._ref) return null;

  const dims = getDimensions(value.asset._ref);
  const displayWidth = 1200;
  const height = dims ? Math.round((dims.height / dims.width) * displayWidth) : undefined;
  const src = urlFor(value).width(displayWidth).fit("max").auto("format").url();
  const caption = value.caption?.trim();

  return (
    <figure className="my-8">
      <img
        src={src}
        alt={value.alt?.trim() || ""}
        width={displayWidth}
        height={height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-2xl border border-border/40"
      />
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
};

export default PortableImage;
