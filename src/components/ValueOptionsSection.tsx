import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Homepage, blok "Waarde geeft keuzes": de ladder van gezond bedrijf naar vrijheid om te kiezen,
 * met de routes die daarna openliggen. Vervangt het oude vierfasenblok (MethodologyFramework);
 * de stappen zelf staan alleen op /werkwijze.
 */

const rungs = [
  {
    number: "1",
    title: "Een gezond bedrijf",
    text: "Het draait zonder dat jij elke beslissing neemt, met voorspelbare omzet en processen die zijn vastgelegd.",
  },
  {
    number: "2",
    title: "Een waardevol bedrijf",
    text: "Hogere en betrouwbaardere winst verhoogt de ondernemingswaarde in de ogen van een koper.",
  },
  {
    number: "3",
    title: "Financiële ruimte",
    text: "Wat je na de verkoop overhoudt, past bij het leven dat je daarna wilt. Een financieel planner rekent dat met je door.",
  },
  {
    number: "4",
    title: "Vrijheid om te kiezen",
    text: "Je beslist zelf wanneer en hoe je stopt, en wat je daarna gaat doen.",
  },
];

const routes = [
  "Verkoop aan een derde",
  "Management-buy-out",
  "Overdracht in de familie",
  "Zelf doorgaan, met meer afstand",
];

const ValueOptionsSection = () => (
  <section className="py-24 md:py-36">
    <div className="section-container">
      <p className="eyebrow">Waarde geeft keuzes</p>
      <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance">
        Je keuzes ontstaan in de jaren vóór de verkoop
      </h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
        Op de dag dat je besluit te verkopen, liggen je mogelijkheden al vast. Ze hangen af van hoe gezond en
        waardevol je bedrijf op dat moment is. Je bedrijf verkoopklaar maken betekent dat het zonder jou kan draaien en
        betrouwbare winst maakt, en dat jij weet wat je na de verkoop wilt.
      </p>

      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rungs.map((rung, i) => (
          <li
            key={rung.number}
            className={`relative rounded-2xl p-6 ${i === rungs.length - 1 ? "bg-primary text-primary-foreground" : "bg-muted/50"}`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                i === rungs.length - 1 ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
              }`}
            >
              {rung.number}
            </span>
            <h3 className={`mt-4 text-lg font-bold ${i === rungs.length - 1 ? "text-primary-foreground" : "text-foreground"}`}>{rung.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${i === rungs.length - 1 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              {rung.text}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10 max-w-4xl">
        <p className="text-sm font-semibold text-foreground">Daarna kies jij de route:</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {routes.map((route) => (
            <li key={route} className="rounded-full border border-border px-4 py-2 text-sm text-foreground/80">
              {route}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base text-muted-foreground leading-relaxed border-l-2 border-accent pl-6">
          Zelf verkocht ik eind 2024 een groot deel van mijn bedrijf via een management-buy-out, aan de directie
          die ik in de jaren daarvoor had aangesteld.
        </p>
        <Link
          to="/werkwijze#zo-werk-ik"
          className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary underline-offset-4 hover:underline"
        >
          Zo werkt exit planning, in drie stappen
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default ValueOptionsSection;
