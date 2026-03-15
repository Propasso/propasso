import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import MethodologyFramework from "@/components/MethodologyFramework";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const Werkwijze = () => {
  useEffect(() => {
    document.title =
      "Werkwijze | Propasso — Gestructureerde Exit Planning voor MKB";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "De werkwijze van Propasso: een gestructureerd traject van analyse tot verkoopklaarheid, gebaseerd op de Value Acceleration Methodology voor het Nederlandse MKB."
      );
    }
  }, []);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Werkwijze</p>
          </motion.div>
          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-balance"
          >
            Een gestructureerd traject naar verkoopklaarheid
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Propasso werkt met een methodiek die de ondernemer, de onderneming
            en de financiële realiteit samenbrengt. Van analyse tot uitvoering
            — in vier strategische fases.
          </motion.p>
        </div>
      </section>

      {/* Methodology Framework */}
      <MethodologyFramework />

      {/* CTA */}
      <PageCTA
        secondaryLabel="Bekijk de kennisbank"
        secondaryHref="/kennisbank"
      />
    </PageLayout>
  );
};

export default Werkwijze;
