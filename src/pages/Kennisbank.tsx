import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import KennisbankBreadcrumb from "@/components/KennisbankBreadcrumb";
import QuickscanSideCallout from "@/components/QuickscanSideCallout";
import { fetchAllPosts, fetchAllCategories } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import type { SanityPost } from "@/types/sanity";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import kennisbankBasecamp from "@/assets/illustrations/kennisbank-basecamp.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const POSTS_PER_PAGE = 6;

const Kennisbank = () => {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

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

  const categoryPostCount = (categoryId: string) =>
    posts?.filter((p) => p.categories?.some((c) => c._id === categoryId)).length || 0;

  const visiblePosts = posts?.slice(0, visibleCount) || [];
  const totalPosts = posts?.length || 0;
  const hasMore = visibleCount < totalPosts;

  return (
    <PageLayout>
      <Helmet>
        <title>Kennisbank — Exit Planning voor MKB-ondernemers | Propasso</title>
        <meta name="description" content="Praktische artikelen over exit planning en bedrijfsoverdracht voor MKB-ondernemers. Ontdek de zes pijlers van waardecreatie en verkoopklaarheid." />
        <link rel="canonical" href="https://propasso.nl/kennisbank" />
        <meta property="og:title" content="Kennisbank — Propasso" />
        <meta property="og:description" content="Praktische artikelen over exit planning en bedrijfsoverdracht voor MKB-ondernemers." />
        <meta property="og:url" content="https://propasso.nl/kennisbank" />
        <meta property="og:type" content="website" />
      </Helmet>
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

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        {/* Faded accent circle with illustration */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 md:translate-x-1/6 w-[320px] h-[320px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px]">
          <div className="absolute inset-0 rounded-full bg-accent/30 blur-3xl" />
          <img
            src={kennisbankBasecamp}
            alt=""
            className="absolute inset-0 m-auto h-[65%] w-[65%] object-contain opacity-[0.06] pointer-events-none select-none"
          />
        </div>

        <div className="section-container relative z-10 py-16 md:py-24">
          <KennisbankBreadcrumb items={[{ label: "Kennisbank" }]} />

          <motion.div {...fadeInUp} transition={{ duration: 0.6 }} className="mt-8">
            <p className="eyebrow">Kennisbank</p>
          </motion.div>
          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] max-w-3xl text-balance"
          >
            Inzichten over exit planning{" "}
            <span className="text-muted-foreground">en bedrijfsoverdracht</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Praktische artikelen over waardecreatie, verkoopklaarheid en de voorbereiding op een succesvolle bedrijfsoverdracht, gestructureerd rondom de zes pijlers van Exit Planning.
          </motion.p>

          <div className="mt-10">
            <QuickscanSideCallout />
          </div>
        </div>
      </section>

      {/* ═══════════ PILLAR CARDS ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Thema's</p>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold">De zes pijlers van Exit Planning</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
              Elk thema vertegenwoordigt een strategisch onderdeel van het Exit Planning-traject.
            </p>
          </motion.div>

          {catsLoading ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : categories && categories.length > 0 ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.filter((cat) => cat.slug?.current).map((cat, index) => (
                <motion.div
                  key={cat._id}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: 0.06 * index }}
                >
                  <Link
                    to={`/kennisbank/thema/${cat.slug!.current}`}
                    className="group relative flex flex-col h-full rounded-2xl border border-border/30 bg-card p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground bg-secondary rounded-full px-3 py-1">
                        {categoryPostCount(cat._id)} {categoryPostCount(cat._id) === 1 ? "artikel" : "artikelen"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors duration-300">
                      {cat.title}
                    </h3>
                    {cat.description && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2 flex-1">
                        {cat.description}
                      </p>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                      Bekijk thema <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ═══════════ RECENT ARTICLES ═══════════ */}
      <section className="py-20 md:py-28 section-alt-bg">
        <div className="section-container">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Recente publicaties</p>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold">Recente artikelen</h2>
          </motion.div>

          {postsLoading ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/2] rounded-2xl" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : visiblePosts.length > 0 ? (
            <>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post: SanityPost, index: number) => (
                  <motion.article
                    key={post._id}
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: 0.06 * (index % POSTS_PER_PAGE) }}
                    className="group"
                  >
                    <Link to={`/kennisbank/${post.slug.current}`} className="block">
                      <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-secondary mb-5 ring-1 ring-border/10">
                        {post.mainImage ? (
                          <img
                            src={urlFor(post.mainImage).width(600).height(400).url()}
                            alt={post.altText || post.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                            <BookOpen size={32} className="opacity-30" />
                          </div>
                        )}
                      </div>
                      {post.categories && post.categories.length > 0 && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          {post.categories[0].title}
                        </p>
                      )}
                      <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {post.summary}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                        Verder lezen <ArrowRight size={14} />
                      </span>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                  >
                    Meer artikelen laden ({visibleCount} van {totalPosts})
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="mt-12 text-muted-foreground">Nog geen artikelen beschikbaar.</p>
          )
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
