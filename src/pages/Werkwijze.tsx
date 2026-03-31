import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import MKBRealitySection from "@/components/werkwijze/MKBRealitySection";
import ThreeStoriesSection from "@/components/werkwijze/ThreeStoriesSection";
import MethodologyFramework from "@/components/MethodologyFramework";
import OutcomesSection from "@/components/werkwijze/OutcomesSection";
import QuickscanBanner from "@/components/QuickscanBanner";
import { motion } from "framer-motion";
import mountainPassRoute from "@/assets/illustrations/mountain-pass-route.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const pageDescription =
  "Ontdek de werkwijze van Propasso voor exit planning in het MK: een gestructureerde aanpak om bedrijven sterker, minder afhankelijk en beter overdraagbaar te maken.";

const pageSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Werkwijze | Exit Planning voor MKB | Propasso",
    url: "https://propasso.nl/werkwijze",
    description: pageDescription,
    isPartOf: {
      "@type": "WebSite",
      name: "Propasso",
      url: "https://propasso.nl/",
    },
    about: {
      "@type": "ProfessionalService",
      name: "Propasso",
      url: "https://propasso.nl/",
    },
    inLanguage: "nl-NL",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://propasso.nl/" },
      { "@type": "ListItem", position: 2, name: "Werkwijze", item: "https://propasso.nl/werkwijze" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Exit Planning begeleiding voor MKB-ondernemers",
    provider: {
      "@type": "Organization",
      name: "Propasso",
      url: "https://propasso.nl/",
    },
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    serviceType: "Exit Planning",
    description:
      "Gestructureerde begeleiding voor MKB-ondernemers gericht op waardecreatie, verkoopklaarheid en overdraagbaarheid van het bedrijf.",
  },
];

const Werkwijze = () => {
  return (
    <PageLayout>
      <SEO
        title="Werkwijze Verkoopklaar maken van Bedrijven | Propasso"
        description={pageDescription}
        canonical="https://propasso.nl/werkwijze"
        ogTitle="Werkwijze Verkoopklaar maken van Bedrijven | Propasso"
        ogDescription={pageDescription}
        ogType="website"
        jsonLd={pageSchemas}
      />

      {/* 1. Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
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
            Verkoopklaar maken van je bedrijf, <span className="text-muted-foreground"> doe je in de jaren vóór de overdracht.</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Propasso begeleidt ondernemers met een gestructureerde aanpak die de ondernemer, de onderneming en de
            financiële realiteit samenbrengt. We staan naast je van analyse tot uitvoering, zodat het bedrijf sterker, onafhankelijker en
            overdraagbaar wordt. 
          </motion.p>
        </div>
      </section>

      <MKBRealitySection />

      <QuickscanBanner contextLine="Benieuwd naar het verbeterpotentieel van jouw bedrijf?" />

      <ThreeStoriesSection />

      <MethodologyFramework />

      <OutcomesSection />

      <PageCTA
        title="Klaar voor een strategisch gesprek?"
        description="Neem vrijblijvend contact op voor een kennismaking en ontdek hoe Propasso jouw bedrijf kan versterken."
        primaryLabel="Plan een gesprek"
        primaryHref="/contact"
        secondaryLabel="Bekijk de kennisbank"
        secondaryHref="/kennisbank"
      />
    </PageLayout>
  );
};

export default Werkwijze;
