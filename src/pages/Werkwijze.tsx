import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import PageHero from "@/components/PageHero";
import MKBRealitySection from "@/components/werkwijze/MKBRealitySection";
import ThreeStoriesSection from "@/components/werkwijze/ThreeStoriesSection";
import MethodologyFramework from "@/components/MethodologyFramework";
import OutcomesSection from "@/components/werkwijze/OutcomesSection";
import QuickscanBanner from "@/components/QuickscanBanner";
import mountainPassRoute from "@/assets/illustrations/mountain-pass-route.png";

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
        illustration={mountainPassRoute}
        title={
          <>
            Verkoopklaar maken van je bedrijf, <span className="text-muted-foreground"> doe je in de jaren vóór de overdracht.</span>
          </>
        }
        intro={
          <>
            Propasso begeleidt ondernemers met een gestructureerde aanpak die de ondernemer, de onderneming en de
            financiële realiteit samenbrengt. We staan naast je van analyse tot uitvoering, zodat het bedrijf sterker, onafhankelijker en
            overdraagbaar wordt.
          </>
        }
      />

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
