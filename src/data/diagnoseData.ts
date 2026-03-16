// Exit Readiness Diagnose — Question & Scoring Data

export type QuestionCategory = 'snapshot' | 'attractiveness' | 'readiness' | 'owner';
export type ScoreLevel = 'orientation' | 'foundation' | 'good' | 'ready';

export interface DiagnoseOption {
  label: string;
  value: string;
  score?: number; // 1–6 for diagnostic questions
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
    category: 'snapshot',
    question: 'Wat is de jaarlijkse omzet van uw bedrijf?',
    options: [
      { label: '< €1 miljoen', value: '< €1 mln' },
      { label: '€1 – €3 miljoen', value: '€1–3 mln' },
      { label: '€3 – €10 miljoen', value: '€3–10 mln' },
      { label: '€10 – €25 miljoen', value: '€10–25 mln' },
      { label: '€25 – €50 miljoen', value: '€25–50 mln' },
      { label: '> €50 miljoen', value: '> €50 mln' },
    ],
  },
  {
    id: 2,
    category: 'snapshot',
    question: 'Hoeveel medewerkers heeft uw bedrijf?',
    options: [
      { label: '1 – 10', value: '1–10' },
      { label: '10 – 25', value: '10–25' },
      { label: '25 – 50', value: '25–50' },
      { label: '50 – 100', value: '50–100' },
      { label: '100+', value: '100+' },
    ],
  },
  {
    id: 3,
    category: 'snapshot',
    question: 'Wat is uw rol in het bedrijf?',
    options: [
      { label: 'Eigenaar-ondernemer', value: 'Eigenaar-ondernemer' },
      { label: 'Aandeelhouder (niet-operationeel)', value: 'Aandeelhouder' },
      { label: 'Directie / management', value: 'Directie/management' },
      { label: 'Non-executive / adviseur', value: 'Non-executive/adviseur' },
    ],
  },
  {
    id: 4,
    category: 'snapshot',
    question: 'Hoe winstgevend is het bedrijf momenteel?',
    options: [
      { label: 'Verlieslatend', value: 'Verlieslatend' },
      { label: 'Break-even', value: 'Break-even' },
      { label: 'Lage winst', value: 'Lage winst' },
      { label: 'Gezonde winst', value: 'Gezonde winst' },
      { label: 'Zeer winstgevend', value: 'Zeer winstgevend' },
    ],
  },
  {
    id: 5,
    category: 'snapshot',
    question: 'Wanneer overweegt u een overdracht?',
    options: [
      { label: '0 – 2 jaar', value: '0–2 jaar' },
      { label: '3 – 5 jaar', value: '3–5 jaar' },
      { label: '5 – 10 jaar', value: '5–10 jaar' },
      { label: 'Nog niet concreet', value: 'Nog niet concreet' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Likert schaal (gedeeld door alle diagnostische vragen)
// ---------------------------------------------------------------------------

const likertOptions: DiagnoseOption[] = [
  { label: 'Zeer zwak / niet aanwezig', value: '1', score: 1 },
  { label: 'Onderontwikkeld', value: '2', score: 2 },
  { label: 'Onder gemiddeld', value: '3', score: 3 },
  { label: 'Redelijk ontwikkeld', value: '4', score: 4 },
  { label: 'Goed ontwikkeld', value: '5', score: 5 },
  { label: 'Best practice / zeer sterk', value: '6', score: 6 },
];

// ---------------------------------------------------------------------------
// Dimensie 1: Aantrekkelijkheid van het Bedrijf (Q6–Q10)
// ---------------------------------------------------------------------------

const attractivenessQuestions: DiagnoseQuestion[] = [
  {
    id: 6,
    category: 'attractiveness',
    question: 'Hoe voorspelbaar en stabiel zijn omzet en winst van uw bedrijf?',
    options: likertOptions,
  },
  {
    id: 7,
    category: 'attractiveness',
    question: 'Hoe goed is uw klantenbestand gespreid (zonder afhankelijkheid van enkele klanten)?',
    options: likertOptions,
  },
  {
    id: 8,
    category: 'attractiveness',
    question: 'In welke mate wordt uw jaaromzet gerealiseerd uit terugkerende omzet?',
    options: likertOptions,
  },
  {
    id: 9,
    category: 'attractiveness',
    question: 'Hoe zelfstandig kan het bedrijf opereren zonder uw dagelijkse betrokkenheid?',
    options: likertOptions,
  },
  {
    id: 10,
    category: 'attractiveness',
    question: 'Hoe sterk en zelfstandig is het managementteam naast u als eigenaar?',
    options: likertOptions,
  },
];

// ---------------------------------------------------------------------------
// Dimensie 2: Verkoopklaarheid van het Bedrijf (Q11–Q15)
// ---------------------------------------------------------------------------

const readinessQuestions: DiagnoseQuestion[] = [
  {
    id: 11,
    category: 'readiness',
    question: 'Hoe professioneel en inzichtelijk zijn uw financiële rapportages voor een externe partij?',
    options: likertOptions,
  },
  {
    id: 12,
    category: 'readiness',
    question: 'In hoeverre zijn contracten met klanten, leveranciers en personeel goed vastgelegd en overdraagbaar?',
    options: likertOptions,
  },
  {
    id: 13,
    category: 'readiness',
    question: 'Hoe goed zijn processen, systemen en werkwijzen vastgelegd in uw organisatie?',
    options: likertOptions,
  },
  {
    id: 14,
    category: 'readiness',
    question: 'Hoe snel kan een externe partij inzicht krijgen in de prestaties van uw bedrijf (rapportages, systemen, data)?',
    options: likertOptions,
  },
  {
    id: 15,
    category: 'readiness',
    question: 'Hoe duidelijk en uitgewerkt is de strategie en het groeiplan voor de komende 3–5 jaar?',
    options: likertOptions,
  },
];

// ---------------------------------------------------------------------------
// Dimensie 3: Verkoopklaarheid van de Ondernemer (Q16–Q20)
// ---------------------------------------------------------------------------

const ownerQuestions: DiagnoseQuestion[] = [
  {
    id: 16,
    category: 'owner',
    question: 'In hoeverre heeft u inzicht in het bedrag dat u nodig heeft om financieel onafhankelijk te zijn na een overdracht?',
    options: likertOptions,
  },
  {
    id: 17,
    category: 'owner',
    question: 'In hoeverre heeft u een concreet plan voor uw persoonlijke invulling na de verkoop van uw bedrijf?',
    options: likertOptions,
  },
  {
    id: 18,
    category: 'owner',
    question: 'In hoeverre voelt u zich emotioneel klaar om uw bedrijf los te laten?',
    options: likertOptions,
  },
  {
    id: 19,
    category: 'owner',
    question: 'In hoeverre heeft u een team van adviseurs (accountant, jurist, M&A-adviseur) dat u begeleidt bij een toekomstige overdracht?',
    options: likertOptions,
  },
  {
    id: 20,
    category: 'owner',
    question: 'In hoeverre heeft u een duidelijk tijdpad en plan van aanpak voor het overdrachtsproces?',
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
  if (percentage <= 33) return 'orientation';
  if (percentage <= 55) return 'foundation';
  if (percentage <= 75) return 'good';
  return 'ready';
}

export const scoreLevelConfig: Record<ScoreLevel, { label: string; color: string; description: string }> = {
  orientation: {
    label: 'Oriëntatiefase',
    color: 'hsl(0, 70%, 55%)',
    description: 'U staat aan het begin; er is nog veel te doen op meerdere vlakken.',
  },
  foundation: {
    label: 'Fundamenten aanwezig',
    color: 'hsl(35, 85%, 55%)',
    description: 'Er is een basis, maar er zijn concrete verbeterpunten.',
  },
  good: {
    label: 'Goed op weg',
    color: 'hsl(45, 90%, 50%)',
    description: 'Uw bedrijf en u persoonlijk zijn al behoorlijk voorbereid.',
  },
  ready: {
    label: 'Transactiegereed',
    color: 'hsl(160, 60%, 40%)',
    description: 'U bent goed gepositioneerd voor een succesvolle overdracht.',
  },
};

export const dimensionLabels: Record<Exclude<QuestionCategory, 'snapshot'>, string> = {
  attractiveness: 'Aantrekkelijkheid van het Bedrijf',
  readiness: 'Verkoopklaarheid van het Bedrijf',
  owner: 'Verkoopklaarheid van de Ondernemer',
};

// ---------------------------------------------------------------------------
// Score calculation
// ---------------------------------------------------------------------------

export interface DiagnoseScores {
  attractiveness: number; // 0–100
  readiness: number;      // 0–100
  owner: number;          // 0–100
  overall: number;        // 0–100 (average)
}

export function calculateScores(answers: Record<number, string>): DiagnoseScores {
  const calcDimension = (ids: number[]) => {
    let total = 0;
    for (const id of ids) {
      total += parseInt(answers[id] || '1', 10);
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
// Snapshot data extraction
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
    revenueBand: answers[1] || '',
    employeeBand: answers[2] || '',
    roleType: answers[3] || '',
    profitability: answers[4] || '',
    exitHorizon: answers[5] || '',
  };
}

// ---------------------------------------------------------------------------
// Insight: laagst scorende dimensie
// ---------------------------------------------------------------------------

export function getLowestDimensionInsight(scores: DiagnoseScores): string {
  const dims = [
    { key: 'attractiveness', score: scores.attractiveness },
    { key: 'readiness', score: scores.readiness },
    { key: 'owner', score: scores.owner },
  ] as const;

  const lowest = dims.reduce((a, b) => (a.score <= b.score ? a : b));

  const insights: Record<string, string> = {
    attractiveness:
      'De aantrekkelijkheid van uw bedrijf voor een koper verdient aandacht. Denk aan het verminderen van uw persoonlijke rol, het spreiden van klanten en het borgen van processen.',
    readiness:
      'Uw bedrijf is nog niet optimaal voorbereid op een transactie. Focus op financiële transparantie, contractbeheer en een helder strategisch plan.',
    owner:
      'Uw persoonlijke voorbereiding verdient aandacht. Een helder plan voor na de verkoop en inzicht in uw financiële behoefte zijn essentieel voor een goede overdracht.',
  };

  return insights[lowest.key];
}

// ---------------------------------------------------------------------------
// Tips matrix: 3 dimensies × 4 niveaus × 3 tips
// ---------------------------------------------------------------------------

export const tipsByDimension: Record<
  Exclude<QuestionCategory, 'snapshot'>,
  Record<ScoreLevel, string[]>
> = {
  attractiveness: {
    orientation: [
      'Breng in kaart welk percentage van uw omzet afhankelijk is van uw top-3 klanten. Streef naar maximaal 15% per klant.',
      'Documenteer uw persoonlijke taken en begin met het delegeren van klantrelaties aan uw team.',
      'Onderzoek mogelijkheden voor terugkerende inkomsten, zoals servicecontracten of abonnementsmodellen.',
    ],
    foundation: [
      'Werk actief aan klantspreiding door nieuwe marktsegmenten te benaderen.',
      'Investeer in een tweede managementlaag die operationele beslissingen zelfstandig kan nemen.',
      'Versterk uw concurrentiepositie door te investeren in intellectueel eigendom, merk of technologie.',
    ],
    good: [
      'Test uw bedrijfscontinuïteit door periodiek afwezig te zijn en de resultaten te monitoren.',
      'Optimaliseer uw klantcontracten met langere looptijden en automatische verlengingen.',
      "Formaliseer uw managementteam met duidelijke verantwoordelijkheden en KPI's.",
    ],
    ready: [
      'Laat een externe partij uw bedrijfscontinuïteit valideren om dit richting kopers te onderbouwen.',
      'Documenteer uw groeistrategie en marktpotentieel als verkoopargument.',
      'Overweeg een management buy-in of externe CEO om uw onafhankelijkheid verder te versterken.',
    ],
  },
  readiness: {
    orientation: [
      'Laat uw jaarrekeningen van de afgelopen drie jaar door een accountant controleren en normaliseren.',
      'Maak een inventarisatie van alle lopende contracten, vergunningen en overeenkomsten.',
      'Begin met het vastleggen van uw belangrijkste bedrijfsprocessen in een operations manual.',
    ],
    foundation: [
      "Implementeer maandelijkse managementrapportages met de belangrijkste financiële en operationele KPI's.",
      'Zorg dat alle contracten op naam van de BV staan, niet op uw persoonlijke naam.',
      'Stel een strategisch 3-jarenplan op dat u aan een potentiële koper kunt presenteren.',
    ],
    good: [
      'Laat een fiscalist de holdingstructuur beoordelen op optimale overdrachtsgereedheid.',
      'Bereid een vendor due diligence-rapport voor om het verkoopproces te versnellen.',
      'Zorg voor een clean data room met alle relevante documenten digitaal beschikbaar.',
    ],
    ready: [
      'Laat een proef-due diligence uitvoeren om eventuele verrassingen vóór te zijn.',
      'Bespreek met uw adviseur de optimale transactiestructuur (share deal vs. asset deal).',
      'Stel een information memorandum op dat uw bedrijf professioneel presenteert aan potentiële kopers.',
    ],
  },
  owner: {
    orientation: [
      'Maak een persoonlijk financieel plan: hoeveel vermogen heeft u nodig om comfortabel te leven na de verkoop?',
      'Denk na over wat u na de verkoop wilt doen — ondernemerschap, advieswerk, reizen, of iets anders.',
      'Bespreek uw overdrachtsplannen met uw partner of familie om verwachtingen af te stemmen.',
    ],
    foundation: [
      'Schakel een financieel planner in die een persoonlijke vermogensprognose kan maken.',
      'Verken concrete activiteiten voor na de overdracht: bestuursfuncties, mentoring, of een nieuw project.',
      'Begin met het opbouwen van een netwerk buiten uw huidige bedrijf.',
    ],
    good: [
      'Stel samen met een adviseur een realistisch tijdpad op voor het overdrachtsproces.',
      'Assembleer uw adviesteam: accountant, fiscalist, M&A-adviseur en eventueel een coach.',
      'Oefen met het loslaten door steeds meer verantwoordelijkheden over te dragen.',
    ],
    ready: [
      'Bespreek met uw adviseurs de optimale timing van de verkoop in relatie tot marktomstandigheden.',
      'Bereid u mentaal voor op het due diligence-proces en de emotionele impact daarvan.',
      'Maak concrete afspraken over uw rol in de transitieperiode na overdracht.',
    ],
  },
};
