import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import mountainClimberSvg from "@/assets/images/mountain-climber-line-drawing.svg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const faqSections = [
  {
    title: "Algemeen / basisbegrippen",
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
    title: "Strategie & timing",
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
      {
        question: "Waarom verkopen veel ondernemers hun bedrijf te laat?",
        answer: `Veel ondernemers starten pas met verkoopvoorbereiding wanneer zij al willen stoppen. Op dat moment is er vaak weinig tijd meer om waarde te verbeteren of risico's te verminderen.

Een sterke bedrijfsoverdracht ontstaat juist wanneer er meerdere jaren voorbereiding is. Dan kunnen verbeteringen zichtbaar worden in resultaten, processen en teamstructuur.

Daarom begint Exit Planning meestal 2 tot 5 jaar vóór een mogelijke verkoop.`,
      },
      {
        question: "Waarom is emotionele voorbereiding belangrijk bij een bedrijfsoverdracht?",
        answer: `Een bedrijfsoverdracht is niet alleen een financiële transactie, maar vaak ook een grote persoonlijke verandering voor de ondernemer.

Veel ondernemers hebben jarenlang een groot deel van hun identiteit en dagelijkse structuur verbonden aan hun bedrijf. Zonder voorbereiding kan een verkoop leiden tot twijfel of zelfs spijt achteraf.

Daarom is het belangrijk om naast de zakelijke voorbereiding ook stil te staan bij vragen zoals:

- wat wil ik na de verkoop gaan doen
- welke rol wil ik nog spelen in het bedrijf
- hoe ziet mijn persoonlijke toekomst eruit

Een helder persoonlijk plan helpt om betere beslissingen te nemen en voorkomt dat de verkoop uitsluitend vanuit financiële motieven wordt gestuurd.`,
      },
    ],
  },
  {
    title: "Bedrijfswaarde & winstgevendheid",
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
      {
        question: "Wat bepaalt de waarde van een onderneming bij verkoop?",
        answer: `De waarde van een onderneming wordt meestal bepaald door twee factoren:
de structurele winstgevendheid van het bedrijf en het risico dat een koper ziet.

Kopers kijken daarbij onder andere naar:

- Stabiliteit en groei van omzet en EBITDA
- Spreiding van klanten en leveranciers
- Afhankelijkheid van de ondernemer
- Kwaliteit van processen, managementinformatie en systemen
- De sterkte van het managementteam
- Marktpositie en groeipotentieel

Hoe voorspelbaarder en onafhankelijker het bedrijf functioneert, hoe hoger doorgaans de waardering.`,
      },
      {
        question: "Wat zijn de belangrijkste 'value drivers' die de waarde van een onderneming bepalen?",
        answer: `In Exit Planning wordt vaak gesproken over value drivers: factoren die direct invloed hebben op de aantrekkelijkheid en waarde van een onderneming voor een koper.

Voorbeelden van belangrijke value drivers zijn:

- Groei en stabiliteit van omzet en winst
- Spreiding van klanten en leveranciers
- Sterkte van het managementteam
- Professionele processen en managementinformatie
- Schaalbaarheid van het businessmodel
- Onderscheidend vermogen in de markt

Hoe sterker deze factoren ontwikkeld zijn, hoe hoger doorgaans de waardering en hoe groter de interesse van potentiële kopers.`,
      },
      {
        question: "Wat is het verschil tussen bedrijfswaarde en verkoopprijs?",
        answer: `De bedrijfswaarde is een berekende indicatie van wat een onderneming economisch waard is, meestal gebaseerd op winstgevendheid, groei en risico.

De uiteindelijke verkoopprijs ontstaat pas in onderhandelingen tussen koper en verkoper. Daarbij spelen ook andere factoren een rol, zoals:

- concurrentie tussen kopers
- de dealstructuur (earn-out, vendor loan)
- de strategische waarde voor een koper
- timing van de transactie

De verkoopprijs kan daarom hoger of lager uitvallen dan de theoretische bedrijfswaarde.`,
      },
    ],
  },
  {
    title: "Overdraagbaarheid van het bedrijf",
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
      {
        question: "Wat bedoelen kopers met een 'ondernemersafhankelijk' bedrijf?",
        answer: `Een onderneming wordt ondernemersafhankelijk genoemd wanneer de resultaten sterk leunen op de persoonlijke relaties, kennis of besluitvorming van de eigenaar.

Voor kopers vormt dit een risico. Wanneer de ondernemer vertrekt, kan omzet of stabiliteit verdwijnen.

Daarom proberen veel ondernemers vóór een verkoop:

- commerciële relaties te spreiden in het team
- processen en besluitvorming vast te leggen
- een managementlaag op te bouwen

Hoe zelfstandiger de organisatie functioneert, hoe aantrekkelijker het bedrijf voor een koper wordt.`,
      },
    ],
  },
  {
    title: "Verkoop- en overdrachtsgereedheid",
    items: [
      {
        question: "Wat is 'Exit Readiness' en hoe verschilt dat van een verkooptraject?",
        answer: `Exit readiness is de mate waarin je onderneming vandaag al "verkoopbaar" is: cijfers, resultaten, processen, contracten, team en risico's zijn op orde en inzichtelijk.

Een verkooptraject is de commerciële en juridische uitvoering: waardering, informatiememorandum, koperselectie, LOI, due diligence en SPA. Het verschil is cruciaal: als exit readiness laag is, wordt het verkooptraject duurder, trager en risicovoller, en eindigt het vaker in lagere waarde, earn-outs of afgebroken deals.

Exit Planning leidt dus tot Exit Readiness en is het fundament; het verkooptraject is het proces dat leidt tot de daadwerkelijke deal.`,
      },
      {
        question: "Wat betekent "bedrijf verkoopklaar maken" concreet, en wat ziet een koper als 'must have'?",
        answer: `Bedrijf verkoopklaar maken betekent je bedrijf voorbereiden op een verkoop, met als doel dat een koper het bedrijf kan overnemen zonder dat de resultaten onder de overgang van eigenaar leiden.

Stabiliteit, voorspelbaarheid en beheersbaarheid zijn samen met een duidelijk en overtuigend strategisch plan essentieel.`,
      },
      {
        question: "Wanneer is een bedrijf echt 'verkoopbaar'?",
        answer: `Een bedrijf is verkoopbaar wanneer een koper het bedrijf kan overnemen zonder dat de resultaten instorten zodra de eigenaar vertrekt.

Dat betekent meestal dat:

- financiële cijfers transparant en betrouwbaar zijn
- processen en verantwoordelijkheden duidelijk zijn
- het managementteam zelfstandig kan opereren
- contracten en juridische structuren op orde zijn
- de onderneming voorspelbare resultaten levert

Exit Planning richt zich op het realiseren van deze verkoopbaarheid.`,
      },
    ],
  },
  {
    title: "Transitie & bedrijfsoverdracht",
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
      {
        question: "Wat is een Quality of Earnings-analyse en waarom speelt deze een grote rol bij bedrijfsovernames?",
        answer: `Een Quality of Earnings-analyse (QoE) onderzoekt hoe duurzaam en betrouwbaar de winst van een onderneming werkelijk is.

Waar een jaarrekening vooral historische cijfers laat zien, kijkt een QoE-analyse naar:

- de kwaliteit en herhaalbaarheid van omzet
- structurele versus incidentele kosten
- normalisaties in EBITDA
- werkkapitaal en cashflow
- risico's in het verdienmodel

Voor kopers is dit een cruciaal onderdeel van due diligence, omdat het inzicht geeft in de toekomstige winstcapaciteit van de onderneming.`,
      },
      {
        question: "Wat is een informatiememorandum en welke rol speelt het in een verkoopproces?",
        answer: `Een informatiememorandum (IM) is een document dat potentiële kopers inzicht geeft in de onderneming voordat zij een bod uitbrengen.

Het document bevat onder andere:

- de strategie en marktpositie van het bedrijf
- financiële prestaties en prognoses
- beschrijving van producten, klanten en organisatie
- kansen en risico's
- groeipotentieel van de onderneming

Het informatiememorandum vormt de basis waarop kopers beslissen of zij interesse hebben om het bedrijf verder te onderzoeken en eventueel een indicatief bod uit te brengen.`,
      },
    ],
  },
];

