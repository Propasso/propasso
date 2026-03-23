import SEO from "@/components/SEO";
import Header from "@/components/Header";
import QuickscanBanner from "@/components/QuickscanBanner";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ProblemSection from "@/components/ProblemSection";
import SaleReadySection from "@/components/SaleReadySection";
import PhasesSection from "@/components/PhasesSection";
import ClientLogos from "@/components/ClientLogos";
import WhyPropasso from "@/components/WhyPropasso";
import TargetAudience from "@/components/TargetAudience";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const homepageSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://propasso.nl/#organization",
    name: "Propasso",
    url: "https://propasso.nl/",
    logo: "https://propasso.nl/propasso-logo-grey-yellow.png",
    description:
      "Propasso begeleidt MKB-ondernemers bij exit planning, waardecreatie en het verkoopklaar maken van hun bedrijf.",
    founder: {
      "@type": "Person",
      name: "Karel Cremers",
      url: "https://propasso.nl/over-propasso",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nieuwe Linie 12",
      postalCode: "5264PJ",
      addressLocality: "Vught",
      addressCountry: "NL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+31 6 1005 7566",
      email: "hallo@propasso.nl",
      availableLanguage: ["nl-NL"],
    },
    sameAs: [
      "https://www.linkedin.com/company/propasso",
      "https://www.linkedin.com/in/karelcremers",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://propasso.nl/#website",
    url: "https://propasso.nl/",
    name: "Propasso",
    inLanguage: "nl-NL",
    publisher: {
      "@id": "https://propasso.nl/#organization",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://propasso.nl/#webpage",
    url: "https://propasso.nl/",
    name: "Exit Planning voor MKB-ondernemers | Propasso",
    isPartOf: {
      "@id": "https://propasso.nl/#website",
    },
    about: {
      "@id": "https://propasso.nl/#organization",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://propasso.nl/og-default.png",
    },
    description:
      "Propasso helpt MKB-ondernemers hun bedrijf verkoopklaar te maken, de bedrijfswaarde te verhogen en de afhankelijkheid van de ondernemer te verminderen.",
    inLanguage: "nl-NL",
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://propasso.nl/#service",
    name: "Propasso",
    url: "https://propasso.nl/",
    image: "https://propasso.nl/og-default.png",
    description:
      "Adviesbureau voor exit planning, waardecreatie en bedrijfsoverdracht voor MKB-ondernemers in Nederland.",
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    provider: {
      "@id": "https://propasso.nl/#organization",
    },
    knowsAbout: [
      "Exit planning",
      "Bedrijfsoverdracht",
      "Bedrijf verkoopklaar maken",
      "Bedrijfswaarde verhogen",
      "Afhankelijkheid van de ondernemer verminderen",
    ],
  },
];

const Index = () => {
  return (
    <>
      <SEO
        title="Exit Planning voor MKB-ondernemers"
        description="Propasso helpt MKB-ondernemers hun bedrijf verkoopklaar te maken, de bedrijfswaarde te verhogen en de afhankelijkheid van de ondernemer te verminderen."
        canonical="https://propasso.nl/"
        ogTitle="Exit Planning voor MKB-ondernemers | Propasso"
        ogDescription="Propasso helpt MKB-ondernemers hun bedrijf verkoopklaar te maken, de bedrijfswaarde te verhogen en de afhankelijkheid van de ondernemer te verminderen."
        ogType="website"
        ogImage="https://propasso.nl/og-default.png"
        jsonLd={homepageSchemas}
      />

      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <ProblemSection />
        <QuickscanBanner contextLine="Benieuwd naar de status en het potentieel van jouw bedrijf?" />
        <SaleReadySection />
        <PhasesSection />
        <ClientLogos />
        <WhyPropasso />
        <TargetAudience />
        <CTASection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
