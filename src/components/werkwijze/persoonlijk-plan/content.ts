/**
 * Teksten voor /werkwijze/persoonlijk-plan-opstellen ("Bedrijf verkocht, en dan?").
 * Bron: webteksten v05 van Propasso Content (20 nov 2026) en de teksten die Karel zelf op deze branch
 * heeft aangepast (hero, meta, kop en intro van het verliesblok); die zijn leidend.
 * Opbouw in zes blokken (besluit Karel 20 nov 2026): hero, verlies, Karel, het plan, wat gaan we doen, slot.
 * Teksten niet zelf herschrijven: wijzigingen lopen via Karel of Propasso Content.
 * Lege velden met [ERVARING KAREL] of [KAREL VULT AAN] tonen in de preview een zichtbare placeholder.
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
    "Het persoonlijke plan met jouw visie en doelen voor de fase na de verkoop is een van de belangrijkste onderdelen in het verkoopklaar maken van bedrijf en ondernemer.",
  note: "Een kennismaking duurt een uur, een richtinggevend gesprek zonder verplichtingen.",
};

export const meta = {
  title: "Bedrijf verkocht, en dan?",
  description:
    "Je bedrijf is verkocht, en nu? Wat verandert zodra je bedrijf is verkocht, en hoe je je met een persoonlijk plan voorbereidt op de fase na de verkoop van je bedrijf.",
  ogTitle: "Bedrijf verkocht, en dan?",
  ogDescription:
    "Het persoonlijke plan met jouw visie en doelen voor de fase na de verkoop is een van de belangrijkste onderdelen in het verkoopklaar maken van bedrijf en ondernemer.",
  breadcrumb: "Je persoonlijke plan",
  altKarel: "Karel Cremers, oprichter van Propasso",
};

export const loss = {
  eyebrow: "Het zwarte gat",
  title: "Je bedrijf was altijd je identiteit",
  intro:
    "Zodra de bedrijfsverkoop is afgerond, is je bedrijf niet meer van jou. En dan is je agenda leeg.",
  figureDescription: "Weekagenda van een ondernemer met zestien afspraken, die na de overdracht leeg is.",
  emptyWeek: "Maandag, de week na de overdracht.",
  secondLayer: {
    title: "Die agenda vormde jouw ondernemersidentiteit",
    text: "Ondernemers die hun bedrijf hebben verkocht, ervaren een verlies van de impliciete beloningsstructuur: jij was de leider en degene naar wie opgekeken werd. Niemand zegt hardop dat hij dat gaat missen.",
    labels: ["Aanzien", "Status", "Verantwoordelijkheid", "Erkenning", "Invloed en Macht"],
  },
};

/** Blok 3: Karel. Ervaring uit eerste hand en de brug van verlies naar plan. */
export const karel = {
  eyebrow: "Het proces en het zwarte gat",
  title: "Toen ik zelf middenin de bedrijfsoverdracht zat",
  caption:
    "Ik verkocht eind 2024 een groot deel van het bedrijf Worxx, een uitzendbureau in de bouw met 130 medewerkers, via een management-buy-out.",
  paragraphs: [
    "Een veelvoorkomende reden dat de verkoop niet doorgaat, is omdat de ondernemer zich terugtrekt: omdat hij de reden om te verkopen onvoldoende duidelijk heeft, of omdat hij geen plan voorzichzelf heeft en koudwatervrees krijgt. Hoe dichterbij het komt, hoe zwaarder dat weegt.",
    "Een verkoper die niet weet wat hij daarna gaat doen, of zijn persoonlijke en financiële zaken niet op orde heeft, vormt een risico voor het proces.",
  ],
  /** Citaat Karel bovenaan blok 3: eigen twijfel in de aanloop naar de verkoop (tekst Karel, 20 nov). */
  own: "Zelf heb ik in het proces en de aanloop er naartoe getwijfeld of de stap die ik aan het nemen was, de juiste was. Ook of de dealstructuur wel de juiste was. Toen ik herhaalde en opschreef wat mijn positie, drijfveren, professionele doelen en mijn persoonlijke visie op de toekomst waren, had ik mijn 'eureka'-moment. Maar eerlijkheidshalve heb ik de tijd na de verkoop en de mate waarin ik me identificeerde met het bedrijf onderschat. ",
  pullQuote: "Het persoonlijke plan en de invulling van het leven na de verkoop bepaalt of je straks met vertrouwen de toekomst tegemoet gaat.",
};

