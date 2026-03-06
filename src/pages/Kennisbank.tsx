import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import { articles } from "@/data/articles";

const Kennisbank = () => {
  return (
    <PageLayout>
      <section className="py-16 md:py-24">
        <div className="section-container">
          <p className="eyebrow">Kennisbank</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-balance">
            Inzichten over exit planning en bedrijfsoverdracht
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Praktische artikelen over waardecreatie, verkoopklaarheid en de voorbereiding op een succesvolle bedrijfsoverdracht.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-container">
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((article) => (
              <article key={article.slug} className="group">
                <Link to={`/kennisbank/${article.slug}`} className="block">
                  <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-secondary mb-5">
                      <img
                        src={article.image}
                        alt={article.imageAlt}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {article.entity}
                  </p>
                  <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {article.summary}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Verder lezen <ArrowRight size={14} />
                  </span>
                </Link>
              </article>
            ))}
          </div>
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
