import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import QuickscanCalloutBlock from "@/components/QuickscanCalloutBlock";
import KennisbankBreadcrumb from "@/components/KennisbankBreadcrumb";
import { canonicalizeCategorySlug, fetchCategoryBySlug, fetchPostsByCategory, fetchAllCategories } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { Skeleton } from "@/components/ui/skeleton";
import type { SanityPost } from "@/types/sanity";
import { pillarContent } from "@/data/pillarContent";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const KennisbankPillar = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!categorySlug) return;

    const canonicalSlug = canonicalizeCategorySlug(categorySlug);
    if (canonicalSlug !== categorySlug) {
      navigate(`/kennisbank/thema/${canonicalSlug}`, { replace: true });
    }
  }, [categorySlug, navigate]);

  const content = categorySlug ? pillarContent[canonicalizeCategorySlug(categorySlug)] : undefined;

  const { data: category, isLoading: catLoading } = useQuery({
    queryKey: ["sanity-category", categorySlug],
    queryFn: () => fetchCategoryBySlug(categorySlug!),
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 10,
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["sanity-posts-by-category", category?._id],
    queryFn: () => fetchPostsByCategory(category!._id),
    enabled: !!category?._id,
    staleTime: 1000 * 60 * 5,
  });

  const { data: allCategories } = useQuery({
    queryKey: ["sanity-categories"],
    queryFn: fetchAllCategories,
    staleTime: 1000 * 60 * 10,
  });

  const relatedPillars = allCategories?.filter((c) => c._id !== category?._id && c.slug?.current);
  const isLoading = catLoading || postsLoading;

  if (!catLoading && !category) {
    return (
      <PageLayout>
        <section className="py-16 md:py-24">
          <div className="section-container text-center">
            <h1 className="text-4xl font-bold">Thema niet gevonden</h1>
            <p className="mt-4 text-muted-foreground">Deze categorie bestaat niet of is verplaatst.</p>
            <Link to="/kennisbank" className="mt-8 inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Terug naar kennisbank
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const pillarCanonical = category
    ? `https://propasso.nl/kennisbank/thema/${category.slug.current}`
    : undefined;

  return (
    <PageLayout>
      {/* SEO head */}
      {category && (
        <Helmet>
          <title>{category.title} | Kennisbank | Propasso</title>
          {category.description && <meta name="description" content={category.description} />}
          {pillarCanonical && <link rel="canonical" href={pillarCanonical} />}
          <meta property="og:title" content={`${category.title} | Propasso`} />
          {category.description && <meta property="og:description" content={category.description} />}
          {pillarCanonical && <meta property="og:url" content={pillarCanonical} />}
          <meta property="og:type" content="website" />
        </Helmet>
      )}

      {/* JSON-LD */}
      {category && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: category.title,
              description: category.description || `Artikelen over ${category.title}`,
              url: `https://propasso.nl/kennisbank/thema/${category.slug.current}`,
              isPartOf: { "@type": "WebPage", name: "Kennisbank", url: "https://propasso.nl/kennisbank" },
            }),
          }}
        />
      )}
      {category && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://propasso.nl/" },
                { "@type": "ListItem", position: 2, name: "Kennisbank", item: "https://propasso.nl/kennisbank" },
                { "@type": "ListItem", position: 3, name: category.title, item: `https://propasso.nl/kennisbank/thema/${category.slug.current}` },
              ],
            }),
          }}
        />
      )}

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        {/* Decorative background accent */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>

        <div className="section-container">
          {category && (
            <KennisbankBreadcrumb
              items={[
                { label: "Kennisbank", href: "/kennisbank" },
                { label: category.title },
              ]}
            />
          )}

          {isLoading ? (
            <div className="mt-8 space-y-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-14 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
            </div>
          ) : (
            <div className="mt-8 max-w-4xl">
              <p className="eyebrow">Exit Planning Thema</p>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.15] text-balance">
                {category?.title}
              </h1>

              {/* Intro card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-8 rounded-2xl tint-teal-bg p-8 md:p-10 border border-border/20"
              >
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  {content?.heroIntro ||
                    category?.description ||
                    "Ontdek de belangrijkste inzichten en strategieën rondom dit thema. Elk artikel helpt je stap voor stap bij de voorbereiding op een succesvolle bedrijfsoverdracht."}
                </p>
              </motion.div>

              {/* Article count badge */}
              {posts && posts.length > 0 && (
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen size={16} />
                  <span>{posts.length} artikel{posts.length !== 1 ? "en" : ""} in dit thema</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ ARTICLES ═══════════ */}
      <section className="py-14 md:py-20">
        <div className="section-container">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Artikelen</h2>
            <Link
              to="/kennisbank"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
            >
              Alle artikelen <ArrowRight size={14} />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/2] rounded-2xl" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: SanityPost, index: number) => (
                <motion.article
                  key={post._id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={cardVariants}
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
          ) : (
            <div className="text-center py-16 rounded-2xl border border-dashed border-border/40">
              <BookOpen size={40} className="mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">Binnenkort verschijnen hier artikelen over dit thema.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quickscan callout — after articles, before extended intro */}
      <div className="py-12 md:py-16">
        <div className="section-container">
          <QuickscanSideCallout />
        </div>
      </div>

      {/* ═══════════ EXTENDED INTRO (SEO) ═══════════ */}
      {content?.bodyParagraphs && content.bodyParagraphs.length > 0 && (
        <section className="py-16 md:py-20 section-alt-bg">
          <div className="section-container">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4">Verdieping</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Meer over {category?.title?.toLowerCase()}
              </h2>
              <div className="space-y-6">
                {content.bodyParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ RELATED PILLARS ═══════════ */}
      {relatedPillars && relatedPillars.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="section-container">
            <p className="eyebrow mb-4">Ontdek meer</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-10">Andere thema's</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPillars.map((pillar, index) => (
                <motion.div
                  key={pillar._id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={cardVariants}
                >
                  <Link
                    to={`/kennisbank/thema/${pillar.slug.current}`}
                    className="group flex flex-col h-full rounded-2xl border border-border/40 bg-card p-7 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    {pillar.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                        {pillar.description}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                      Bekijk thema <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      <PageCTA
        title="Wil je weten waar jouw bedrijf staat?"
        primaryLabel="Neem contact op"
        primaryHref="/contact"
      />
    </PageLayout>
  );
};

export default KennisbankPillar;
