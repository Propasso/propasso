import { Compass, TrendingUp, Users, ShieldCheck, ArrowRightLeft } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  id: string;
  title: string;
  description: string;
  icon: typeof Compass;
  items: FAQItem[];
}

export const faqSections: FAQSection[] = [
  {
    id: "algemeen",
    title: "Algemeen / basisbegrippen",
    description: "Wat is exit planning en hoe verschilt het van bedrijfsopvolging of verkoop?",
    icon: Compass,
    items: [
      {
        question: "Wat is het verschil tussen Exit Planning en Bedrijfsopvolging?",
        answer: `Exit Planning is het bredere traject waarmee je jouw onderneming én jezelf voorbereidt op meerdere uitkomsten: verkoop, bedrijfsopvolging (familie/MT), gedeeltelijke verkoop of volledige verkoop ('Exit')

Exit Planning is het proces voorafgaand aan bedrijfsopvolging en verkoop. Het draait om waarde verhogen, risico's verlagen en het bedrijf minder afhankelijk te maken van de ondernemer. Bedrijfsopvolging is specifiek; het gaat om de overdracht van leiding en eigendom met focus op continuïteit, governance en financierbaarheid voor de opvolger. Bedrijfsopvolging is niet enkel gericht op overdracht aan familie of werknemer/management, dit kan ook een externe partij zijn.

Met de Verkoop bedoelt met de feitelijke transactie. Hier ligt de nadruk op waardering, due diligence (boekenonderzoek), koperselectie en deal-structuur.`,
      },
    ],
  },
  {
    id: "strategie-timing",
    title: "Strategie & timing",
    description: "Wanneer begin je en welke route past bij jouw situatie?",
    icon: Compass,
    items: [
      {
        question: "Wanneer moet ik starten met de voorbereiding verkoop onderneming?",
        answer: `Er is geen 'beste' timing en het is afhankelijk waar jij en het bedrijf staat.
Echter, vaak wordt onderschat hoeveel tijd nodig is om het bedrijf en jezelf goed voor te bereiden op een succesvolle bedrijfsverkoop.

Een vuistregel is dat een succesvolle uitvoering tenminste 2-3 jaar duurt.
Dat geeft ruimte om verbeteringen niet alleen te plannen, maar ook uit te voeren en meetbaar te maken in marge, cashflow en onafhankelijkheid; zaken precies waar kopers in due diligence op toetsen.

2 jaar is vaak het minimum om structurele stappen (team, processen, stuurinformatie) door te voeren.
0–12 maanden werkt alleen als je bedrijf onafhankelijk is en een sterke governance structuur staat.
De beste timing: neem vrijblijvend contact op zodra je merkt dat een verkoop een serieuze overweging voor je is. Want de prettigste overdracht en de beste waardering ontstaat niet door "het verkoopproces", maar door het voortraject waarin je het bedrijf en jezelf verkoopklaar maakt.`,
      },
      {
        question: "Moet Exit Planning altijd leiden tot 100% verkoop?",
        answer: `Nee, Exit Planning hoeft niet te leiden tot verkoop. Integendeel: het doel is een helder toekomstplan schetsen, opties creëren en eventuele Quick Wins door te voeren.

Veel MKB-ondernemers gaan het Exit Planning-proces (ook wel Exit Readiness ('verkoopklaarheid' (?) genoemd) in om hun afwegingen, persoonlijke situatie en verbeterpotentieel van het bedrijf scherp te krijgen. Dit helpt in de vervolgkeuze wanneer of in welke situatie zij wél een exit overwegen en in welke vorm:
(a) eigendom behouden maar operationeel minder aanwezig zijn,
(b) een management buy-in of buy-out met jou als aandeelhouder op afstand, of
(c) een gedeeltelijke verkoop (pre-exit) waarbij je nog meedraait om groei te versnellen.
(d) een volledige exit.

Door het bedrijf overdraagbaar te maken, verschuif je van "ik móét blijven" naar "ik kán kiezen". Dat is strategisch sterker richting kopers én richting jezelf: je onderhandelt vanuit rust, niet vanuit noodzaak.`,
      },
      {
        question:
          "Wat is een pre-exit strategie en wanneer past een gedeeltelijke verkoop of 'pre-exit' beter dan wachten?",
        answer: `Een pre-exit strategie is een verkoopstrategie waarbij je je bedrijf in fasen verkoopt, meestal in twee stappen. Eerst verkoop je een gedeelte van je aandelen, terwijl je zelf als aandeelhouder en directie actief betrokken blijft. Na een afgesproken termijn, vaak 5 tot 7 jaar, volgt de definitieve verkoop van de resterende aandelen.

Wanneer past een pre-exit beter dan wachten?
Een gedeeltelijke verkoop is strategisch vaak slimmer dan wachten op een volledige exit in de volgende scenario's:

Risicospreiding: Je wilt nu alvast een deel van je vermogen veiligstellen ("cashen").
Groeiversnelling: Je hebt kapitaal of expertise van een partner nodig voor verdere schaling.
Second Bite: Je wilt profiteren van de waardestijging die de komende jaren onder de nieuwe partner wordt gerealiseerd.
Geleidelijke overdracht: Je bent nog niet klaar om te stoppen, maar wilt wel de eindverantwoordelijkheid delen.`,
      },
    ],
  },
  {
    id: "bedrijfswaarde",
    title: "Bedrijfswaarde & winstgevendheid",
    description: "Hoe verhoog je de waarde en marge van je onderneming?",
    icon: TrendingUp,
    items: [
      {
        question: "Welke verbeteracties hebben meestal de meeste impact op bedrijfswaarde?",
        answer: `Hogere bedrijfswaarde komt bijna altijd uit een combinatie van marge, risico en overdraagbaarheid.
De meest effectieve acties:

Margekwaliteit verbeteren: prijsstrategie, productmix, projecten met lage marge eruit, efficiency.
Managementinformatie op 1 A4: maandelijkse rapportage met KPI's en oorzaken van afwijkingen.
Ondernemersafhankelijkheid reduceren: beslisrechten, key accounts, operations en kennis borgen in het team.
Klantconcentratie verlagen: actief sturen op spreiding en contractkwaliteit.
Werkkapitaal beheersen: debiteuren (DSO), voorraad (DIO) en betalingscondities, deze hebben direct effect op de cashflow.
Proces- en kwaliteitsborging: minder faalkosten, hogere leverbetrouwbaarheid, claims afwikkelen.
Contract- en compliance hygiëne: HR-dossiers, IP/IT, lopende geschillen, elke onzekerheid verlaagt de multiple.

Dit zijn waardehefbomen omdat ze de "risicoprijs" verlagen en de "zekerheidsprijs" verhogen.`,
      },
      {
        question: "Wat zijn normalisaties, wat is genormaliseerde EBITDA en waarom bepaalt dit zo sterk de waardering?",
        answer: `Normalisaties zijn correcties op je historische resultaten om het structurele, herhaalbare verdienvermogen te laten zien. Denk aan eenmalige kosten/opbrengsten, privécomponenten, uitzonderlijke management fees, incidentele juridische kosten, of kosten die na overname veranderen (bijv. ondernemersloon of huur).

Genormaliseerde EBITDA is het bedrijfsresultaat (voor afschrijvingen en rente baten/-lasten) na deze onderbouwde, controleerbare aanpassingen. Dit bepaalt de waardering sterk omdat MKB-waarderingen vaak werken met een multiple op EBITDA: elke €100k extra genormaliseerde EBITDA kan (afhankelijk van sector en risico) meervoudig doorwerken in waarde.

Normalisaties moeten herleidbaar zijn, zakelijk verdedigbaar (logisch), en consistent (niet opportunistisch). In due diligence worden zwakke normalisaties keihard gecorrigeerd.`,
      },
      {
        question:
          "Waarom is Business Improvement vaak de snelste route naar een betere exit (ook als je nog niet wilt verkopen)?",
        answer: `Business Improvement verhoogt de bruto marge en verlaagt risico's, wat de EBITDA en de waarderingsmultiple direct verhoogt.

Door processen te optimaliseren wordt de onderneming onafhankelijk van de eigenaar, waardoor de continuïteit voor een koper gegarandeerd is. Dit leidt tot een hogere cashflow en een professionelere organisatie, wat indirect stabiliteit brengt en de toekomstige verkoopwaarde maximaliseert.`,
      },
    ],
  },
  {
    id: "overdraagbaarheid",
    title: "Overdraagbaarheid van het bedrijf",
    description: "Hoe maak je je bedrijf onafhankelijk van jou als ondernemer?",
    icon: Users,
    items: [
      {
        question:
          "Hoe maak ik mijn bedrijf minder afhankelijk van mij als ondernemer, zonder groei of grip te verliezen?",
        answer: `Je verliest grip wanneer je "loslaat zonder systeem of plan". Je behoudt grip door grip te herontwerpen: van jou als persoon naar een voorspelbaar ritme. Concreet:

(1) definieer de 5–7 stuur-KPI's en introduceer een vast weekritme (operationeel) en maandritme (financieel),
(2) maak een duidelijke rol- en bevoegdhedenmatrix (wie beslist wat, wanneer escaleren),
(3) borg commerciële relaties: key accounts krijgen een eigenaar in je team, met overdrachtsplan,
(4) leg kernprocessen vast op het juiste niveau "zo werken wij"; niet als bureaucratie maar als continuïteit, en
(5) bouw een tweede lijn (teamleads) met duidelijke targets.

Groei versnelt vaak juist omdat de ondernemer niet langer de bottleneck is, terwijl jij via KPI's en ritmes de controle houdt.`,
      },
      {
        question: "Welke KPI's en vergaderfrequentie verhogen voorspelbaarheid en daarmee verkoopwaarde?",
        answer: `De exacte KPI's en het vergaderritme zijn altijd bedrijfsspecifiek.
Een productiebedrijf stuurt anders dan een projectenorganisatie of dienstverlener. Toch geldt in vrijwel elk MKB-bedrijf dezelfde regel: teveel meten en vergaderen is misschien wel slechter dan te weinig. Maar je moet niet blind varen.

Een praktische vuistregel is detailniveau en tijd. Waarbij een hogere frequentie meer op operationele zaken richt en naarmate de frequentie lager wordt, wordt het tactisch en strategisch:

Wekelijks (operationeel, kort): orderintake, pijplijn, productiviteit/capaciteit en de belangrijkste operationele aandachtspunten die levering en kwaliteit raken.
Maandelijks (performance & control): omzet, marge, klantresultaten, trends, werkkapitaal, churn/retentie, forecast versus realisatie en budget.
Per kwartaal (strategisch): investeringen/capex, ziekte en verloop, risico's, claims en vorderingen, plus de prioriteiten in het verbeterportfolio.

De 'truc' voor goede KPI's is niet méér data, maar consistentie.

En less is more: liever 8–12 KPI's die je consequent bespreekt en vertaalt naar acties, dan 40 indicatoren waar niemand naar kijkt (noch snapt).

Dat is ook wat kopers zien: een onderneming die voorspelbaar presteert én aantoonbaar in control is.

NOOT: Zelf ben ik voorstander van gelijke informatie, zodat je als eigenaar dezelfde inzichten deelt als je team. Dit voorkomt verrassingen door informatiediscrepantie en stimuleert medewerkers om cijfers zelf te analyseren, wat de betrokkenheid en het gezamenlijk eigenaarschap enorm vergroot.`,
      },
    ],
  },
  {
    id: "verkoopgereedheid",
    title: "Verkoop- en overdrachtsgereedheid",
    description: "Wat maakt een bedrijf écht verkoopklaar?",
    icon: ShieldCheck,
    items: [
      {
        question: "Wat is 'Exit Readiness' en hoe verschilt dat van een verkooptraject?",
        answer: `Exit readiness is de mate waarin je onderneming vandaag al "verkoopbaar" is: cijfers, resultaten, processen, contracten, team en risico's zijn op orde en inzichtelijk.

Een verkooptraject is de commerciële en juridische uitvoering: waardering, informatiememorandum, koperselectie, LOI, due diligence en SPA. Het verschil is cruciaal: als exit readiness laag is, wordt het verkooptraject duurder, trager en risicovoller, en eindigt het vaker in lagere waarde, earn-outs of afgebroken deals.

Exit Planning leidt dus tot Exit Readiness en is het fundament; het verkooptraject is het proces dat leidt tot de daadwerkelijke deal.`,
      },
      {
        question: "Wat betekent \u201Cbedrijf verkoopklaar maken\u201D concreet, en wat ziet een koper als 'must have'?",
        answer: `Bedrijf verkoopklaar maken betekent je bedrijf voorbereiden op een verkoop, met als doel dat een koper het bedrijf kan overnemen zonder dat de resultaten onder de overgang van eigenaar leiden.

Stabiliteit, voorspelbaarheid en beheersbaarheid zijn samen met een duidelijk en overtuigend strategisch plan essentieel.`,
      },
    ],
  },
  {
    id: "transitie",
    title: "Transitie & bedrijfsoverdracht",
    description: "Het verkoopproces, due diligence en de deal zelf.",
    icon: ArrowRightLeft,
    items: [
      {
        question: "Wat wordt er precies getoetst in een Due Diligence en hoe voorkom je verrassingen?",
        answer: `In due diligence toetst een koper of jouw onderneming klopt op doorgaans vier assen: financieel, juridisch, fiscaal en operationeel/commercieel (soms ook nog: CSRD en IT).

Financieel: kwaliteit van omzet, marge, normalisaties, werkkapitaal en cashflow.
Juridisch: contracten, claims, compliance, IP/IT (soms apart, afhankelijk van bedrijf), huur/lease.
Fiscaal: posities en risico's.
Operationeel/commercieel: klantconcentratie, leverbetrouwbaarheid, personeel, systemen en afhankelijkheden.

Een Exit Planning proces toetst waar het bedrijf staat op deze assen om zo verrassingen te voorkomen. We optimaliseren het bedrijf en bereiden het proces goed voor.`,
      },
      {
        question: "Welke managementinformatie verwachten kopers vóór een verkoopproces?",
        answer: `Kopers verwachten een transparant en onderbouwd inzicht in de onderneming om een gefundeerd bod te kunnen doen en risico's in te schatten. Deze informatie wordt doorgaans gebundeld in een informatie memorandum.

De belangrijkste categorieën managementinformatie zijn:

Financiële prestaties
Commercieel & markt
Organisatie & personeel
Juridisch & operationeel`,
      },
      {
        question: "Wat zijn 'rode vlaggen' die waardedruk veroorzaken in onderhandelingen?",
        answer: `'Rode vlaggen' zijn alarmsignalen die tijdens het verkoopproces naar voren komen en leiden tot een lager bod, strengere voorwaarden of zelfs het afbreken van de transactie.

De meest voorkomende waardedrukkers zijn:

Afhankelijkheid van de eigenaar
Hoge klantconcentratie
Gebrekkige financiële administratie
Dalende trends of margedruk
Juridische en operationele lijken in de kast`,
      },
      {
        question: "Wat is een Vendor Loan, en wat zijn de risico's voor de verkoper?",
        answer: `Een Vendor Loan (of achtergestelde lening) is een lening waarbij de verkoper een deel van de verkoopprijs niet direct in cash ontvangt, maar aan de koper uitleent om de transactie te financieren.

De grootste risico's voor de verkoper zijn betalingsonmacht, achterstelling, geen zeggenschap en fiscaal risico.`,
      },
      {
        question: "Waarom wordt een Vendor Loan weleens een 'Sigaar uit eigen doos' genoemd?",
        answer: `Een Vendor Loan wordt soms een "sigaar uit eigen doos" genoemd omdat de verkoper feitelijk zijn eigen overname financiert. Hoewel de koopprijs op papier hoog kan lijken, betaalt de koper dit bedrag (deels) terug met de toekomstige winsten die de onderneming onder de nieuwe eigenaar genereert.`,
      },
    ],
  },
];
