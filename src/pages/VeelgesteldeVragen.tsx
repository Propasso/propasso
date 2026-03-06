import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wat is exit planning?",
    answer: "Placeholder — uitleg over exit planning volgt binnenkort.",
  },
  {
    question: "Wanneer moet ik beginnen met voorbereiden?",
    answer: "Placeholder — advies over timing volgt binnenkort.",
  },
  {
    question: "Wat kost begeleiding door Propasso?",
    answer: "Placeholder — informatie over investering volgt binnenkort.",
  },
  {
    question: "Hoe lang duurt een traject?",
    answer: "Placeholder — informatie over trajectduur volgt binnenkort.",
  },
  {
    question: "Voor welke bedrijven is Propasso geschikt?",
    answer: "Placeholder — doelgroepinformatie volgt binnenkort.",
  },
];

const VeelgesteldeVragen = () => {
  return (
    <PageLayout>
      <section className="py-16 md:py-24">
        <div className="section-container max-w-3xl">
          <p className="eyebrow">Veelgestelde vragen</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight text-balance">
            Antwoorden op veelgestelde vragen over exit planning
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Hieronder vind je antwoorden op de meest gestelde vragen over bedrijfsoverdracht en exit planning.
          </p>

          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <PageCTA />
    </PageLayout>
  );
};

export default VeelgesteldeVragen;
