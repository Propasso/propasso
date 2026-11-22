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
  "Ontdek de werkwijze van Propasso voor exit planning in het MKB: een gestructureerde aanpak om bedrijven sterker, minder afhankelijk en beter overdraagbaar te maken.";

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
        title="Werkwijze Verkoopklaar maken van Bedrijven | Propasso"
        description={pageDescription}
        canonical="https://propasso.nl/werkwijze"
        ogTitle="Werkwijze Verkoopklaar maken van Bedrijven | Propasso"
        ogDescription={pageDescription}
        ogType="website"
        jsonLd={pageSchemas}
      />

      <PageHero
        breadcrumb={[{ label: "Werkwijze" }]}
        eyebrow="Werkwijze"
        title={
          <>
            Verkoopklaar maken van je bedrijf, <span className="text-muted-foreground"> doe je in de jaren vóór de overdracht.</span>
          </>
        }
        intro={
          <>
            Ik breng in kaart hoe jij, je bedrijf en je cijfers ervoor staan. Daarna werken we in een vast ritme aan
            wat beter moet, zodat je straks zelf kiest wat je met je bedrijf doet.
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
        description="In een kennismaking van een uur kijken we waar je bedrijf staat, wat jij wilt en welke stap als eerste aandacht verdient. Zonder verplichtingen."
        primaryLabel="Plan een kennismaking"
        primaryHref="/contact"
        secondaryLabel="Ontdek jouw score"
        secondaryHref="/quickscan"
      />
    </PageLayout>
  );
};

export default Werkwijze;
