import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import QuickscanCalloutBlock from "@/components/QuickscanCalloutBlock";
import { fetchPaginaBySlug } from "@/lib/sanityQueries";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "@/pages/NotFound";

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
  },
};

const ExitPlanning = () => {
  const { data: pagina, isLoading } = useQuery({
    queryKey: ["sanity-pagina", "exit-planning"],
    queryFn: () => fetchPaginaBySlug("exit-planning"),
    staleTime: 1000 * 60 * 10,
  });

  if (!isLoading && !pagina) {
    return <NotFound />;
  }

  const canonical = "https://propasso.nl/exit-planning";
  const title = pagina?.metaTitle || (pagina ? `${pagina.title} | Propasso` : "Exit Planning | Propasso");
  const description =
    (pagina?.metaDescription || pagina?.heroIntro || "").trim() ||
    "Wat is exit planning en waarom begint een succesvolle bedrijfsoverdracht jaren voor de verkoop? Propasso legt het uit.";

  return (
    <PageLayout>
      {pagina && (
        <SEO
          title={title}
          description={description}
          canonical={canonical}
          ogTitle={`${pagina.title} | Propasso`}
          ogDescription={description}
          ogType="website"
          jsonLd={[
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: pagina.title,
              description,
              url: canonical,
              isPartOf: {
                "@type": "WebSite",
                name: "Propasso",
                url: "https://propasso.nl/",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://propasso.nl/" },
                { "@type": "ListItem", position: 2, name: pagina.title, item: canonical },
              ],
            },
          ]}
        />
      )}

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>

        <div className="section-container">
          {isLoading ? (
            <div className="mt-8 space-y-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-14 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
            </div>
          ) : (
            <div className="mt-8 max-w-4xl">
              <p className="eyebrow">Exit Planning</p>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.15] text-balance">
                {pagina?.title}
              </h1>

              {pagina?.heroIntro && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="mt-8 rounded-2xl tint-teal-bg p-8 md:p-10 border border-border/20"
                >
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                    {pagina.heroIntro}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ BODY ═══════════ */}
      {pagina?.body && pagina.body.length > 0 && (
        <section className="py-14 md:py-20">
          <div className="section-container">
            <div className="max-w-3xl prose-pillar">
              <PortableText value={pagina.body} components={portableTextComponents} />
            </div>
            <QuickscanCalloutBlock contextLine="Benieuwd hoe ver jouw bedrijf is met de voorbereiding op een overdracht? Doe de gratis quickscan." />
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

export default ExitPlanning;
