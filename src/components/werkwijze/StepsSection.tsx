import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Werkwijze-overzicht, blok "Zo werk ik": drie stappen, elk met twee sporen (je bedrijf en jijzelf).
 * Zelfde model als de stappen op /werkwijze/persoonlijk-plan-opstellen. Eén opmaak voor desktop en mobiel,
 * alle tekst staat in de statische HTML (geen inhoud die pas bij hover verschijnt).
 */

type Lane = { text: string; link?: { label: string; href: string } };

const steps: { number: string; title: string; lead: string; company: Lane; owner: Lane }[] = [
  {
    number: "01",
    title: "Weten waar je staat",
    lead: "Eerst een eerlijk beeld van jou, je bedrijf en je cijfers, bekeken met de blik van een koper.",
    company: {
      text: "Hoe afhankelijk is het bedrijf van jou, hoe overdraagbaar is het en wat ziet een koper in je cijfers? Welk deel van de winst is er alleen omdat jij er elke dag staat?",
    },
    owner: {
      text: "Een persoonlijke nulmeting en risicocheck: waarom wil je verkopen, wat wil je daarna, en wat is er geregeld als jij morgen uitvalt?",
    },
  },
  {
    number: "02",
    title: "Waarde opbouwen",
    lead: "Een plan met jaardoelen, vertaald naar kwartaaldoelen, en een vast ritme om ze te halen.",
    company: {
      text: "Elke vier weken een sessie voor de kwartaaldoelen en elke twee weken een check-in met de trekkers van de deelprojecten. Zo wordt het bedrijf stap voor stap minder afhankelijk van jou en winstgevender.",
    },
    owner: {
      text: "Je persoonlijke plan loopt parallel, met een sessie om de twee à drie maanden. Elke keer ga je naar huis met een kleine stap.",
      link: { label: "Zo werkt het persoonlijke plan", href: "/werkwijze/persoonlijk-plan-opstellen" },
    },
  },
  {
    number: "03",
    title: "Zelf kiezen",
    lead: "Is je bedrijf gezond en waardevol, dan hoef je niet te reageren op de eerste koper die belt. Dan kies je zelf.",
    company: {
      text: "Verkopen aan een derde, een management-buy-out, overdracht binnen de familie of zelf doorgaan met meer afstand. Kies je voor verkoop, dan help ik je de juiste verkooppartij te kiezen; het verkoopproces zelf doet die partij.",
    },
    owner: {
      text: "Bij elke check-in toetsen we dezelfde vraag: ben je persoonlijk klaar voor de exit? Soms blijkt dan dat je niet meer wilt verkopen, omdat de reden om te verkopen is opgelost.",
    },
  },
];

const LaneBlock = ({ label, lane }: { label: string; lane: Lane }) => (
  <div className="border-t border-border/40 pt-4">
    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{lane.text}</p>
    {lane.link && (
      <Link
        to={lane.link.href}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
      >
        {lane.link.label}
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    )}
  </div>
);

const StepsSection = () => (
  <section id="zo-werk-ik" className="py-24 md:py-36 section-neutral-bg scroll-mt-28">
    <div className="section-container">
      <p className="eyebrow">Zo werk ik</p>
      <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance">
        Exit planning in drie stappen, voor je bedrijf en voor jezelf
      </h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
        Je bedrijf en jijzelf moeten allebei klaar zijn voor de overdracht. Daarom loopt elke stap langs twee
        sporen. Het bedrijf krijgt de meeste tijd, je persoonlijke plan loopt in een rustiger tempo mee.
      </p>

      <ol className="mt-14 grid gap-5 lg:grid-cols-3">
        {steps.map((step) => (
          <li key={step.number} className="flex flex-col rounded-2xl bg-white p-6 md:p-8">
            <span className="stat-number block text-3xl leading-none">{step.number}</span>
            <h3 className="mt-4 text-xl md:text-2xl font-bold text-foreground">{step.title}</h3>
            <p className="mt-3 text-base text-foreground/80 leading-relaxed">{step.lead}</p>
            <div className="mt-6 space-y-5">
              <LaneBlock label="Je bedrijf" lane={step.company} />
              <LaneBlock label="Jijzelf" lane={step.owner} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default StepsSection;
