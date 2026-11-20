import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageCTA from "@/components/PageCTA";
import { closing } from "./content";

/** Blok 6: slot. Twee links naar de kennisbank, daarna de navy CTA met de enige lime knop van de pagina. */
const ClosingSection = () => (
  <div id="slot">
    <section className="py-14 md:py-16 bg-background">
      <div className="section-container">
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">{closing.readMoreTitle}</h2>
        <ul className="mt-4 flex flex-col gap-3 md:flex-row md:gap-10">
          {closing.readMore.map((l) => (
            <li key={l.href}>
              <Link to={l.href} className="group inline-flex items-center gap-2 text-lg font-medium text-primary hover:underline underline-offset-4">
                {l.label}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <PageCTA
      title={closing.title}
      description={closing.text}
      primaryLabel={closing.primaryLabel}
      primaryHref="/contact"
      secondaryLabel={closing.secondaryLabel}
      secondaryHref="/quickscan"
    />
  </div>
);

export default ClosingSection;
