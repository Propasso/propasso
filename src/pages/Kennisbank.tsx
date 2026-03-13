import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import KennisbankBreadcrumb from "@/components/KennisbankBreadcrumb";
import { fetchAllPosts, fetchAllCategories } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import type { SanityPost } from "@/types/sanity";
import { Skeleton } from "@/components/ui/skeleton";

const Kennisbank = () => {
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["sanity-posts"],
    queryFn: fetchAllPosts,
    staleTime: 1000 * 60 * 5,
  });

  const { data: categories, isLoading: catsLoading } = useQuery({
    queryKey: ["sanity-categories"],
    queryFn: fetchAllCategories,
    staleTime: 1000 * 60 * 10,
  });

  // Count posts per category
  const categoryPostCount = (categoryId: string) =>
    posts?.filter((p) => p.categories?.some((c) => c._id === categoryId)).length || 0;

  const recentPosts = posts?.slice(0, 6) || [];

  return (
    <PageLayout>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Kennisbank — Propasso",
            description: "Praktische artikelen over exit planning en bedrijfsoverdracht voor MKB-ondernemers.",
            url: "https://propasso.nl/kennisbank",
          }),
        }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <KennisbankBreadcrumb items={[{ label: "Kennisbank" }]} />

          <p className="eyebrow mt-8">Kennisbank</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-balance">
            Inzichten over exit planning en bedrijfsoverdracht
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Praktische artikelen over waardecreatie, verkoopklaarheid en de voorbereiding op een succesvolle bedrijfsoverdracht — gestructureerd rondom de zes pijlers van Exit Planning.
          </p>
        </div>
      </section>

      {/* Pillar cards */}
      <section className="pb-16">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8">De zes pijlers van Exit Planning</h2>

          {catsLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-40 rounded-2xl" />
              ))}
            </div>
          ) : categories && categories.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {categories.map((cat, index) => (
                <Link
                  key={cat._id}
                  to={`/kennisbank/${cat.slug.current}`}
                  className="group relative rounded-2xl border border-border/40 bg-card p-7 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <span className="absolute top-5 right-5 text-xs font-semibold text-muted-foreground bg-secondary rounded-full px-2.5 py-1">
                    {categoryPostCount(cat._id)} {categoryPostCount(cat._id) === 1 ? "artikel" : "artikelen"}
                  </span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                    {index + 1}
                  </span>
                  <h3 className="font-bold leading-snug group-hover:text-primary transition-colors pr-16">
                    {cat.title}
                  </h3>
                  {cat.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Bekijk thema <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </motion.div>
          ) : null}
        </div>
      </section>

      {/* Recent articles */}
      <section className="py-16 section-alt-bg">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8">Recente artikelen</h2>

          {postsLoading ? (
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
          ) : recentPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post: SanityPost) => (
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
                    <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {post.summary}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      Verder lezen <ArrowRight size={14} />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Nog geen artikelen beschikbaar.</p>
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