/** Blok 4: het persoonlijke plan als route in drie stappen: A visie, B plan, C ritme (feedback Karel 20 nov). */
export const route = { a: "Visie", b: "Plan", c: "Ritme" };

export const plan = {
  eyebrow: "Het persoonlijke plan",
  title: "Wat is een persoonlijk plan?",
  paragraphs: [
    "Een persoonlijk plan is een visie en een actieplan voor je leven buiten je bedrijf: hoe je wilt dat je leven er na de verkoop uitziet, wat je wilt gaan doen, wat je daar nu al voor regelt en of het financieel haalbaar is.",
    "Een bucketlist is dat niet. Die sportauto en meer tijd op de golfbaan ook niet. Een plan geeft je richting, een nieuwe invulling en zingeving. Ook helpt het om thuis isolement en verveling te voorkomen.",
  ],
  questions: {
    title: "Begin thuis, aan de keukentafel met je partner, met vier vragen",
    cards: [
      { label: "Zingeving", text: "Waar haal ik mijn inspiratie vandaan? Wie ben ik, los van mijn bedrijf?" },
      { label: "Bezittingen", text: "Wat wil ik nog hebben, en wat heb ik niet meer nodig? Hoeveel heb ik echt nodig om rond te komen?" },
      { label: "Belevingen", text: "Welke ervaringen in mijn leven koester ik het meest? Wat wil ik nog meemaken?" },
      { label: "Mensen", text: "Met wie wil ik meer tijd doorbrengen? En met wie eigenlijk minder?" },
    ],
    /** Uitkomst van subblok A (route visie, plan, ritme). */
    outcome: "Samen vormen ze jouw visie.",
    /** Citaat Karel naast de vier vragen (tekst Karel, 20 nov). */
    quote: "Belevingen zaten voor mij veel meer in de kleine dingen, zoals ontbijten met de kinderen. Mijn voornaamste motivatie zat bij zingegeving: ik had nog andere professionele ambities buiten het bedrijf.",
    microcopy: "Bespreek ze met je partner.",
  },
  parts: {
    title: "Twee onderdelen, en wie ze maakt",
    highlightLabel: "Samen",
    subLabel: "Hieronder valt ook",
    /** Twee hoofdonderdelen; onder het financiële plan vallen vermogens- en estate planning en testament. */
    main: [
      { title: "Persoonlijke visie & plan", text: "Hoe beeld je het leven na de verkoop in? Je wensen en behoeften, op papier.", who: "Ondernemer & Propasso", together: true },
      {
        title: "Persoonlijk financieel plan",
        text: "Scan van de benodigde inkomsten uit verkoopopbrengst en andere inkomstenstromen om je levensstijl te voldoen?",
        who: "Financieel planner",
        sub: [
          { title: "Vermogens- en estate planning", text: "Hoe is je vermogen ondergebracht, en wat gebeurt ermee na je overlijden?", who: "Estate planner, fiscalist en notaris" },
          { title: "Testament", text: "Wie krijgt wat, en wie beslist als jij het zelf niet meer kunt?", who: "Notaris" },
        ],
      },
    ],
    after: "Het persoonlijke en persoonlijke financiele plan komen eerst: zonder visie en doel weten je financieel planner en andere specialisten niet waarvoor zij plannen.",
  },
};

