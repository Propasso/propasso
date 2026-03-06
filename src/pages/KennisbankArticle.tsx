import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import { articles } from "@/data/articles";

const KennisbankArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <PageLayout>
        <section className="py-16 md:py-24">
          <div className="section-container text-center">
            <h1 className="text-4xl font-bold">Artikel niet gevonden</h1>
            <p className="mt-4 text-muted-foreground">
              Dit artikel bestaat niet of is verplaatst.
            </p>
            <Link
              to="/kennisbank"
              className="mt-8 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <ArrowLeft size={16} /> Terug naar kennisbank
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const relatedArticles = articles.filter(
    (a) => a.slug !== slug && a.entity === article.entity
  ).slice(0, 2);

  const otherArticles = relatedArticles.length < 2
    ? [
        ...relatedArticles,
        ...articles.filter((a) => a.slug !== slug && !relatedArticles.includes(a)).slice(0, 2 - relatedArticles.length),
      ]
    : relatedArticles;

  return (
    <PageLayout>
      <article className="py-16 md:py-24">
        <div className="section-container max-w-3xl">
          <Link
            to="/kennisbank"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Terug naar kennisbank
          </Link>

          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {article.entity}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
            {article.title}
          </h1>

          <div className="mt-8 p-6 rounded-2xl bg-secondary">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Samenvatting
            </h2>
            <p className="text-foreground leading-relaxed">{article.summary}</p>
          </div>

          <div className="mt-12 prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {article.content}
            </p>
          </div>
        </div>
      </article>

      {otherArticles.length > 0 && (
        <section className="py-16 section-alt-bg">
          <div className="section-container">
            <h2 className="text-2xl font-bold mb-8">Gerelateerde artikelen</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {otherArticles.map((related) => (
                <Link
                  key={related.slug}
                  to={`/kennisbank/${related.slug}`}
                  className="group flex gap-5 items-start"
                >
                  <div className="shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-secondary">
                      <img
                        src={related.image}
                        alt={related.imageAlt}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
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

      <PageCTA />
    </PageLayout>
  );
};

export default KennisbankArticle;
