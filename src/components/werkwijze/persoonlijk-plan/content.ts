/**
 * Teksten voor /werkwijze/persoonlijk-plan-opstellen ("Bedrijf verkocht, en dan?").
 * Bron: webteksten v03 van Propasso Content (20 nov 2026). Teksten niet zelf aanpassen:
 * wijzigingen lopen via Propasso Content (zie 261119_propasso_briefing-bedrijf-verkocht-en-dan_webteksten.md).
 */

export type LossId = "identiteit" | "zingeving" | "ritme" | "mensen" | "bereiken";
export type DayId = "ma" | "di" | "wo" | "do" | "vr";

export interface AgendaItem {
  day: DayId;
  /** Begintijd, "HH:MM" */
  start: string;
  /** Duur in minuten (vormgeving, geen tekst) */
  minutes: number;
  title: string;
  loss: LossId;
}

export interface Loss {
  id: LossId;
  number: string;
  label: string;
  text: string;
}

export const hero = {
  eyebrow: "Jouw persoonlijke plan voor na de bedrijfsverkoop",
  title: "Bedrijf verkocht, en dan?",
  intro:
    "Je bedrijf maak je verkoopklaar in de jaren voor de verkoop. Met een persoonlijk plan maak je ook jezelf klaar voor de fase daarna.",
  note: "Een kennismaking duurt een uur, een richtinggevend gesprek zonder verplichtingen.",
};

export const meta = {
  title: "Bedrijf verkocht, en dan?",
  description:
    "Bedrijf verkocht, en nu? Wat je kwijtraakt als je stopt, en hoe je je met een persoonlijk plan voorbereidt op de fase na de verkoop van je bedrijf.",
  ogTitle: "Bedrijf verkocht, en dan?",
  ogDescription:
    "Je bedrijf maak je jarenlang klaar voor de verkoop. Met een persoonlijk plan maak je ook jezelf klaar voor de fase daarna.",
  breadcrumb: "Je persoonlijke plan",
  altKarel: "Karel Cremers, oprichter van Propasso",
};

export const loss = {
  eyebrow: "Het zwarte gat",
  title: "Wat je op de dag van de overdracht kwijtraakt",
  intro:
    "Op de dag dat je tekent, verdwijnt meer dan je bedrijf. Kijk maar naar je agenda: bijna elke afspraak hangt aan iets wat je straks mist.",
  figureDescription: "Weekagenda van een ondernemer met zestien afspraken, die na de overdracht leeg is.",
  emptyWeek: "Maandag, de week na de overdracht.",
  secondLayer: {
    title: "En wat je jezelf niet hardop toegeeft",
    text: "Daaronder zit een laag die bijna iedereen onderschat. Jij was degene naar wie gekeken werd als er een succes gevierd werd. Niemand zegt hardop dat hij dat gaat missen, en juist daarom overvalt het je.",
    labels: ["Macht en invloed", "Aanzien", "Status", "Verantwoordelijkheid", "Erkenning"],
  },
  karel: {
    /** [ERVARING KAREL] Citaat volgt. Leeg = placeholder in de preview; moet gevuld zijn vóór livegang. */
    quote: "",
    caption:
      "Karel Cremers verkocht eind 2024 een groot deel van Worxx, uitzendbureau in de bouw met 130 medewerkers, via een management-buy-out.",
  },
};

export const days: { id: DayId; label: string }[] = [
  { id: "ma", label: "ma" },
  { id: "di", label: "di" },
  { id: "wo", label: "wo" },
  { id: "do", label: "do" },
  { id: "vr", label: "vr" },
];

export const losses: Loss[] = [
  {
    id: "identiteit",
    number: "01",
    label: "Identiteit",
    text: "Bij de bank, op de club en in de branche was je de ondernemer van je bedrijf. Wie ben je als dat wegvalt?",
  },
  {
    id: "zingeving",
    number: "02",
    label: "Zingeving",
    text: "Mensen hadden je nodig, voor een besluit, een oplossing of een nieuwe collega. Dat gevoel ertoe te doen, valt weg.",
  },
  {
    id: "ritme",
    number: "03",
    label: "Je ritme",
    text: "Je week had een vaste vorm, van de weekstart op maandag tot de borrel op vrijdag. Die vorm is weg.",
  },
  {
    id: "mensen",
    number: "04",
    label: "De mensen",
    text: "Wie je via je werk zag, je team, je klanten en je leveranciers, zie je niet meer vanzelf.",
  },
  {
    id: "bereiken",
    number: "05",
    label: "Iets bereiken",
    text: "Een order binnen, goede cijfers: elke week was er iets te winnen. Nu staat er geen score meer op het bord.",
  },
];

export const agenda: AgendaItem[] = [
  { day: "ma", start: "07:30", minutes: 75, title: "Weekstart met het MT", loss: "ritme" },
  { day: "ma", start: "10:00", minutes: 90, title: "Offerte grote klant", loss: "bereiken" },
  { day: "ma", start: "14:00", minutes: 75, title: "Gesprek met de bank", loss: "identiteit" },
  { day: "di", start: "08:00", minutes: 75, title: "Rondje over de werkvloer", loss: "mensen" },
  { day: "di", start: "11:00", minutes: 75, title: "Spoedoverleg levering", loss: "zingeving" },
  { day: "di", start: "15:00", minutes: 75, title: "Sollicitatiegesprek", loss: "zingeving" },
  { day: "wo", start: "07:30", minutes: 75, title: "Planning van de week", loss: "ritme" },
  { day: "wo", start: "12:30", minutes: 90, title: "Lunch ondernemersclub", loss: "identiteit" },
  { day: "wo", start: "16:00", minutes: 75, title: "Kwartaalcijfers", loss: "bereiken" },
  { day: "do", start: "08:30", minutes: 75, title: "Productieoverleg", loss: "ritme" },
  { day: "do", start: "11:00", minutes: 75, title: "Klant: contract tekenen", loss: "bereiken" },
  { day: "do", start: "13:30", minutes: 75, title: "Vraag van de werkplaats", loss: "zingeving" },
  { day: "do", start: "16:00", minutes: 90, title: "Jubileum 25 jaar Ton", loss: "mensen" },
  { day: "vr", start: "09:00", minutes: 90, title: "Strategie met het MT", loss: "identiteit" },
  { day: "vr", start: "13:00", minutes: 90, title: "Bestuur brancheclub", loss: "identiteit" },
  { day: "vr", start: "16:30", minutes: 90, title: "Vrijdagmiddagborrel", loss: "mensen" },
];
