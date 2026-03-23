import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PortableText } from "@portabletext/react";
import SEO from "@/components/SEO";

import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import QuickscanCalloutBlock from "@/components/QuickscanCalloutBlock";
import KennisbankBreadcrumb from "@/components/KennisbankBreadcrumb";
import { fetchPostBySlug } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { Skeleton } from "@/components/ui/skeleton";
import type { SanityPost } from "@/types/sanity";

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-muted-foreground">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => (
      <a
        href={value?.href}
        className="text-primary underline hover:no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  },
};

const SanityArticlePage = ({ post }: { post: SanityPost }) => {
  const ctaLabel = post.ctaType === "quickscan" ? "Start de quickscan" : "Neem contact op";
  const parentCategory = post.categories?.[0];

  const breadcrumbItems = [
    { label: "Kennisbank", href: "/kennisbank" },
    ...(parentCategory?.slug
      ? [{ label: parentCategory.title, href: `/kennisbank/thema/${parentCategory.slug.current}` }]
      : []),
    { label: post.title },
  ];

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.summary;
  const ogTitle = post.ogTitle || title;
  const ogDescription = post.ogDescription || description;
  const canonicalUrl = post.canonicalUrl || `https://propasso.nl/kennisbank/${post.slug.current}`;
  const ogImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return (
    <PageLayout>
      <SEO
        title={title}
        description={description}
        canonical={canonicalUrl}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        ogType="article"
        ogImage={ogImageUrl}
        noIndex={post.noIndex}
      />
      {/* Article JSON-LD */}
      {post.body && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.seoTitle || post.title,
              description: post.seoDescription || post.summary,
              datePublished: post.publishedAt,
              publisher: {
                "@type": "Organization",
                name: "Propasso",
              },
              ...(post.mainImage && {
                image: urlFor(post.mainImage).width(1200).height(630).url(),
              }),
            }),
          }}
        />
      )}

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://propasso.nl/" },
              { "@type": "ListItem", position: 2, name: "Kennisbank", item: "https://propasso.nl/kennisbank" },
              ...(parentCategory?.slug
                ? [{
                    "@type": "ListItem",
                    position: 3,
                    name: parentCategory.title,
                    item: `https://propasso.nl/kennisbank/thema/${parentCategory.slug.current}`,
                  }]
                : []),
              {
                "@type": "ListItem",
                position: parentCategory?.slug ? 4 : 3,
                name: post.title,
                item: `https://propasso.nl/kennisbank/${post.slug.current}`,
              },
            ],
          }),
        }}
      />

      <article className="py-16 md:py-24">
        <div className="section-container max-w-3xl">
          <KennisbankBreadcrumb items={breadcrumbItems} />

          {post.categories && post.categories.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.categories.map((c) => (
                <Link
                  key={c._id}
                  to={c.slug ? `/kennisbank/thema/${c.slug.current}` : "/kennisbank"}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-balance">
            {post.title}
          </h1>

          {post.publishedAt && (
            <p className="mt-4 text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString("nl-NL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}

          {post.mainImage && (
            <div className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden bg-secondary">
              <img
                src={urlFor(post.mainImage).width(900).height(506).url()}
                alt={post.altText || post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="mt-8 p-6 rounded-2xl bg-secondary">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Samenvatting
            </h2>
            <p className="text-foreground leading-relaxed">{post.summary}</p>
          </div>

          {post.body && (
            <div className="mt-12 max-w-none">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          )}
        </div>
      </article>

      {/* Verder lezen: related posts + parent pillar */}
      {((post.relatedPosts && post.relatedPosts.length > 0) || parentCategory?.slug) && (
        <section className="py-16 section-alt-bg">
          <div className="section-container">
            <h2 className="text-2xl font-bold mb-8">Verder lezen</h2>

            {/* Parent pillar link */}
            {parentCategory?.slug && (
              <Link
                to={`/kennisbank/thema/${parentCategory.slug.current}`}
                className="group mb-8 block rounded-2xl border border-border/40 bg-card p-6 hover:border-primary/30 hover:shadow-md transition-all max-w-xl"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Thema</p>
                <h3 className="font-bold group-hover:text-primary transition-colors">
                  {parentCategory.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Alle artikelen in dit thema <ArrowRight size={14} />
                </span>
              </Link>
            )}

            {/* Related posts */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {post.relatedPosts.map((related) => (
                  <Link
                    key={related._id}
                    to={`/kennisbank/${related.slug.current}`}
                    className="group flex gap-5 items-start"
                  >
                    <div className="shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-secondary">
                      {related.mainImage ? (
                        <img
                          src={urlFor(related.mainImage).width(96).height(96).url()}
                          alt={related.altText || related.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-sm text-primary font-semibold">
                        Lees meer <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <div className="section-container">
        <QuickscanCalloutBlock contextLine="Wil je weten hoe dit bij jouw bedrijf speelt? Ontdek het in 4 minuten." />
      </div>

      <PageCTA
        title="Wil je weten waar jouw bedrijf staat?"
        primaryLabel={ctaLabel}
        primaryHref="/contact"
      />
    </PageLayout>
  );
};

const KennisbankArticle = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["sanity-post", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="py-16 md:py-24 section-container max-w-3xl space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="aspect-[16/9] rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <section className="py-16 md:py-24">
          <div className="section-container text-center">
            <h1 className="text-4xl font-bold">Artikel niet gevonden</h1>
            <p className="mt-4 text-muted-foreground">Dit artikel bestaat niet of is verplaatst.</p>
            <Link to="/kennisbank" className="mt-8 inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              <ArrowLeft size={16} /> Terug naar kennisbank
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return <SanityArticlePage post={post} />;
};

export default KennisbankArticle;
