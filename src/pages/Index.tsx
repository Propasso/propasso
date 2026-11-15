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
import MeetKarelSection from "@/components/MeetKarelSection";
import ThemesSection from "@/components/ThemesSection";

const homepageJsonLd = [
  {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://propasso.nl/#service",
        "name": "Exit Planning voor MKB-ondernemers",
        "description": "Propasso begeleidt MKB-ondernemers in Nederland bij het verkoopklaar maken van hun bedrijf in de 3 tot 5 jaar vóór de verkoop, gericht op maximale bedrijfswaarde.",
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
  {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://propasso.nl/#person-karel-cremers",
        "name": "Karel Cremers",
        "url": "https://propasso.nl/over-propasso",
        "jobTitle": "Exit Planning Adviseur",
        "worksFor": {
                "@id": "https://propasso.nl/#organization",
        },
        "sameAs": ["https://www.linkedin.com/in/karelcremers"],
  },
  ];

const Index = () => {
    return (
          <PageLayout>
                <SEO
                          title="Bedrijf verkoopklaar maken | Exit planning | Propasso"
                          description="Bedrijf verkoopklaar maken met een ondernemer die het zelf deed. Propasso begeleidt DGA's in de 3 tot 5 jaar vóór de verkoop, naar maximale bedrijfswaarde."
                          canonical="https://propasso.nl/"
                          ogTitle="Bedrijf verkoopklaar maken | Exit planning | Propasso"
                          ogDescription="Bedrijf verkoopklaar maken met een ondernemer die het zelf deed. Propasso begeleidt DGA's in de 3 tot 5 jaar vóór de verkoop, naar maximale bedrijfswaarde."
                          jsonLd={homepageJsonLd}
                        />
                <HeroSection />
                <StatsBar />
                <ProblemSection />
                <MethodologyFramework />
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
