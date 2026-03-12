import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqSections } from "@/data/faqData";

const VeelgesteldeVragen = () => {
  // Generate JSON-LD FAQPage structured data
  const jsonLd = useMemo(() => {
    const allItems = faqSections.flatMap((s) =>
      s.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    );
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allItems,
    };
  }, []);

  return (
    <PageLayout>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="section-container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">Veelgestelde vragen</p>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight text-balance">
              Antwoorden op veelgestelde vragen over exit planning
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Als ondernemer wil je helder inzicht voordat je stappen zet. Hieronder vind je antwoorden op de vragen die
              wij het vaakst horen — over strategie, waarde, overdraagbaarheid en het verkoopproces.
            </p>
          </motion.div>

          {/* Jump links */}
          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            aria-label="Ga naar thema"
            className="mt-10 flex flex-wrap gap-2"
          >
            {faqSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-card hover:border-primary/30 transition-colors"
              >
                <section.icon size={14} className="text-muted-foreground" />
                {section.title}
              </a>
            ))}
          </motion.nav>
        </div>
      </section>

      {/* FAQ Sections */}
      <div className="pb-16 md:pb-24">
        {faqSections.map((section, sectionIndex) => {
          const isAlt = sectionIndex % 2 === 1;
          return (
            <section
              key={section.id}
              id={section.id}
              className={`scroll-mt-28 ${isAlt ? "section-alt-bg" : ""}`}
            >
              <div className="section-container max-w-4xl py-14 md:py-20">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45 }}
                >
                  {/* Section header */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex-shrink-0 mt-1 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <section.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {section.title}
                      </h2>
                      <p className="mt-1 text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Accordion */}
                  <Accordion type="single" collapsible className="space-y-3">
                    {section.items.map((faq, faqIndex) => (
                      <AccordionItem
                        key={`${sectionIndex}-${faqIndex}`}
                        value={`faq-${sectionIndex}-${faqIndex}`}
                        className="border rounded-lg px-5 bg-background shadow-sm"
                      >
                        <AccordionTrigger className="text-left text-base md:text-lg font-semibold py-5 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-line text-[0.95rem] pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Closing bridge */}
      <section className="py-14 md:py-20 section-alt-bg">
        <div className="section-container max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">
            Staat jouw vraag er niet bij?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Elke situatie is anders. Neem gerust contact op — we denken graag mee over jouw specifieke vraagstuk,
            vrijblijvend en vertrouwelijk.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Stel je vraag
              <ChevronRight size={18} />
            </Link>
            <Link
              to="/werkwijze"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-7 py-4 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Bekijk onze werkwijze
            </Link>
          </div>
        </div>
      </section>

      <PageCTA />
    </PageLayout>
  );
};

export default VeelgesteldeVragen;
