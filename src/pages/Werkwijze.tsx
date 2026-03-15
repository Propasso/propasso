import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import MKBRealitySection from "@/components/werkwijze/MKBRealitySection";
import ThreeStoriesSection from "@/components/werkwijze/ThreeStoriesSection";
import MethodologyFramework from "@/components/MethodologyFramework";
import OutcomesSection from "@/components/werkwijze/OutcomesSection";
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
      {/* 1. Hero */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Werkwijze</p>
          </motion.div>
          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-balance"
          >
            Verkoopklaarheid bouw je op, in de jaren vóór de overdracht
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Propasso begeleidt ondernemers met een gestructureerde aanpak die
            de ondernemer, de onderneming en de financiële realiteit
            samenbrengt. Van analyse tot uitvoering, zodat het bedrijf
            sterker, onafhankelijker en overdraagbaar wordt.
          </motion.p>
        </div>
      </section>

      {/* 2. De realiteit van het MKB */}
      <MKBRealitySection />

      {/* 3. Kernprincipe: drie verhalen */}
      <ThreeStoriesSection />

      {/* 4. Methodology Framework (centerpiece) */}
      <MethodologyFramework />

      {/* 6. Wat dit oplevert */}
      <OutcomesSection />

      {/* 7. Strategisch gesprek CTA */}
      <PageCTA
        title="Klaar voor een strategisch gesprek?"
        description="Neem vrijblijvend contact op voor een kennismaking en ontdek hoe Propasso uw bedrijf kan versterken."
        primaryLabel="Plan een gesprek"
        primaryHref="/contact"
        secondaryLabel="Bekijk de kennisbank"
        secondaryHref="/kennisbank"
      />
    </PageLayout>
  );
};

export default Werkwijze;