/** Blok 5: wat gaan we doen? Drie fasen in gewone taal, zonder fasenamen (briefing 4.1). */
export const approach = {
  eyebrow: "Wat gaan we doen?",
  title: "Van eerste schets tot de dag dat je tekent",
  intro:
    "Bij een verkoop moeten drie verhalen kloppen: dat van de ondernemer, de onderneming en de cijfers. Je persoonlijke plan is het verhaal van de ondernemer. We werken eraan op dezelfde manier als aan je bedrijf.",
  steps: [
    { number: "1", title: "Waar sta je, wat wil je?", text: "Een persoonlijke nulmeting en risicocheck. Daaruit volgen je persoonlijke plan en je persoonlijke financiële plan, besproken met je partner." },
    { number: "2", title: "Aan de slag met kwartaaldoelen", text: "Je acties staan in je kwartaaldoelen, naast die voor je bedrijf. Regelmatig kijken we waar je staat en stellen we bij." },
    { number: "3", title: "Klaar voor de exit?", text: "Bij elke check-in toetsen we kort dezelfde vraag: ben je persoonlijk klaar voor de exit? Zo weet je het als het moment er is." },
  ],
  /** Labels van de cyclus: stap 1 eenmalig, stap 2 en 3 als lus per kwartaal, daarna de verkoop. */
  cycle: {
    once: "Eenmalig · A en B",
    loop: "Elk kwartaal",
    notYet: "Nog niet: terug naar stap 2",
    yes: "Ja",
    endTitle: "De verkoop",
    endText: "Tijd om de juiste verkooppartij te kiezen.",
  },
  /** Ritme en wat je na de eerste fase op papier hebt (tekst Karel, 20 nov). */
  practical: "Voor je bedrijf is er een vierwekelijks ritme voor de kwartaaldoelen, en elke twee weken is er een check-in met de kartrekkers van deelprojecten. De sessie omtrent je persoonlijke plan lopen parallel, maar in een lagere frequentie; om de twee à drie maanden. Het traject begint met een persoonlijke vragenlijst, wat de basis vormt van het plan? Een plan voor daarna heb je niet na één week, dat groeit per sessie. Elke keer ga je naar huis met een kleine stap: een persoonlijk doel, een taak die je overdraagt, wat meer afstand van de zaak, of je privésituatie op papier.",
  timeline: {
    question: "In welk jaar wil je je bedrijf verkopen?",
    laterLabel: "Later",
    youAreHere: "Hier sta jij",
    moments: [
      { label: "3 tot 5 jaar vooraf", title: "Een eerste schets", text: "Je schetst je visie op het volgende hoofdstuk en bespreekt hem thuis. Je stelt doelen voor nu en voor na de verkoop. Richting je pensioen? Begin dan tot tien jaar vooraf." },
      { label: "1 tot 2 jaar vooraf", title: "Uitschrijven en concreet maken", text: "Je weet inmiddels wat realistisch is. Je schrijft je nieuwe invulling uit en maakt je doelen concreet voor de eerste vijf jaar na de verkoop." },
      { label: "De verkoop", title: "Je tekent", text: "Met een plan voor daarna, dat je thuis hebt besproken." },
      { label: "Daarna", title: "De volgende fase", text: "Je eerste vijf jaar, met doelen die je zelf hebt gekozen." },
    ],
    cta: "Plan een kennismaking",
    outcomes: {
      within1: {
        title: "Binnen een jaar: je plan voor daarna krijgt nu voorrang",
        text: "Het verkoopproces vraagt nu je aandacht, en daar hoort een M&A-adviseur bij. Zet juist nu op papier wat je daarna gaat doen. Wie weet waar hij naartoe gaat, blijft rustiger aan tafel als het spannend wordt.",
        actions: ["Schrijf op hoe je eerste jaar na de verkoop eruit moet zien", "Bespreek met je partner wat er thuis verandert", "Vraag je notaris of je testament en levenstestament nog kloppen"],
        moment: 2,
      },
      y1to2: {
        title: "Over 1 tot 2 jaar: tijd om je plan uit te schrijven",
        text: "Dit zijn de jaren waarin je visie concreet wordt. Je weet wat realistisch is en schrijft uit wat je in de eerste vijf jaar na de verkoop wilt bereiken. Ook de gesprekken met je notaris en financieel planner horen nu op de agenda.",
        actions: ["Schrijf je doelen uit voor de eerste vijf jaar na de verkoop", "Laat een financieel planner doorrekenen of je plan haalbaar is", "Plan het gesprek met je notaris over testament en levenstestament"],
        moment: 1,
      },
      y3to5: {
        title: "Over 3 tot 5 jaar: het goede moment om te beginnen",
        text: "Je hebt de tijd om een visie te schetsen, hem thuis te bespreken en er rustig aan te werken, naast het verkoopklaar maken van je bedrijf. Wat je nu begint, is bij de verkoop een plan dat je kent en vertrouwt.",
        actions: ["Beantwoord de vier vragen en bespreek ze met je partner", "Kies een paar doelen voor nu en een paar voor na de verkoop", "Zet de eerste acties in je kwartaaldoelen, naast die voor je bedrijf"],
        moment: 0,
      },
      y6to10: {
        title: "Over 6 tot 10 jaar: vroeg, en dat is een voordeel",
        text: "Valt je verkoop samen met je pensioen, dan kun je nu rustig beginnen. Je hoeft nog niets vast te leggen. Ontdek waar je energie van krijgt, en kijk wat er geregeld is als er onverwacht iets gebeurt.",
        actions: ["Kijk welke interesses naast je bedrijf je weer wilt oppakken", "Loop de vijf onvoorziene gebeurtenissen na: wat is er geregeld?", "Bespreek met je partner hoe jullie de jaren na de verkoop zien"],
        moment: -1,
      },
      over10: {
        title: "Over meer dan tien jaar: begin bij wat er nu geregeld is",
        text: "Je verkoop ligt nog ver weg, maar als jou morgen iets overkomt, staan je bedrijf en je gezin er nu al voor. Begin daarom bij de persoonlijke risico's en bij de balans in je leven van nu. Het plan voor daarna volgt later.",
        actions: ["Vraag je notaris of je testament en levenstestament nog kloppen", "Bespreek met je adviseurs wie in het bedrijf beslist als jij uitvalt", "Kijk waar de balans tussen je werk en je leven thuis beter kan"],
        moment: -1,
      },
    },
  },
  /** Label en knop bij het klantvoorbeeld. */
  exampleLabel: "Uit de praktijk",
  exampleCta: "Plan een kennismaking",
  /** Anoniem klantvoorbeeld (tekst Karel, 20 nov). */
  example: "Een ondernemer zei in de kennismaking volmondig ja op mijn vaste vraag: 'als we jouw situatie oplossen, wil je dan nog steeds verkopen?' Hij was elke dag als eerste op de zaak en als laatste naar huis. Zijn loyaliteit aan de zaak won het steeds van thuis, en hij had het al zo vaak geprobeerd, maar zag geen andere oplossing dan verkoop. In zijn persoonlijke plan hebben we duidelijke doelen gesteld voor nadat het bedrijf verkocht werd. Daardoor zag hij in dat bepaalde onderdelen nu al effect konden hebben. We hebben zijn management geherstructureerd, hij is gaan sporten (bewust onder kantoortijd) en dichter bij zijn persoonlijke ambities gekomen. Uiteindelijk leidde het ertoe dat de wens om te verkopen van tafel ging.",
};

