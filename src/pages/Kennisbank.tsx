import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import { fetchAllPosts } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import type { SanityPost } from "@/types/sanity";
import { Skeleton } from "@/components/ui/skeleton";

const Kennisbank = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["sanity-posts"],
    queryFn: fetchAllPosts,
    staleTime: 1000 * 60 * 5,
  });

  // Extract unique categories from posts
  const categories = useMemo(() => {
    if (!posts) return [];
    const catMap = new Map<string, { _id: string; title: string }>();
    for (const post of posts) {
      if (post.categories) {
        for (const cat of post.categories) {
          catMap.set(cat._id, { _id: cat._id, title: cat.title });
        }
      }
    }
    return Array.from(catMap.values()).sort((a, b) => a.title.localeCompare(b.title));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!activeCategory) return posts;
    return posts.filter((p) => p.categories?.some((c) => c._id === activeCategory));
  }, [posts, activeCategory]);

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
          {/* Category filter buttons */}
          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                Alle artikelen
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() =>
                    setActiveCategory(activeCategory === cat._id ? null : cat._id)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat._id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.title}
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
          ) : posts && posts.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory || "all"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid gap-8 md:grid-cols-3"
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post: SanityPost) => (
                    <article key={post._id} className="group">
                      <Link to={`/kennisbank/${post.slug.current}`} className="block">
                        <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-secondary mb-5">
                          {post.mainImage ? (
                            <img
                              src={urlFor(post.mainImage).width(600).height(400).url()}
                              alt={post.altText || post.title}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                              Geen afbeelding
                            </div>
                          )}
                        </div>
                        {post.categories && post.categories.length > 0 && (
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            {post.categories[0].title}
                          </p>
                        )}
                        <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {post.summary}
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
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                Nog geen artikelen beschikbaar.
              </p>
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
