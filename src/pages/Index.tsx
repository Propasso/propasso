import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HomeStepsSection from "@/components/HomeStepsSection";
import WhyPropasso from "@/components/WhyPropasso";
import TargetAudience from "@/components/TargetAudience";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import StatsBar from "@/components/StatsBar";
import ClientLogos from "@/components/ClientLogos";
import QuickscanBanner from "@/components/QuickscanBanner";
import MeetKarelSection from "@/components/MeetKarelSection";
import ThemesSection from "@/components/ThemesSection";

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
                          title="Bedrijf verkoopklaar maken voor MKB-ondernemers | Propasso"
                          description="Je bedrijf verkoopklaar maken begint jaren vóór de verkoop. Ik help MKB-ondernemers hun bedrijf minder afhankelijk van zichzelf en meer waard te maken."
                          canonical="https://propasso.nl/"
                          ogTitle="Bedrijf verkoopklaar maken voor MKB-ondernemers | Propasso"
                          ogDescription="Je bedrijf verkoopklaar maken begint jaren vóór de verkoop. Ik help MKB-ondernemers hun bedrijf minder afhankelijk van zichzelf en meer waard te maken."
                          jsonLd={homepageJsonLd}
                        />
                <HeroSection />
                <StatsBar />
                <ProblemSection />
                <HomeStepsSection />
                <ThemesSection />
                <WhyPropasso />
                <MeetKarelSection />
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
