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
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Propasso | Exit Planning & Bedrijfsoverdracht voor MKB";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Propasso begeleidt MKB-ondernemers in de 3-5 jaar vóór de bedrijfsoverdracht naar maximale waarde en verkoopbaarheid."
      );
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <QuickscanBanner contextLine="Herken je dit? Ontdek in 4 minuten hoe jouw bedrijf ervoor staat." />
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
