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
 * Vindbaar sinds de livegang (noIndex uit). Staat in sitemap.ts, public/llms.txt en het submenu Werkwijze.
 */
const PAGE_URL = "https://propasso.nl/werkwijze/persoonlijk-plan-opstellen";

const pageSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    name: meta.title,
    url: PAGE_URL,
    description: meta.description,
    inLanguage: "nl-NL",
    isPartOf: { "@type": "WebSite", name: "Propasso", url: "https://propasso.nl/" },
    about: { "@id": "https://propasso.nl/#organization" },
    author: { "@id": "https://propasso.nl/#person-karel-cremers" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://propasso.nl/" },
      { "@type": "ListItem", position: 2, name: "Werkwijze", item: "https://propasso.nl/werkwijze" },
      { "@type": "ListItem", position: 3, name: meta.breadcrumb, item: PAGE_URL },
    ],
  },
];
const WerkwijzePersoonlijkPlan = () => (
  <PageLayout>
    <SEO
      title={meta.title}
      description={meta.description}
      canonical="https://propasso.nl/werkwijze/persoonlijk-plan-opstellen"
      ogTitle={meta.ogTitle}
      ogDescription={meta.ogDescription}
      ogType="website"
      jsonLd={pageSchemas}
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
