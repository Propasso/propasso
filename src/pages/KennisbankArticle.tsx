import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PortableText } from "@portabletext/react";
import SEO from "@/components/SEO";
import { safeJsonLd } from "@/lib/safeJsonLd";

import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import KennisbankBreadcrumb from "@/components/KennisbankBreadcrumb";
import { fetchPostBySlug } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "@/pages/NotFound";
import type { SanityPost } from "@/types/sanity";

type BodyBlock = { _key?: string; _type?: string; style?: string; children?: Array<{ text?: string }> };

const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "sectie";

/** H2-koppen uit de body met unieke ankers (dubbele koppen krijgen een volgnummer). */
const getH2Headings = (body: unknown): Array<{ key: string; text: string; id: string }> => {
  if (!Array.isArray(body)) return [];
  const used = new Map<string, number>();
  return (body as BodyBlock[])
    .filter((b) => b?._type === "block" && b?.style === "h2")
    .map((b, i) => {
      const text = (b.children ?? []).map((c) => c?.text ?? "").join("").trim();
      const base = slugifyHeading(text);
      const n = (used.get(base) ?? 0) + 1;
      used.set(base, n);
      return { key: b._key ?? `h2-${i}`, text, id: n > 1 ? `${base}-${n}` : base };
    })
    .filter((h) => h.text);
};

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-14 mb-4 scroll-mt-28 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 scroll-mt-28 text-xl font-medium">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 text-[17px] md:text-lg leading-[1.75] text-foreground/85">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-foreground/85">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-5 list-disc pl-6 space-y-2 text-[17px] md:text-lg leading-[1.75] text-foreground/85">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-5 list-decimal pl-6 space-y-2 text-[17px] md:text-lg leading-[1.75] text-foreground/85">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href;
      if (!href) return <>{children}</>;
      const linkClasses =
        "text-primary underline hover:no-underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
      if (href.startsWith("#")) {
        return <a href={href} className={linkClasses}>{children}</a>;
      }
      const isInternal = href.startsWith("/") || /^https?:\/\/(www\.)?propasso\.nl/.test(href);
      if (isInternal) {
        const internalPath = href.startsWith("http")
          ? href.replace(/^https?:\/\/(www\.)?propasso\.nl/, "") || "/"
          : href;
        return (
          <Link to={internalPath} className={linkClasses}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  },
};

const bioComponents = {
  ...portableTextComponents,
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-[15px] md:text-base leading-[1.7] text-foreground/80">{children}</p>
    ),
  },
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const countBodyWords = (body?: any[]): number => {
  if (!body?.length) return 0;
  return body.reduce((total, block) => {
    if (block?._type !== "block") return total;
    const text = Array.isArray(block.children)
      ? block.children.map((child: { text?: string }) => child?.text ?? "").join(" ")
      : "";
    return total + (text.match(/\S+/g)?.length ?? 0);
  }, 0);
};

const getReadingTime = (body?: any[]): number | null => {
  const words = countBodyWords(body);
  if (words === 0) return null;
  return Math.max(1, Math.ceil(words / 220));
};

/** Vragen die in het FAQ-blok verschijnen: alleen bij antwoordpagina's met gevulde vraag én antwoord. */
const getFaqItems = (post: SanityPost) =>
  post.articleType !== "antwoord"
    ? []
    : (post.faq ?? []).filter((item) => item?.question?.trim() && item?.answer?.trim());



