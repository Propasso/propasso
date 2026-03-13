import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import KennisbankBreadcrumb from "@/components/KennisbankBreadcrumb";
import { fetchCategoryBySlug, fetchPostsByCategory, fetchAllCategories } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { Skeleton } from "@/components/ui/skeleton";
import type { SanityPost } from "@/types/sanity";

const KennisbankPillar = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

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

  const relatedPillars = allCategories?.filter((c) => c._id !== category?._id);
  const isLoading = catLoading || postsLoading;

  if (!catLoading && !category) {
    return (
      <PageLayout>
        <section className="py-16 md:py-24">
          <div className="section-container text-center">
            <h1 className="text-4xl font-bold">Pillar niet gevonden</h1>
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
      {category && (
        <Helmet>
          <title>{category.title} | Kennisbank | Propasso</title>
          {category.description && (
            <meta name="description" content={category.description} />
          )}
          {pillarCanonical && <link rel="canonical" href={pillarCanonical} />}
          <meta property="og:title" content={`${category.title} | Propasso`} />
          {category.description && (
            <meta property="og:description" content={category.description} />
          )}
          {pillarCanonical && <meta property="og:url" content={pillarCanonical} />}
          <meta property="og:type" content="website" />
        </Helmet>
      )}
      {/* JSON-LD CollectionPage */}
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
              isPartOf: {
                "@type": "WebPage",
                name: "Kennisbank",
                url: "https://propasso.nl/kennisbank",
              },
            }),
          }}
        />
      )}

      {/* BreadcrumbList JSON-LD */}
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

      {/* Hero */}
      <section className="py-16 md:py-24">
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
            <>
              <p className="eyebrow mt-8">Exit Planning Pillar</p>
              <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-balance">
                {category?.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {category?.description ||
                  "Ontdek de belangrijkste inzichten en strategieën rondom dit thema. Elk artikel helpt je stap voor stap bij de voorbereiding op een succesvolle bedrijfsoverdracht."}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Pillar introduction */}
      <section className="pb-8">
        <div className="section-container">
          <div className="max-w-3xl rounded-2xl tint-teal-bg p-8 md:p-10">
            <h2 className="text-xl font-bold mb-3">Over dit thema</h2>
            <p className="text-muted-foreground leading-relaxed">
              {category?.description ||
                "Dit is een van de zes strategische pijlers van Exit Planning. Hieronder vind je alle artikelen die je helpen dit onderwerp te doorgronden en toe te passen in jouw situatie."}
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-10">
            Artikelen{posts && posts.length > 0 ? ` (${posts.length})` : ""}
          </h2>

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/2] rounded-2xl" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post: SanityPost) => (
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
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nog geen artikelen beschikbaar voor dit thema.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related pillars */}
      {relatedPillars && relatedPillars.length > 0 && (
        <section className="py-16 section-alt-bg">
          <div className="section-container">
            <h2 className="text-2xl font-bold mb-8">Andere thema's</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPillars.map((pillar) => (
                <Link
                  key={pillar._id}
                  to={`/kennisbank/thema/${pillar.slug.current}`}
                  className="group rounded-2xl border border-border/40 bg-card p-6 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <h3 className="font-bold group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  {pillar.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {pillar.description}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Bekijk thema <ArrowRight size={14} />
                  </span>
                </Link>
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
