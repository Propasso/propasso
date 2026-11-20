import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import LossSection from "@/components/werkwijze/persoonlijk-plan/LossSection";
import { hero, meta } from "@/components/werkwijze/persoonlijk-plan/content";

/**
 * Werkwijzepagina "Bedrijf verkocht, en dan?" (/werkwijze/persoonlijk-plan-opstellen).
 * Blauwdruk: briefing hoofdstuk 13 (v07). Teksten: webteksten v03 van Propasso Content.
 *
 * STAND: proef vooraf (stap 2 voortgang). Alleen hero en sectie 3 (de agenda).
 * noIndex staat aan tot de volledige pagina af is; niet mergen in deze vorm.
 */
const WerkwijzePersoonlijkPlan = () => (
  <PageLayout>
    <SEO
      title={meta.title}
      description={meta.description}
      canonical="https://propasso.nl/werkwijze/persoonlijk-plan-opstellen"
      ogTitle={meta.ogTitle}
      ogDescription={meta.ogDescription}
      noIndex
    />

    <PageHero
      breadcrumb={[{ label: "Werkwijze", href: "/werkwijze" }, { label: meta.breadcrumb }]}
      eyebrow={hero.eyebrow}
      title={hero.title}
      intro={hero.intro}
      note={hero.note}
    />

    <LossSection />
  </PageLayout>
);

export default WerkwijzePersoonlijkPlan;