/** Blok 6: slot. */
export const closing = {
  /** Vaste knop onderin op mobiel. */
  stickyLabel: "Plan een kennismaking",
  title: "Over drie jaar wil je je bedrijf overdragen. Weet je al wat je daarna gaat doen?",
  text: "In een kennismaking van een uur gaat het eerst over jou: waarom je wilt verkopen, wat je daarna wilt en hoe klaar je daar nu voor bent, met je bedrijf en met jezelf.",
  primaryLabel: "Plan een kennismaking",
  secondaryLabel: "Ontdek jouw score",
  readMoreTitle: "Verder lezen",
  readMore: [
    { label: "Bedrijf verkopen, en dan? Zo bereid je je voor", href: "/kennisbank/het-leven-na-de-verkoop-van-je-bedrijf" },
    { label: "Alle artikelen over het leven na de verkoop", href: "/kennisbank/thema/bedrijf-verkocht-en-dan" },
  ],
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
  { day: "ma", start: "14:00", minutes: 45, title: "Gesprek met de bank", loss: "identiteit" },
  { day: "di", start: "08:00", minutes: 75, title: "Rondje over de werkvloer", loss: "mensen" },
  { day: "di", start: "11:00", minutes: 30, title: "Spoedoverleg levering", loss: "zingeving" },
  { day: "di", start: "15:00", minutes: 45, title: "Sollicitatiegesprek", loss: "zingeving" },
  { day: "wo", start: "07:30", minutes: 75, title: "Planning van de week", loss: "ritme" },
  { day: "wo", start: "12:30", minutes: 90, title: "Lunch ondernemersclub", loss: "identiteit" },
  { day: "wo", start: "16:00", minutes: 60, title: "Kwartaalcijfers", loss: "bereiken" },
  { day: "do", start: "08:30", minutes: 75, title: "Productieoverleg", loss: "ritme" },
  { day: "do", start: "11:00", minutes: 30, title: "Klant: contract tekenen", loss: "bereiken" },
  { day: "do", start: "13:30", minutes: 75, title: "Vraag van de werkplaats", loss: "zingeving" },
  { day: "do", start: "16:00", minutes: 90, title: "Jubileum 25 jaar Ton", loss: "mensen" },
  { day: "vr", start: "09:00", minutes: 90, title: "Strategie met het MT", loss: "identiteit" },
  { day: "vr", start: "13:00", minutes: 75, title: "Bestuur brancheclub", loss: "identiteit" },
  { day: "vr", start: "16:30", minutes: 120, title: "Vrijdagmiddagborrel", loss: "mensen" },
];
