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
import kennisbankBasecamp from "@/assets/illustrations/kennisbank-basecamp.png";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

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

  const categoryPostCount = (categoryId: string) =>
    posts?.filter((p) => p.categories?.some((c) => c._id === categoryId)).length || 0;

  const recentPosts = posts?.slice(0, 6) || [];

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
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        {/* Decorative accent circle with illustration */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 md:translate-x-1/6 w-[280px] h-[280px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px]">
          <div className="absolute inset-0 rounded-full bg-accent/25 blur-3xl" />
          <img
            src={kennisbankBasecamp}
            alt=""
            className="absolute inset-0 m-auto h-[60%] w-[60%] object-contain opacity-[0.06] pointer-events-none select-none"
          />
        </div>

        <div className="section-container relative z-10">
          <KennisbankBreadcrumb items={[{ label: "Kennisbank" }]} />

          <motion.div {...fade} transition={{ duration: 0.6 }} className="mt-10 md:mt-14">
            <p className="eyebrow">Kennisbank</p>
          </motion.div>

          <motion.h1
            {...fade}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-bold leading-[1.08] max-w-3xl"
          >
            Inzichten over exit planning{" "}
            <span className="text-muted-foreground">en bedrijfsoverdracht</span>
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            Gestructureerde kennis over waardecreatie, verkoopklaarheid en de voorbereiding op een succesvolle bedrijfsoverdracht.
          </motion.p>
        </div>
      </section>

      {/* ═══════════ QUICKSCAN CALLOUT ═══════════ */}
      <div className="section-container pb-16 md:pb-20">
        <QuickscanSideCallout />
      </div>

      {/* ═══════════ PILLAR NAVIGATION ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <motion.div {...fade} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Thema's</p>
            <h2 className="mt-5 text-2xl md:text-3xl font-bold max-w-lg">
              De zes pijlers van Exit Planning
            </h2>
          </motion.div>

          {catsLoading ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-36 rounded-xl" />
              ))}
            </div>
          ) : categories && categories.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.filter((cat) => cat.slug?.current).map((cat, index) => (
                <motion.div
                  key={cat._id}
                  {...fade}
                  transition={{ duration: 0.45, delay: 0.05 * index }}
                >
                  <Link
                    to={`/kennisbank/thema/${cat.slug!.current}`}
                    className="group flex items-start gap-4 rounded-xl border border-border/10
                      bg-background p-6
                      hover:border-primary/20 hover:bg-card
                      transition-all duration-300 ease-out"
                  >
                    <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-primary/8 text-primary text-xs font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
                        {cat.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-[11px] text-muted-foreground/60">
                          {categoryPostCount(cat._id)} {categoryPostCount(cat._id) === 1 ? "artikel" : "artikelen"}
                        </span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ═══════════ RECENT ARTICLES ═══════════ */}
      <section className="py-16 md:py-24 section-alt-bg">
        <div className="section-container">
          <motion.div {...fade} transition={{ duration: 0.6 }} className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow">Recente publicaties</p>
              <h2 className="mt-5 text-2xl md:text-3xl font-bold">Recente artikelen</h2>
            </div>
          </motion.div>

          {postsLoading ? (
            <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/2] rounded-xl" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post: SanityPost, index: number) => (
                <motion.article
                  key={post._id}
                  {...fade}
                  transition={{ duration: 0.45, delay: 0.05 * index }}
                  className="group"
                >
                  <Link to={`/kennisbank/${post.slug.current}`} className="block">
                    <div className="aspect-[3/2] rounded-xl overflow-hidden bg-muted/50">
                      {post.mainImage ? (
                        <img
                          src={urlFor(post.mainImage).width(600).height(400).url()}
                          alt={post.altText || post.title}
                          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground/30">
                          <BookOpen size={28} />
                        </div>
                      )}
                    </div>

                    {post.categories && post.categories.length > 0 && (
                      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                        {post.categories[0].title}
                      </p>
                    )}

                    <h3 className="mt-2 text-base font-bold leading-snug group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h3>

                    {post.summary && (
                      <p className="mt-2 text-sm text-muted-foreground/70 leading-relaxed line-clamp-2">
                        {post.summary}
                      </p>
                    )}

                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Verder lezen <ArrowRight size={13} />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-muted-foreground">Nog geen artikelen beschikbaar.</p>
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
