import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import MethodologyFramework from "@/components/MethodologyFramework";
import WhyPropasso from "@/components/WhyPropasso";
import TargetAudience from "@/components/TargetAudience";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import StatsBar from "@/components/StatsBar";
import ClientLogos from "@/components/ClientLogos";
import QuickscanBanner from "@/components/QuickscanBanner";

const homepageJsonLd = [
  {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://propasso.nl/#service",
        "name": "Exit Planning voor MKB-ondernemers",
        "description": "Propasso begeleidt MKB-ondernemers in Nederland bij het strategisch verkoopklaar maken van hun bedrijf, zodat zij de maximale verkoopwaarde realiseren.",
        "provider": {
                "@type": "Organization",
                "@id": "https://propasso.nl/#organization",
                "name": "Propasso",
        },
        "areaServed": {
                "@type": "Country",
                "name": "Nederland",
        },
        "serviceType": "Exit Planning",
  },
  ];

const Index = () => {
    return (
          <PageLayout>
                <SEO
                          title="Exit Planning voor MKB-ondernemers | Propasso"
                          description="Propasso begeleidt MKB-ondernemers in Nederland bij het verkoopklaar maken van hun bedrijf. Start op tijd en realiseer de maximale verkoopwaarde."
                          canonical="https://propasso.nl/"
                          ogTitle="Exit Planning voor MKB-ondernemers | Propasso"
                          ogDescription="Propasso begeleidt MKB-ondernemers in Nederland bij het verkoopklaar maken van hun bedrijf. Start op tijd en realiseer de maximale verkoopwaarde."
                          jsonLd={homepageJsonLd}
                        />
                <HeroSection />
                <StatsBar />
                <ProblemSection />
                <MethodologyFramework />
                <WhyPropasso />
                <ClientLogos />
                <TargetAudience />
                <TestimonialsSection />
                <BlogSection />
                <QuickscanBanner />
                <CTASection />
          </PageLayout>
        );
};

export default Index;