const VeelgesteldeVragen = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Veelgestelde vragen over Exit Planning | Propasso</title>
        <meta name="description" content="Antwoorden op veelgestelde vragen van ondernemers over exit planning, bedrijfswaarde, overdraagbaarheid en bedrijfsoverdracht." />
        <link rel="canonical" href="https://propasso.nl/veelgestelde-vragen" />
      </Helmet>
      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqSections.flatMap((section) =>
              section.items.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              }))
            ),
          }),
        }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        {/* Faded accent circle with illustration */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 md:translate-x-1/6 w-[320px] h-[320px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px]">
          <div className="absolute inset-0 rounded-full bg-accent/30 blur-3xl" />
          <img
            src={mountainClimberSvg}
            alt=""
            className="absolute inset-0 m-auto h-[65%] w-[65%] object-contain opacity-[0.06] pointer-events-none select-none"
          />
        </div>

        <div className="section-container relative z-10 py-16 md:py-24 max-w-4xl">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Veelgestelde vragen</p>
          </motion.div>
          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-balance"
          >
            Antwoorden op veelgestelde vragen{" "}
            <span className="text-muted-foreground">over exit planning</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Hieronder vind je antwoorden op veelgestelde vragen van ondernemers over exit planning, bedrijfswaarde,
            overdraagbaarheid en bedrijfsoverdracht.
          </motion.p>
        </div>
      </section>

      {/* ═══════════ FAQ SECTIONS ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="section-container max-w-4xl">
          <div className="space-y-16 md:space-y-20">
            {faqSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: 0.05 * sectionIndex }}
              >
                {/* Section header with subtle left accent */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-8 rounded-full bg-primary/20" />
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-1">
                  {section.items.map((faq, faqIndex) => (
                    <AccordionItem
                      key={`${sectionIndex}-${faqIndex}`}
                      value={`faq-${sectionIndex}-${faqIndex}`}
                      className="border-b border-border/30 last:border-b-0"
                    >
                      <AccordionTrigger className="text-left text-base md:text-lg font-semibold py-5 hover:text-primary transition-colors duration-300">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-line pb-6 text-[0.95rem]">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </PageLayout>
  );
};

export default VeelgesteldeVragen;
