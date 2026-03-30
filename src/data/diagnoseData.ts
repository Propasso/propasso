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
}

// ---------------------------------------------------------------------------
// Snapshot vragen (Q1–Q5) — niet gescoord
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
    question: "Hoeveel medewerkers heeft het bedrijf?",
    options: [
      { label: "1 – 10", value: "1–10" },
      { label: "10 – 25", value: "10–25" },
      { label: "25 – 50", value: "25–50" },
      { label: "50 – 100", value: "50–100" },
      { label: "100+", value: "100+" },
    ],
  },
  {
    id: 3,
    category: "snapshot",
    question: "Wat is je rol in het bedrijf?",
    options: [
      { label: "Ondernemer (DGA, groot-aandeelhouder)", value: "Ondernemer (DGA, groot-aandeelhouder)" },
      { label: "Ondernemer (mede-aandeelhouder)", value: "Ondernemer (mede-aandeelhouder)" },
      { label: "Directie / management (niet aandeelhouder)", value: "Directie/management" },
      { label: "Non-executive / adviseur", value: "Non-executive/adviseur" },
    ],
  },
  {
    id: 4,
    category: "snapshot",
    question: "Hoe winstgevend is het bedrijf momenteel?",
    options: [
      { label: "Verlieslatend", value: "Verlieslatend" },
      { label: "Break-even", value: "Break-even" },
      { label: "Lage winst", value: "Lage winst" },
      { label: "Gezonde winst", value: "Gezonde winst" },
      { label: "Zeer winstgevend", value: "Zeer winstgevend" },
    ],
  },
  {
    id: 5,
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
// Likert schaal (gedeeld door alle diagnostische vragen)
// ---------------------------------------------------------------------------

const likertOptions: DiagnoseOption[] = [
  { label: "Zeer zwak / niet aanwezig", value: "1", score: 1 },
  { label: "Onderontwikkeld", value: "2", score: 2 },
  { label: "Net niet voldoende", value: "3", score: 3 },
  { label: "Redelijk ontwikkeld", value: "4", score: 4 },
  { label: "Goed ontwikkeld", value: "5", score: 5 },
  { label: "Best practice / zeer sterk", value: "6", score: 6 },
];

// ---------------------------------------------------------------------------
// Dimensie 1: Aantrekkelijkheid van het Bedrijf (Q6–Q10)
// ---------------------------------------------------------------------------

const attractivenessQuestions: DiagnoseQuestion[] = [
  {
    id: 6,
    category: "attractiveness",
    question: "Hoe voorspelbaar en stabiel zijn de omzet en winst van je bedrijf?",
    options: likertOptions,
  },
  {
    id: 7,
    category: "attractiveness",
    question: "Hoe goed is het klantenbestand gespreid (zonder afhankelijkheid van enkele klanten)?",
    options: likertOptions,
  },
  {
    id: 8,
    category: "attractiveness",
    question: "Welk deel van de jaaromzet komt uit terugkerende contracten of abonnementen?",
    options: likertOptions,
  },
  {
    id: 9,
    category: "attractiveness",
    question: "Hoe zelfstandig kan het bedrijf opereren zonder jouw dagelijkse betrokkenheid?",
    options: likertOptions,
  },
  {
    id: 10,
    category: "attractiveness",
    question: "Hoe sterk is de marktpositie en het onderscheidend vermogen van je bedrijf en je belangrijkste productgroep?",
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
    question: "Hoe professioneel en inzichtelijk zijn de stuurinformatie en (financiële) rapportages voor een externe partij?",
    options: likertOptions,
  },
  {
    id: 12,
    category: "readiness",
    question: "Hoe goed zijn contracten met klanten, leveranciers en personeel vastgelegd en overdraagbaar?",
    options: likertOptions,
  },
  {
    id: 13,
    category: "readiness",
    question: "Hoe goed zijn processen, systemen en werkwijzen gedocumenteerd en geborgd in de organisatie?",
    options: likertOptions,
  },
  {
    id: 14,
    category: "readiness",
    question: "Hoe goed is de juridische en fiscale structuur van je bedrijf ingericht voor een toekomstige overdracht?",
    options: likertOptions,
  },
  {
    id: 15,
    category: "readiness",
    question: "Hoe concreet en communiceerbaar is het groeiplan van je bedrijf voor een potentiële koper?",
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
    question: "Hoe helder heb jij in beeld welk vermogen je nodig hebt om financieel onafhankelijk te zijn na verkoop?",
    options: likertOptions,
  },
  {
    id: 17,
    category: "owner",
    question: "Hoe concreet is jouw persoonlijke plan voor de periode na verkoop van je bedrijf?",
    options: likertOptions,
  },
  {
    id: 18,
    category: "owner",
    question: "Hoe actief werk jij eraan om je bedrijf onafhankelijk van jou te laten draaien?",
    options: likertOptions,
  },
  {
    id: 19,
    category: "owner",
    question: "Hoe goed ben je omringd door adviseurs die je kunnen begeleiden bij een toekomstige bedrijfsoverdracht?",
    options: likertOptions,
  },
  {
    id: 20,
    category: "owner",
    question: "Hoe urgent voelt het voor jou om nu concrete stappen te zetten richting een exitstrategie?",
    options: likertOptions,
  },
];

// ---------------------------------------------------------------------------
// Alle vragen samengevoegd
// ---------------------------------------------------------------------------

export const allQuestions: DiagnoseQuestion[] = [
  ...snapshotQuestions,
  ...attractivenessQuestions,
  ...readinessQuestions,
  ...ownerQuestions,
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
  employeeBand: string;
  roleType: string;
  profitability: string;
  exitHorizon: string;
}

export function extractSnapshot(answers: Record<number, string>): SnapshotData {
  return {
    revenueBand: answers[1] || "",
    employeeBand: answers[2] || "",
    roleType: answers[3] || "",
    profitability: answers[4] || "",
    exitHorizon: answers[5] || "",
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
