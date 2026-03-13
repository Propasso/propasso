import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PortableText } from "@portabletext/react";

import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
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

  return (
    <PageLayout>
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
            }),
          }}
        />
      )}

      <article className="py-16 md:py-24">
        <div className="section-container max-w-3xl">
          <Link to="/kennisbank" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={14} /> Terug naar kennisbank
          </Link>

          {post.categories && post.categories.length > 0 && (
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {post.categories.map((c) => c.title).join(" · ")}
            </p>
          )}

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
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

      {/* Related posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-16 section-alt-bg">
          <div className="section-container">
            <h2 className="text-2xl font-bold mb-8">Gerelateerde artikelen</h2>
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
          </div>
        </section>
      )}

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
