import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageCTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const PageCTA = ({
  title = "Klaar voor de volgende stap?",
  description = "Neem vrijblijvend contact op voor een kennismaking en ontdek wat Propasso voor jouw bedrijf kan betekenen.",
  primaryLabel = "Neem contact op",
  primaryHref = "/contact",
  secondaryLabel = "Bekijk onze werkwijze",
  secondaryHref = "/werkwijze",
}: PageCTAProps) => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/15 translate-x-1/3 -translate-y-1/3" />

      <div className="section-container relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight text-primary-foreground text-balance">
          {title}
        </h2>
        <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={primaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground hover:brightness-110 transition"
          >
            {primaryLabel}
            <ChevronRight size={18} />
          </Link>
          <Link
            to={secondaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary-foreground/30 px-7 py-4 text-base font-semibold text-primary-foreground hover:border-primary-foreground/60 transition-colors"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageCTA;
