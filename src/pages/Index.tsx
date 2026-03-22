import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import QuickscanBanner from "@/components/QuickscanBanner";
import HeroSection from "@/components/HeroSection";
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

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Propasso | Exit Planning & Bedrijfsoverdracht voor MKB Ondernemingen</title>

        <meta
          name="description"
          content="Propasso begeleidt MKB-ondernemers in de 3-5 jaar vóór de bedrijfsoverdracht naar maximale waarde en verkoopbaarheid."
        />

        <link rel="canonical" href="https://propasso.nl/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Propasso | Exit Planning & Bedrijfsoverdracht voor MKB Ondernemingen" />
        <meta
          property="og:description"
          content="Propasso begeleidt MKB-ondernemers in de 3-5 jaar vóór de bedrijfsoverdracht naar maximale waarde en verkoopbaarheid."
        />
        <meta property="og:url" content="https://propasso.nl/" />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Propasso",
            url: "https://propasso.nl",
            logo: "https://propasso.nl/propasso-logo-grey-yellow.png",
            description:
              "Propasso begeleidt MKB-ondernemers bij exit planning en bedrijfsoverdracht naar maximale waarde en verkoopbaarheid.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Nieuwe Linie 12",
              addressLocality: "Vught",
              postalCode: "5264 PJ",
              addressCountry: "NL",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+31-6-10057566",
              contactType: "customer service",
              email: "info@propasso.nl",
              availableLanguage: "Dutch",
            },
            sameAs: ["https://www.linkedin.com/company/propasso", "https://www.linkedin.com/in/karelcremers"],
            founder: {
              "@type": "Person",
              name: "Karel Cremers",
              jobTitle: "Oprichter & Exit Planning Adviseur",
              url: "https://propasso.nl/over-propasso",
            },
          }),
        }}
      />
      <Header />
      <main>
        <HeroSection />
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
