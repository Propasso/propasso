import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import MKBRealitySection from "@/components/werkwijze/MKBRealitySection";
import ThreeStoriesSection from "@/components/werkwijze/ThreeStoriesSection";
import MethodologyFramework from "@/components/MethodologyFramework";
import OutcomesSection from "@/components/werkwijze/OutcomesSection";
import QuickscanSideCallout from "@/components/QuickscanSideCallout";
import { motion } from "framer-motion";
import mountainPassRoute from "@/assets/illustrations/mountain-pass-route.png";

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
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        {/* Yellow accent circle with centered illustration */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 md:translate-x-1/6 w-[320px] h-[320px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px]">
          <div className="absolute inset-0 rounded-full bg-accent/30 blur-3xl" />
          <img
            src={mountainPassRoute}
            alt=""
            className="absolute inset-0 m-auto h-[65%] w-[65%] object-contain opacity-[0.08] pointer-events-none select-none"
          />
        </div>

        <div className="section-container relative z-10 py-16 md:py-24">
          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-foreground max-w-3xl text-balance"
          >
            Verkoopklaarheid bouw je op,{" "}
            <span className="text-muted-foreground">in de jaren vóór de overdracht.</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
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

      {/* 7. Quickscan callout */}
      <QuickscanCallout />

      {/* 8. Strategisch gesprek CTA */}
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
