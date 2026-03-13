import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import { articles as staticArticles } from "@/data/articles";
import { fetchAllArticles, fetchAllPillars } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import type { SanityArticle } from "@/types/sanity";
import { Skeleton } from "@/components/ui/skeleton";

const Kennisbank = () => {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  const { data: sanityArticles, isLoading, isError } = useQuery({
    queryKey: ["sanity-articles"],
    queryFn: fetchAllArticles,
    staleTime: 1000 * 60 * 5,
  });

  const { data: pillars } = useQuery({
    queryKey: ["sanity-pillars"],
    queryFn: fetchAllPillars,
    staleTime: 1000 * 60 * 10,
  });

  const hasSanityContent = !isError && sanityArticles && sanityArticles.length > 0;

  const filteredArticles = useMemo(() => {
    if (!sanityArticles) return [];
    if (!activePillar) return sanityArticles;
    return sanityArticles.filter((a) => a.pillar?._id === activePillar);
  }, [sanityArticles, activePillar]);

  return (
    <PageLayout>
      <section className="py-16 md:py-24">
        <div className="section-container">
          <p className="eyebrow">Kennisbank</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-balance">
            Inzichten over exit planning en bedrijfsoverdracht
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Praktische artikelen over waardecreatie, verkoopklaarheid en de voorbereiding op een succesvolle bedrijfsoverdracht.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-container">
          {/* Pillar filter buttons */}
          {hasSanityContent && pillars && pillars.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              <button
                onClick={() => setActivePillar(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activePillar === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                Alle artikelen
              </button>
              {pillars.map((pillar) => (
                <button
                  key={pillar._id}
                  onClick={() =>
                    setActivePillar(activePillar === pillar._id ? null : pillar._id)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activePillar === pillar._id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {pillar.title}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/2] rounded-2xl" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : hasSanityContent ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar || "all"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid gap-8 md:grid-cols-3"
              >
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article: SanityArticle) => (
                    <article key={article._id} className="group">
                      <Link to={`/kennisbank/${article.slug.current}`} className="block">
                        <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-secondary mb-5">
                          {article.featuredImage ? (
                            <img
                              src={urlFor(article.featuredImage).width(600).height(400).url()}
                              alt={article.featuredImageAlt || article.title}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                              Geen afbeelding
                            </div>
                          )}
                        </div>
                        {article.pillar && (
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            {article.pillar.title}
                          </p>
                        )}
                        <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {article.summary}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                          Verder lezen <ArrowRight size={14} />
                        </span>
                      </Link>
                    </article>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">
                      Geen artikelen gevonden in deze categorie.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* Fallback to static articles */
            <div className="grid gap-8 md:grid-cols-3">
              {staticArticles.map((article) => (
                <article key={article.slug} className="group">
                  <Link to={`/kennisbank/${article.slug}`} className="block">
                    <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-secondary mb-5">
                      <img
                        src={article.image}
                        alt={article.imageAlt}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      {article.entity}
                    </p>
                    <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {article.summary}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      Verder lezen <ArrowRight size={14} />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <PageCTA
        title="Wil je weten waar jouw bedrijf staat?"
        primaryLabel="Neem contact op"
        primaryHref="/contact"
      />
    </PageLayout>
  );
};

export default Kennisbank;
