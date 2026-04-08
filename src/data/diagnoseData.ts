// Exit Readiness Diagnose — Question & Scoring Data

export type QuestionCategory = "snapshot" | "attractiveness" | "readiness" | "owner";
export type ScoreLevel = "orientation" | "foundation" | "good" | "ready";

export interface DiagnoseOption {
  label: string;
  value: string;
  score?: number; // 1–6 for diagnostische vragen
}

export interface DiagnoseQuestion {
  id: number;
  category: QuestionCategory;
  question: string;
  options: DiagnoseOption[];
  format?: "likert" | "scenario";
}

// ---------------------------------------------------------------------------
// Likert schaal (gedeeld door alle diagnostische likert-vragen)
// ---------------------------------------------------------------------------

const likertOptions: DiagnoseOption[] = [
  { label: "Klopt helemaal", value: "6", score: 6 },
  { label: "Klopt grotendeels", value: "5", score: 5 },
  { label: "Klopt deels", value: "4", score: 4 },
  { label: "Klopt nauwelijks", value: "3", score: 3 },
  { label: "Klopt niet", value: "2", score: 2 },
  { label: "Weet ik niet / n.v.t.", value: "1", score: 1 },
];

// ---------------------------------------------------------------------------
// Snapshot vragen (Q1–Q3) — niet gescoord
// ---------------------------------------------------------------------------

