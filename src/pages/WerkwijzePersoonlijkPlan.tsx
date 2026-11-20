import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import LossSection from "@/components/werkwijze/persoonlijk-plan/LossSection";
import KarelMoment from "@/components/werkwijze/persoonlijk-plan/KarelMoment";
import PlanSection from "@/components/werkwijze/persoonlijk-plan/PlanSection";
import ClosingSection from "@/components/werkwijze/persoonlijk-plan/ClosingSection";
import StickyCta from "@/components/werkwijze/persoonlijk-plan/StickyCta";
import { hero, meta } from "@/components/werkwijze/persoonlijk-plan/content";

/**
 * Werkwijzepagina "Bedrijf verkocht, en dan?" (/werkwijze/persoonlijk-plan-opstellen).
 * Vijf blokken (besluit Karel 20 nov 2026): hero, de agenda die leegloopt, Karel, het persoonlijke plan als route
 * (A visie, B plan, C ritme met "Wat gaan we doen?" en de tijdlijn), slot. Teksten: content.ts (webteksten v05 plus teksten Karel).
 *
 * STAND: deploy preview ronde 2. noIndex staat aan; placeholders [ERVARING KAREL] moeten gevuld zijn,
 * en submenu, schema, sitemap en llms.txt volgen vóór livegang (voortgang 3.3 tot 3.5).
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
    <KarelMoment />
    <PlanSection />
    <ClosingSection />
    <StickyCta />
  </PageLayout>
);

export default WerkwijzePersoonlijkPlan;
