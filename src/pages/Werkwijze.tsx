import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import PageHero from "@/components/PageHero";
import MKBRealitySection from "@/components/werkwijze/MKBRealitySection";
import ThreeStoriesSection from "@/components/werkwijze/ThreeStoriesSection";
import StepsSection from "@/components/werkwijze/StepsSection";
import OutcomesSection from "@/components/werkwijze/OutcomesSection";
import QuickscanBanner from "@/components/QuickscanBanner";

const pageDescription =
  "Exit planning in drie stappen: weten waar je staat, waarde opbouwen en zelf kiezen. Elke stap loopt langs je bedrijf en langs jezelf.";

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
      "@id": "https://propasso.nl/#organization",
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
      "@id": "https://propasso.nl/#organization",
      name: "Propasso",
      url: "https://propasso.nl/",
    },
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    serviceType: "Exit Planning",
    description:
      "Gestructureerde begeleiding voor MKB-ondernemers gericht op waardecreatie, overdraagbaarheid en het verkoopklaar maken van het bedrijf.",
  },
];

const Werkwijze = () => {
  return (
    <PageLayout>
      <SEO
        title="Exit planning in drie stappen | Werkwijze | Propasso"
        description={pageDescription}
        canonical="https://propasso.nl/werkwijze"
        ogTitle="Exit planning in drie stappen | Werkwijze | Propasso"
        ogDescription={pageDescription}
        ogType="website"
        jsonLd={pageSchemas}
      />

      <PageHero
        breadcrumb={[{ label: "Werkwijze" }]}
        eyebrow="Werkwijze"
        title={
          <>
            Exit planning leert je anders naar je bedrijf kijken.
          </>
        }
        subtitle={
          <>
            Verkopen is geen doel op zich, maar een keuze die je maakt wanneer jíj en je bedrijf er klaar voor zijn.
          </>
        }
        intro={
          <>
            Exit planning is het werk in de jaren vóór een overdracht: je maakt je bedrijf minder afhankelijk van jou en
            meer waard, en je bereidt jezelf voor op wat daarna komt. Ik begin met de vraag hoeveel van wat je bouwde nog
            op jou rust. Daarna werken we in een vast ritme aan wat beter moet. Zo haal je meer uit je bedrijf, of je het
            nu verkoopt of niet.
          </>
        }
      />

      <MKBRealitySection />

      <ThreeStoriesSection />

      <StepsSection />

      <QuickscanBanner contextLine="Wil je eerst zelf zien waar je staat? Dat is stap 1 in het klein." />

      <OutcomesSection />

      <PageCTA
        title="Wil je weten waar jij en je bedrijf staan?"
        description="In een kennismaking van een uur kijken we waar je bedrijf staat, wat jij wilt en welke stap als eerste aandacht verdient. Aan dat gesprek zit geen verplichting vast."
        primaryLabel="Plan een kennismaking"
        primaryHref="/contact"
        secondaryLabel="Ontdek jouw score"
        secondaryHref="/quickscan"
      />
    </PageLayout>
  );
};

export default Werkwijze;