const snapshotQuestions: DiagnoseQuestion[] = [
  {
    id: 1,
    category: "snapshot",
    question: "Wat is de jaarlijkse omzet van het bedrijf?",
    options: [
      { label: "< €1 miljoen", value: "< €1 mln" },
      { label: "€1 – €3 miljoen", value: "€1–3 mln" },
      { label: "€3 – €10 miljoen", value: "€3–10 mln" },
      { label: "€10 – €25 miljoen", value: "€10–25 mln" },
      { label: "€25 – €50 miljoen", value: "€25–50 mln" },
      { label: "> €50 miljoen", value: "> €50 mln" },
    ],
  },
  {
    id: 2,
    category: "snapshot",
    question: "Hoe zou je de winstgevendheid van je bedrijf omschrijven?",
    options: [
      { label: "Onder druk of dalend", value: "Onder druk of dalend" },
      { label: "Rond break-even", value: "Rond break-even" },
      { label: "Redelijke winst maar weinig marge", value: "Redelijke winst maar weinig marge" },
      { label: "Goed winstgevend met gezonde marges", value: "Goed winstgevend met gezonde marges" },
    ],
  },
  {
    id: 3,
    category: "snapshot",
    question: "Overweeg je een overdracht en zo ja, op welke termijn?",
    options: [
      { label: "0 – 2 jaar", value: "0–2 jaar" },
      { label: "3 – 5 jaar", value: "3–5 jaar" },
      { label: "5 – 10 jaar", value: "5–10 jaar" },
      { label: "Nog niet concreet", value: "Nog niet concreet" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Dimensie 1: Aantrekkelijkheid van het Bedrijf (Q6–Q10)
// ---------------------------------------------------------------------------

const attractivenessQuestions: DiagnoseQuestion[] = [
  {
    id: 6,
    category: "attractiveness",
    format: "likert",
    question: "Onze omzet is voorspelbaar: ik kan aan het begin van het jaar goed inschatten wat we gaan draaien.",
    options: likertOptions,
  },
  {
    id: 7,
    category: "attractiveness",
    format: "scenario",
    question: "Welke situatie beschrijft jouw klantenbestand het best?",
    options: [
      { label: "Eén of twee klanten zijn goed voor meer dan de helft van onze omzet", value: "1", score: 1 },
      { label: "Onze top-3 klanten vertegenwoordigt 30–50% van de omzet", value: "3", score: 3 },
      { label: "Geen enkele klant is groter dan 15% van onze omzet", value: "5", score: 5 },
      { label: "We hebben een breed en divers klantenbestand zonder noemenswaardige concentratie", value: "6", score: 6 },
    ],
  },
  {
    id: 8,
    category: "attractiveness",
    format: "scenario",
    question: "Welk deel van je omzet is terugkerend (contracten, abonnementen, doorlopende opdrachten)?",
    options: [
      { label: "Vrijwel niets; onze omzet is grotendeels projectmatig of eenmalig", value: "1", score: 1 },
      { label: "Minder dan 25% komt uit doorlopende afspraken", value: "3", score: 3 },
      { label: "Ongeveer de helft is terugkerend", value: "5", score: 5 },
      { label: "Het grootste deel van onze omzet is contractueel vastgelegd of terugkerend", value: "6", score: 6 },
    ],
  },
  {
    id: 9,
    category: "attractiveness",
    format: "likert",
    question: "Mijn bedrijf kan prima twee maanden door als ik er niet ben.",
    options: likertOptions,
  },
  {
    id: 10,
    category: "attractiveness",
    format: "likert",
    question: "We hebben een duidelijke marktpositie: klanten kiezen bewust voor ons en niet voor een concurrent.",
    options: likertOptions,
  },
];

// ---------------------------------------------------------------------------
// Dimensie 2: Verkoopklaarheid van het Bedrijf (Q11–Q15)
// ---------------------------------------------------------------------------

const readinessQuestions: DiagnoseQuestion[] = [
  {
    id: 11,
    category: "readiness",
    format: "likert",
    question: "Een externe partij kan binnen een week een helder beeld krijgen van het bedrijf, onze (financiële) stuurinformatie en dynamiek.",
    options: likertOptions,
  },
  {
    id: 12,
    category: "readiness",
    format: "likert",
    question: "Alle belangrijke klant- en leveranciersrelaties zijn contractueel vastgelegd op naam van de BV.",
    options: likertOptions,
  },
  {
    id: 13,
    category: "readiness",
    format: "scenario",
    question: "Hoe staat het met de vastlegging van jullie belangrijkste werkprocessen?",
    options: [
      { label: "De meeste kennis zit in de hoofden van een paar mensen", value: "1", score: 1 },
      { label: "Er zijn wat beschrijvingen, maar ze zijn niet actueel of compleet", value: "3", score: 3 },
      { label: "De kernprocessen zijn vastgelegd en worden ook daadwerkelijk gevolgd", value: "5", score: 5 },
      { label: "Alle belangrijke processen zijn gedocumenteerd, geborgd én regelmatig geüpdatet", value: "6", score: 6 },
    ],
  },
  {
    id: 14,
    category: "readiness",
    format: "scenario",
    question: "Hoe is de juridische en fiscale structuur van je bedrijf voorbereid op een toekomstige overdracht?",
    options: [
      { label: "Ik heb hier eerlijk gezegd geen zicht op", value: "1", score: 1 },
      { label: "Ik vermoed dat het niet optimaal is, maar het is nooit beoordeeld", value: "3", score: 3 },
      { label: "Een adviseur heeft het bekeken, maar er zijn nog aanbevelingen open", value: "5", score: 5 },
      { label: "De structuur is recent beoordeeld en ingericht met het oog op overdracht", value: "6", score: 6 },
    ],
  },
  {
    id: 15,
    category: "readiness",
    format: "likert",
    question: "Ons groeiplan voor de komende 3–5 jaar is uitgewerkt en zou ik morgen aan een geïnteresseerde partij kunnen presenteren.",
    options: likertOptions,
  },
];

// ---------------------------------------------------------------------------
// Dimensie 3: Verkoopklaarheid van de Ondernemer (Q16–Q20)
// ---------------------------------------------------------------------------

const ownerQuestions: DiagnoseQuestion[] = [
  {
    id: 16,
    category: "owner",
    format: "likert",
    question: "Ik weet precies welk bedrag ik nodig heb om na verkoop financieel onafhankelijk te zijn.",
    options: likertOptions,
  },
  {
    id: 17,
    category: "owner",
    format: "scenario",
    question: "Hoe ver ben je met je persoonlijke plan voor de periode na je bedrijf?",
    options: [
      { label: "Daar heb ik nog niet serieus over nagedacht.", value: "1", score: 1 },
      { label: "Ik denk weleens na over wat ik zou willen, het is nog vaag.", value: "3", score: 3 },
      { label: "Ik heb een redelijk beeld van wat ik wil en een paar lijntjes uit staan, maar het is niet concreet.", value: "5", score: 5 },
      { label: "Ik heb een concreet plan en heb dit besproken met mijn partner of naasten.", value: "6", score: 6 },
    ],
  },
  {
    id: 18,
    category: "owner",
    format: "likert",
    question: "Ik draag bewust en stapsgewijs verantwoordelijkheden over aan mijn team.",
    options: likertOptions,
  },
  {
    id: 19,
    category: "owner",
    format: "scenario",
    question: "Hoe ziet jouw adviesteam eruit voor een toekomstige overdracht?",
    options: [
      { label: "Mijn boekhouder kent mijn bedrijf goed, daarnaast heb ik onze vaste notaris", value: "1", score: 1 },
      { label: "Ik heb een goede accountant en jurist, maar ze hebben geen ervaring met bedrijfsoverdrachten", value: "3", score: 3 },
      { label: "Ik heb adviseurs die ervaring hebben met overdrachten, maar het team is nog niet compleet", value: "5", score: 5 },
      { label: "Ik heb een compleet team (procesbegeleider, accountant, fiscalist, M&A-adviseur) dat ervaring heeft met overdrachten", value: "6", score: 6 },
    ],
  },
  {
    id: 20,
    category: "owner",
    format: "likert",
    question: "Ik voel dat het nu tijd is om concrete stappen te zetten richting de toekomst van mijn bedrijf.",
    options: likertOptions,
  },
];

// ---------------------------------------------------------------------------
// Alle vragen samengevoegd (diagnostisch eerst, snapshot laatst)
// ---------------------------------------------------------------------------

export const allQuestions: DiagnoseQuestion[] = [
  ...attractivenessQuestions,
  ...readinessQuestions,
  ...ownerQuestions,
  ...snapshotQuestions,
];

export const TOTAL_QUESTIONS = allQuestions.length;
export const SNAPSHOT_COUNT = snapshotQuestions.length;

// ---------------------------------------------------------------------------
// Score helpers
// ---------------------------------------------------------------------------

export function getScoreLevel(percentage: number): ScoreLevel {
  if (percentage <= 40) return "orientation";
  if (percentage <= 65) return "foundation";
  if (percentage <= 82) return "good";
  return "ready";
}

export const scoreLevelConfig: Record<ScoreLevel, { label: string; color: string; description: string }> = {
  orientation: {
    label: "Oriëntatiefase",
    color: "hsl(0, 70%, 55%)",
    description:
      "De basis voor een overdraagbaar bedrijf is nog beperkt ontwikkeld. Een verkoopproces zou momenteel waarschijnlijk leiden tot een lage waardering of beperkte interesse van kopers. Dit is het moment om grip te krijgen op inzicht, overzicht en structuur.",
  },
  foundation: {
    label: "Verbeterfase",
    color: "hsl(35, 85%, 55%)",
    description:
      "Er zijn duidelijke fundamenten aanwezig, maar meerdere factoren beperken de aantrekkelijkheid of verkoopbaarheid van je bedrijf. Gerichte verbeteringen kunnen de waarde en verkoopbaarheid significant verhogen.",
  },
  good: {
    label: "Sterke basis",
    color: "hsl(45, 90%, 50%)",
    description:
      "Het bedrijf heeft een solide fundament en meerdere kenmerken die aantrekkelijk zijn voor kopers of investeerders. Met gerichte verbeteringen van de zwakste onderdelen ben je goed op weg, met een solide uitgangspositie.",
  },
  ready: {
    label: "Verkoopklaar",
    color: "hsl(160, 60%, 40%)",
    description:
      "Je bedrijf heeft de kenmerken van een goed overdraagbare onderneming. Zorg dat je ook persoonlijk klaar bent voor de volgende stap, dat is vaak waar het verschil wordt gemaakt.",
  },
};

export const dimensionLabels: Record<Exclude<QuestionCategory, "snapshot">, string> = {
  attractiveness: "Aantrekkelijkheid van het Bedrijf",
  readiness: "Verkoopklaarheid van het Bedrijf",
  owner: "Verkoopklaarheid van de Ondernemer",
};

// ---------------------------------------------------------------------------
// Score calculation
// ---------------------------------------------------------------------------

export interface DiagnoseScores {
  attractiveness: number; // 0–100
  readiness: number; // 0–100
  owner: number; // 0–100
  overall: number; // 0–100 (gemiddelde)
}

export function calculateScores(answers: Record<number, string>): DiagnoseScores {
  const calcDimension = (ids: number[]) => {
    let total = 0;
    for (const id of ids) {
      total += parseInt(answers[id] || "1", 10);
    }
    return Math.round((total / (ids.length * 6)) * 100);
  };

  const attractiveness = calcDimension([6, 7, 8, 9, 10]);
  const readiness = calcDimension([11, 12, 13, 14, 15]);
  const owner = calcDimension([16, 17, 18, 19, 20]);
  const overall = Math.round((attractiveness + readiness + owner) / 3);

  return { attractiveness, readiness, owner, overall };
}

// ---------------------------------------------------------------------------
// Snapshot data extractie
// ---------------------------------------------------------------------------

export interface SnapshotData {
  revenueBand: string;
  profitability: string;
  exitHorizon: string;
}

export function extractSnapshot(answers: Record<number, string>): SnapshotData {
  return {
    revenueBand: answers[1] || "",
    profitability: answers[2] || "",
    exitHorizon: answers[3] || "",
  };
}

// ---------------------------------------------------------------------------
// Inzicht: laagst scorende dimensie
// ---------------------------------------------------------------------------

export function getLowestDimensionInsight(scores: DiagnoseScores): string {
  const dims = [
    { key: "attractiveness", score: scores.attractiveness },
    { key: "readiness", score: scores.readiness },
    { key: "owner", score: scores.owner },
  ] as const;

  const lowest = dims.reduce((a, b) => (a.score <= b.score ? a : b));

  const insights: Record<string, string> = {
    attractiveness:
      "Een lage score op aantrekkelijkheid betekent dat kopers waarschijnlijk een risico-opslag hanteren — of afhaken. De grootste hefbomen zijn omzetpredictabiliteit, klantspreiding en het verminderen van jouw persoonlijke rol in het bedrijf.",
    readiness:
      "Verkoopklaarheid bepaalt hoe soepel een due diligence verloopt. Een laag scorende ondernemer loopt het risico op prijsdruk of een afgebroken deal. Prioriteit: financiële transparantie, contractbeheer en procesvastlegging.",
    owner:
      "De grootste dealkillers zitten niet altijd in het bedrijf — maar in de ondernemer zelf. Zonder helder persoonlijk plan, financieel doelbeeld en emotionele gereedheid vergroot je de kans op een suboptimale beslissing op het verkeerde moment.",
  };

  return insights[lowest.key];
}

// ---------------------------------------------------------------------------
// Tips matrix: 3 dimensies × 4 niveaus × 3 tips
// ---------------------------------------------------------------------------

export const tipsByDimension: Record<Exclude<QuestionCategory, "snapshot">, Record<ScoreLevel, string[]>> = {
  attractiveness: {
    orientation: [
      "Breng in kaart hoe stabiel je omzet en winst zijn over de afgelopen drie jaar — schommelingen zijn voor een koper altijd een signaal van risico.",
      "Analyseer je klantspreiding: als één klant meer dan 20% van je omzet vertegenwoordigt, is dat een kwetsbaarheid die kopers direct zullen benoemen.",
      "Inventariseer hoeveel van je omzet 'zeker' is aan het begin van een jaar — terugkerende contracten of abonnementen verhogen de waarde van je bedrijf aanzienlijk.",
    ],
    foundation: [
      "Werk aan langere contracten en raamovereenkomsten met je belangrijkste klanten — dit maakt je omzet voorspelbaarder én aantrekkelijker voor een koper.",
      "Benoem expliciet wat jouw bedrijf onderscheidt van concurrenten en waarom klanten niet gemakkelijk overstappen — dit is de kern van je verkoopverhaal.",
      "Begin verantwoordelijkheden formeel te beleggen bij je management: een bedrijf dat zonder jou draait is structureel meer waard.",
    ],
    good: [
      "Test de zelfstandigheid van je bedrijf door bewust afstand te nemen en te observeren wat er wél en niet goed gaat zonder jouw directe betrokkenheid.",
      "Documenteer je concurrentievoordelen expliciet — een koper wil begrijpen waarom jouw marktpositie duurzaam is en niet eenvoudig te kopiëren.",
      "Optimaliseer contracten richting langere looptijden en automatische verlengingen — dit verhoogt de kwaliteit van je omzet in de ogen van een koper.",
    ],
    ready: [
      "Laat een onafhankelijke waardebepaling uitvoeren zodat je weet wat je bedrijf waard is en wat je uitgangspositie is in onderhandelingen.",
      "Laat een externe partij de continuïteit en zelfstandigheid van je bedrijf valideren — dit versterkt je positie richting kopers aanzienlijk.",
      "Documenteer je groeistrategie en marktpotentieel als onderdeel van je verkoopverhaal: kopers kopen de toekomst, niet het verleden.",
    ],
  },
  readiness: {
    orientation: [
      "Laat je jaarrekeningen van de afgelopen drie jaar normaliseren door je accountant — dit is de eerste stap naar financiële transparantie voor een externe partij.",
      "Maak een overzicht van alle lopende contracten met klanten, leveranciers en personeel en check of deze overdraagbaar zijn zonder jouw persoonlijke handtekening.",
      "Begin met het beschrijven van je belangrijkste bedrijfsprocessen: wie doet wat, hoe, en wat zijn de stappen die alleen jij nu nog kent?",
    ],
    foundation: [
      "Voer maandelijkse managementrapportages in met de belangrijkste financiële en operationele KPI's — zodat prestaties leesbaar zijn zonder jouw toelichting.",
      "Zorg dat alle contracten op naam van de BV staan en niet afhankelijk zijn van jouw persoonlijke relatie of aanwezigheid.",
      "Stel een groeiplan op voor de komende 3–5 jaar — niet alleen voor jezelf, maar als document dat je aan een geïnteresseerde partij kunt overhandigen.",
    ],
    good: [
      "Laat je fiscalist en jurist de holdingstructuur beoordelen: is deze optimaal ingericht voor een toekomstige overdracht?",
      "Bereid een vendor due diligence voor om het verkoopproces later te versnellen en onaangename verrassingen tijdens onderhandelingen te voorkomen.",
      "Inventariseer of intellectueel eigendom, merkrechten of licenties goed geregistreerd en overdraagbaar zijn.",
    ],
    ready: [
      "Richt een digitale dataroom in met alle relevante documenten gestructureerd beschikbaar — dit is de eerste indruk die een koper van je organisatie krijgt.",
      "Bepaal samen met je adviseurs welke transactiestructuur fiscaal en juridisch het meest gunstig is voor jouw specifieke situatie.",
      "Stel een informatiememorandum op dat je bedrijf helder en aantrekkelijk presenteert — dit is je visitekaartje richting serieuze kopers.",
    ],
  },
  owner: {
    orientation: [
      "Stel jezelf de vraag: welk bedrag heb ik nodig om na verkoop financieel onafhankelijk te zijn? Dit getal is het vertrekpunt van alles wat volgt.",
      "Denk na over wie je bent als je niet langer ondernemer bent — veel DGA's onderschatten hoe groot die vraag is totdat het moment er is.",
      "Bedenk of je huidige adviseurs de kennis en ervaring hebben om je door een overdrachtsproces te begeleiden — en of je dat team eventueel moet aanvullen.",
    ],
    foundation: [
      "Schakel een financieel planner in die een persoonlijke vermogensprognose maakt op basis van jouw levensstijl en doelen na verkoop.",
      "Bespreek je overdrachtsplannen met je partner of naaste familie — hun verwachtingen en steun zijn bepalend voor hoe je dit proces doorloopt.",
      "Verken wat je na de overdracht wilt doen: een concrete invulling vermindert de emotionele weerstand tegen loslaten.",
    ],
    good: [
      "Stel samen met je adviseurs een realistisch tijdpad op voor het overdrachtsproces — een goede voorbereiding duurt gemiddeld twee tot vier jaar.",
      "Zorg dat je adviesteam compleet is: accountant, fiscalist, M&A-adviseur en eventueel een persoonlijk coach die je begeleidt in het proces.",
      "Draag bewust en stapsgewijs verantwoordelijkheden over aan je team — dit maakt je bedrijf sterker én maakt het loslaten voor jou makkelijker.",
    ],
    ready: [
      "Bespreek met je adviseurs de optimale timing: marktomstandigheden, je persoonlijke situatie en de staat van je bedrijf bepalen samen het juiste moment.",
      "Realiseer je dat due diligence intensief is — kopers kijken overal in. Een goede voorbereiding beschermt je prijs én je energie tijdens het proces.",
      "Maak heldere afspraken over jouw rol in de transitieperiode na overdracht: hoelang blijf je betrokken, in welke hoedanigheid, en wat heb je daarvoor nodig?",
    ],
  },
};

// ---------------------------------------------------------------------------
// Section intros (voor UI-weergave bij categorie-overgangen)
// ---------------------------------------------------------------------------

export const sectionIntros: Record<string, { title: string; intro: string }> = {
  attractiveness: {
    title: "Bedrijfsaantrekkelijkheid",
    intro: "De volgende stellingen gaan over hoe aantrekkelijk uw bedrijf is vanuit het perspectief van een potentiële koper.",
  },
  readiness: {
    title: "Verkoopklaarheid Bedrijf",
    intro: "Nu kijken we naar de operationele kant: is uw bedrijf klaar om overgedragen te worden?",
  },
  owner: {
    title: "Verkoopklaarheid Ondernemer",
    intro: "Tot slot: uw persoonlijke gereedheid. Dit is het onderdeel dat ondernemers het vaakst onderschatten — en dat het vaakst tot een afgeblazen deal leidt.",
  },
  snapshot: {
    title: "Achtergrondvragen",
    intro: "Om uw rapport zo relevant mogelijk te maken, nog een paar korte achtergrondvragen.",
  },
};