const SanityArticlePage = ({ post }: { post: SanityPost }) => {
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
  const updatedDate =
    post.lastUpdated &&
    (!post.publishedAt ||
      new Date(post.lastUpdated).toDateString() !== new Date(post.publishedAt).toDateString())
      ? post.lastUpdated
      : undefined;
  const readingMinutes = getReadingTime(post.body);
  const authorFirstName = post.author?.name?.trim().split(/\s+/)[0] ?? "";
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
            __html: safeJsonLd({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.seoTitle || post.title,
              description: post.seoDescription || post.summary,
              datePublished: post.publishedAt,
              dateModified: post.lastUpdated || post.publishedAt,
              mainEntityOfPage: canonicalUrl,
              ...(post.author?.name && {
                author: {
                  "@type": "Person",
                  "@id": "https://propasso.nl/#person-karel-cremers",
                  name: post.author.name,
                  url: "https://propasso.nl/over-propasso",
                  ...(post.author.role && { jobTitle: post.author.role }),
                  ...(post.author.linkedinUrl && { sameAs: [post.author.linkedinUrl] }),
                  ...(post.author.image && {
                    image: urlFor(post.author.image).width(400).height(400).url(),
                  }),
                },
              }),
              publisher: {
                "@type": "Organization",
                "@id": "https://propasso.nl/#organization",
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
          __html: safeJsonLd({
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

      <article className="py-16 md:py-24 overflow-x-clip [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-primary [&_a:focus-visible]:rounded-sm [&_button:focus-visible]:outline [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-primary">
        <div className="section-container max-w-3xl">
          <KennisbankBreadcrumb items={breadcrumbItems} />

          {post.categories && post.categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-4">
              {post.categories.map((c) => (
                <Link
                  key={c._id}
                  to={c.slug ? `/kennisbank/thema/${c.slug.current}` : "/kennisbank"}
                  className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-balance">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {post.author?.name && (
              <>
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.imageAlt || post.author.name}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                    loading="lazy"
                    width={40}
                    height={40}
                  />
                )}
                <div className="min-w-0">
                  <Link
                    to="/over-propasso"
                    className="inline-block py-2 font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {post.author.name}
                  </Link>
                  {post.author.role && (
                    <p className="text-sm text-muted-foreground leading-snug">{post.author.role}</p>
                  )}
                </div>
              </>
            )}
            {post.publishedAt && (
              <>
                {post.author?.name && <span aria-hidden="true">·</span>}
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </>
            )}
            {updatedDate && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Bijgewerkt op <time dateTime={updatedDate}>{formatDate(updatedDate)}</time>
                </span>
              </>
            )}
            {readingMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{readingMinutes} min. leestijd</span>
              </>
            )}
          </div>

          {(() => {
            const answer = post.directAnswer?.trim();
            const text = answer || post.summary?.trim();
            if (!text) return null;
            return (
              <div className="mt-8 rounded-r-2xl border-l-4 border-accent bg-secondary p-5 md:p-6 break-words">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {answer ? "In het kort" : "Samenvatting"}
                </p>
                <p className="text-lg text-foreground leading-relaxed">{text}</p>
              </div>
            );
          })()}

          {(() => {
            const headings = getH2Headings(post.body);
            const showFaq = getFaqItems(post).length > 0;
            if (post.articleType !== "antwoord" || headings.length < 4) return null;
            return (
              <nav aria-labelledby="toc-title" className="mt-8 max-w-[68ch] rounded-2xl border border-border/40 bg-card p-5 md:p-6 break-words">
                <p id="toc-title" className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  In dit artikel
                </p>
                <ol className="space-y-2 list-decimal pl-5 marker:text-muted-foreground">
                  {headings.map((h) => (
                    <li key={h.key}>
                      <a
                        href={`#${h.id}`}
                        className="inline-block py-1.5 text-foreground/85 underline-offset-4 hover:underline hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                  {showFaq && (
                    <li>
                      <a
                        href="#veelgestelde-vragen"
                        className="inline-block py-1.5 text-foreground/85 underline-offset-4 hover:underline hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        Veelgestelde vragen
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
            );
          })()}

          {post.mainImage && (
            <div className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden bg-secondary">
              <img
                src={urlFor(post.mainImage).width(900).height(506).url()}
                alt={post.altText || post.title}
                className="h-full w-full object-cover"
                {...{ fetchpriority: "high" }}
              />
            </div>
          )}

          {post.body && (() => {
            const body = post.body as Array<{ _type?: string; style?: string }>;
            const ids = Object.fromEntries(getH2Headings(post.body).map((h) => [h.key, h.id]));
            const bodyComponents = {
              ...portableTextComponents,
              block: {
                ...portableTextComponents.block,
                h2: ({ children, value }: { children?: React.ReactNode; value?: { _key?: string } }) => (
                  <h2
                    id={value?._key ? ids[value._key] : undefined}
                    className="mt-14 mb-4 scroll-mt-28 text-2xl font-bold"
                  >
                    {children}
                  </h2>
                ),
              },
            };
            const h2Indexes = body
              .map((b, i) => (b?._type === "block" && b?.style === "h2" ? i : -1))
              .filter((i) => i >= 0);
            if (h2Indexes.length < 2) {
              return (
                <div className="mt-12 max-w-[68ch]">
                  <PortableText value={post.body} components={bodyComponents} />
                </div>
              );
            }
            const split = h2Indexes[1];
            return (
              <div className="mt-12 max-w-[68ch]">
                <PortableText value={post.body.slice(0, split)} components={bodyComponents} />
                <aside className="my-10 rounded-r-2xl border-l-4 border-accent bg-secondary p-5 md:p-6 break-words">
                  <p className="font-bold text-foreground">Hoe staat jouw bedrijf hier vandaag voor?</p>
                  <p className="mt-1 text-foreground/85">De quickscan geeft je in vier minuten een eerste beeld.</p>
                  <Link
                    to="/quickscan"
                    data-cta="kennisbank-midden"
                    className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-110 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Start de quickscan <ArrowRight className="h-4 w-4" />
                  </Link>
                </aside>
                <PortableText value={post.body.slice(split)} components={bodyComponents} />
              </div>
            );
          })()}

          {(() => {
            const faqItems = getFaqItems(post);
            if (faqItems.length === 0) return null;
            return (
              <section className="max-w-[68ch]">
                <h2 id="veelgestelde-vragen" className="mt-14 mb-4 scroll-mt-28 text-2xl font-bold">Veelgestelde vragen</h2>
                {faqItems.map((item) => (
                  <div key={item._key}>
                    <h3 className="mt-8 mb-3 scroll-mt-28 text-xl font-medium">{item.question}</h3>
                    <p className="mb-5 text-[17px] md:text-lg leading-[1.75] text-foreground/85">{item.answer}</p>
                  </div>
                ))}
              </section>
            );
          })()}

          {post.author?.name && (
            <section className="mt-16 max-w-[68ch] rounded-2xl border border-border/40 bg-card p-6 md:p-8">
              <h2 className="text-2xl font-bold">Over de auteur</h2>
              <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(160).height(160).url()}
                    alt={post.author.imageAlt || post.author.name}
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{post.author.name}</p>
                  {post.author.role && (
                    <p className="mt-0.5 text-sm text-muted-foreground">{post.author.role}</p>
                  )}
                  {post.author.bio && post.author.bio.length > 0 && (
                    <div className="mt-4">
                      <PortableText value={post.author.bio} components={bioComponents} />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {post.author.linkedinUrl && (
                  <a
                    href={post.author.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4 hover:no-underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Volg {authorFirstName} op LinkedIn
                  </a>
                )}
                <Link
                  to="/over-propasso"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4 hover:no-underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Meer over {authorFirstName}
                </Link>
              </div>
            </section>
          )}
        </div>
      </article>

      {/* Verder lezen: related posts + parent pillar */}
      {((post.relatedPosts && post.relatedPosts.length > 0) || parentCategory?.slug) && (
        <section className="py-16 section-neutral-bg [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-primary [&_a:focus-visible]:rounded-sm [&_button:focus-visible]:outline [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-primary">
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
                    aria-label={`Lees verder: ${related.title}`}
                    className="group flex gap-5 items-start rounded-xl"
                  >
                    <div className="shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-secondary">
                      {related.mainImage ? (
                        <img
                          src={urlFor(related.mainImage).width(96).height(96).url()}
                          alt={related.altText || related.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                          width={96}
                          height={96}
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
                        Lees verder <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <PageCTA
        title={post.pillarCta?.ctaTitle || "Wil je weten waar jouw bedrijf staat?"}
        description={
          post.pillarCta?.ctaText ||
          "Doe de quickscan: twintig vragen, ongeveer vier minuten, en je ziet waar je bedrijf en jijzelf staan."
        }
        primaryLabel="Start de quickscan"
        primaryHref="/quickscan"
        secondaryLabel="Neem contact op"
        secondaryHref="/contact"
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
    return <NotFound />;
  }

  return <SanityArticlePage post={post} />;
};

export default KennisbankArticle;
