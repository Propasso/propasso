import karelPortret from "@/assets/images/karel-portret-2026.jpg";

/**
 * Karels eigen woorden over zichzelf. Overal dezelfde vorm: aanhalingstekens, naam eronder, optioneel een kleine
 * ronde foto. Geen gele balk: die is voor stellingen (kernboodschappen van de pagina).
 */
const KarelQuote = ({ text, photo = true, large = false }: { text: string; photo?: boolean; large?: boolean }) => (
  <figure>
    <blockquote className={`${large ? "text-xl md:text-2xl" : "text-lg"} font-medium leading-relaxed text-foreground text-pretty`}>
      “{text}”
    </blockquote>
    <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
      {photo && (
        <img src={karelPortret} alt="" width={40} height={40} loading="lazy" decoding="async" className="h-10 w-10 rounded-full object-cover" />
      )}
      <span className="font-semibold text-foreground">Karel Cremers</span>
    </figcaption>
  </figure>
);

export default KarelQuote;
