import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { fetchHomepageThemes } from "@/lib/sanityQueries";
import { countWord } from "@/lib/countWord";
import { Skeleton } from "@/components/ui/skeleton";

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const ThemesSection = () => {
  const reduceMotion = useReducedMotion();
  const { data: themes, isLoading, isError } = useQuery({
    queryKey: ["sanity-home-themes"],
    queryFn: fetchHomepageThemes,
  });

  if (isError || (!isLoading && (!themes || themes.length === 0))) return null;

  const count = themes?.length ?? 7;
  const motionProps = reduceMotion ? {} : fadeIn;

  return (
    <motion.section aria-labelledby="themas-heading" className="py-20 md:py-28 relative" {...motionProps}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1200px,200vw)] h-[800px] rounded-full opacity-[0.025]"
          style={{ background: "radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)" }}
        />
      </div>

      <div className="section-container relative z-10 lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Exit Planning</p>
          <h2 id="themas-heading" className="mt-5 text-3xl md:text-4xl font-bold leading-tight text-balance">
            De {countWord(count)} thema&apos;s van verkoopklaar maken
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">[introtekst volgt van Karel]</p>
          <Link
            to="/kennisbank"
            data-cta="home-kennisbank"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary rounded-md hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Alle artikelen in de kennisbank
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <ol className="mt-10 lg:mt-0 lg:col-span-7">
          {isLoading
            ? Array.from({ length: 7 }).map((_, i) => (
                <li key={i} className="border-b border-border/40 py-5 min-h-[56px]">
                  <Skeleton className="h-[52px] w-full rounded-xl" />
                </li>
              ))
            : themes!.map((theme, i) => (
                <li key={theme._id} className="border-b border-border/40">
                  <Link
                    to={`/kennisbank/thema/${theme.slug}`}
                    data-cta="home-thema"
                    data-thema={theme.slug}
                    className="group relative flex items-start gap-4 min-h-[56px] py-5 px-3 rounded-xl transition-colors duration-300 hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-3 bottom-3 w-[2px] bg-primary origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                    />
                    <span className="w-6 flex-shrink-0 tabular-nums text-sm font-semibold text-primary/60 pt-0.5 transition-colors group-hover:text-primary group-focus-visible:text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary group-focus-visible:text-primary">
                        {theme.title}
                      </h3>
                      {theme.description && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{theme.description}</p>
                      )}
                      {theme.articleCount > 0 && (
                        <span className="mt-1.5 block text-xs text-muted-foreground">
                          {theme.articleCount === 1 ? "1 artikel" : `${theme.articleCount} artikelen`}
                        </span>
                      )}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="w-4 h-4 mt-1 flex-shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
        </ol>
      </div>
    </motion.section>
  );
};

export default ThemesSection;
