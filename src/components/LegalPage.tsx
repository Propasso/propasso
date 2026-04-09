import { useQuery } from "@tanstack/react-query";
import { PortableText } from "@portabletext/react";
import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import { fetchLegalPageBySlug } from "@/lib/sanityQueries";
import { Skeleton } from "@/components/ui/skeleton";

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl font-semibold text-foreground mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">{children}</h3>
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

interface LegalPageProps {
  slug: string;
  fallbackTitle: string;
  seoDescription: string;
  canonical: string;
}

const LegalPage = ({ slug, fallbackTitle, seoDescription, canonical }: LegalPageProps) => {
  const { data: page, isLoading, isError } = useQuery({
    queryKey: ["legalPage", slug],
    queryFn: () => fetchLegalPageBySlug(slug),
  });

  const title = page?.title || fallbackTitle;

  return (
    <PageLayout>
      <SEO
        title={`${title} | Propasso`}
        description={seoDescription}
        canonical={canonical}
        ogTitle={`${title} | Propasso`}
        ogDescription={seoDescription}
      />
      <section className="py-20 bg-background">
        <div className="section-container max-w-3xl">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
              <div className="space-y-3 mt-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          ) : isError || !page?.content ? (
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{fallbackTitle}</h1>
              <p className="text-muted-foreground">
                De inhoud kon niet worden geladen. Probeer het later opnieuw.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h1>
              {page.lastUpdated && (
                <p className="text-sm text-muted-foreground mb-8">
                  Laatst bijgewerkt op{" "}
                  {new Date(page.lastUpdated).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
              <div className="prose prose-lg text-muted-foreground space-y-8">
                <PortableText value={page.content} components={portableTextComponents} />
              </div>
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default LegalPage;
