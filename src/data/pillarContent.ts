/**
 * Rich pillar page content keyed by category slug.
 * Each pillar has a short hero intro and extended body paragraphs.
 */

export interface PillarContent {
  /** Short intro shown below the H1 in the hero */
  heroIntro: string;
  /** Extended body paragraphs for the deep-dive section */
  bodyParagraphs: string[];
}

export const pillarContent: Record<string, PillarContent> = {
  "bedrijfswaarde-en-winstgevendheid-verbeteren": {
    heroIntro:
      "Veel ondernemers bouwen jarenlang aan hun bedrijf met één duidelijke focus: groei. Meer klanten, meer omzet, een sterkere positie in de markt. Maar wanneer ondernemers later nadenken over hun bedrijf verkopen of een toekomstige bedrijfsoverdracht, ontstaat vaak een andere vraag: wat is het bedrijf eigenlijk echt waard? En belangrijker nog: hoe kun je die waarde structureel verhogen voordat je ooit een verkoopproces start?",
    bodyParagraphs: [
      "Het verbeteren van winstgevendheid en het verhogen van de bedrijfswaarde vormen de kern van goede exit planning. Kopers kijken namelijk niet alleen naar omzet, maar vooral naar de kwaliteit van de winst en de toekomstbestendigheid van het bedrijf. Factoren zoals stabiele marges, terugkerende omzet, een sterk managementteam en een duidelijke strategie bepalen in grote mate de uiteindelijke bedrijfswaardering. Ondernemers die hier tijdig op sturen, bouwen niet alleen een beter bedrijf, maar creëren ook meer opties wanneer zij ooit een bedrijfsoverdracht of bedrijfsovername overwegen.",
      "In de artikelen binnen dit thema lees je onder andere over manieren om de bedrijfswaarde te verhogen, hoe winstgevendheid en waardedrijvers samenhangen, en welke strategische keuzes het grootste effect hebben op de waarde van een onderneming. Ook gaan we in op hoe kopers naar bedrijven kijken, welke factoren een hogere waardering ondersteunen en hoe ondernemers hun bedrijf stap voor stap kunnen professionaliseren.",
      "Voor veel ondernemers begint exit planning niet bij het verkopen van het bedrijf, maar bij het bouwen van een beter bedrijf. Door structureel te werken aan winstgevendheid en waardeontwikkeling ontstaat een onderneming die aantrekkelijker is voor kopers, maar ook beter functioneert zolang de ondernemer nog aan het roer staat. Dat maakt waardegroei niet alleen relevant voor een toekomstig verkoopmoment, maar voor de hele strategische ontwikkeling van het bedrijf.",
    ],
  },
  "voorbereiding-op-bedrijfsoverdracht": {
    heroIntro:
      "Veel ondernemers denken pas serieus na over een bedrijfsoverdracht wanneer zich een concrete koper meldt of wanneer de ondernemer zelf klaar is voor een volgende fase. In de praktijk blijkt dat een bedrijf verkopen vaak complexer is dan verwacht. Zonder duidelijke voorbereiding kan een verkoopproces langer duren, meer risico's bevatten en uiteindelijk minder opleveren dan mogelijk was.",
    bodyParagraphs: [
      "Een goede voorbereiding op een bedrijfsoverdracht begint jaren voordat een ondernemer daadwerkelijk wil verkopen. Exit planning draait niet alleen om het verkoopproces zelf, maar vooral om het bedrijf zodanig ontwikkelen dat het aantrekkelijk is voor een toekomstige koper. Zaken zoals structuur in de organisatie, voorspelbare resultaten, duidelijke processen en een sterke marktpositie spelen daarbij een belangrijke rol. Ondernemers die hun bedrijf verkoopklaar maken vergroten niet alleen de kans op een succesvolle bedrijfsovername, maar versterken ook de continuïteit van hun onderneming.",
      "In de artikelen binnen dit thema lees je onder andere over de verschillende stappen in een bedrijf verkopen stappenplan, welke voorbereidingen nodig zijn voordat een verkoopproces start en hoe ondernemers hun bedrijf strategisch kunnen positioneren richting een toekomstige koper. Ook behandelen we onderwerpen zoals management buy-outs, management buy-ins en andere vormen van bedrijfsoverdracht die in de praktijk vaak voorkomen.",
      "Voorbereiding op een bedrijfsoverdracht betekent in essentie dat ondernemers de regie nemen over hun toekomst. Door vroegtijdig na te denken over een exitstrategie en hun bedrijf daarop te ontwikkelen, vergroten zij hun strategische vrijheid. Dat maakt het mogelijk om een overdracht te realiseren op het juiste moment, onder de juiste voorwaarden en met maximale waarde voor zowel ondernemer als onderneming.",
    ],
  },
  "bedrijfswaardering-en-waardedrijvers": {
    heroIntro:
      "Veel ondernemers vragen zich vroeg of laat af: wat is de waarde van mijn bedrijf? Zeker wanneer er wordt nagedacht over een bedrijf verkopen of een toekomstige bedrijfsoverdracht, wordt bedrijfswaardering een belangrijk onderwerp. Toch blijkt in de praktijk dat de waarde van een onderneming vaak minder vanzelfsprekend is dan ondernemers verwachten.",
    bodyParagraphs: [
      "Een bedrijfswaardering wordt niet alleen bepaald door cijfers uit het verleden. Kopers kijken vooral naar de toekomst van het bedrijf. Groei, stabiliteit, risico's en de kwaliteit van de organisatie spelen allemaal een rol in hoe een bedrijf wordt gewaardeerd. Dat betekent dat factoren zoals klantconcentratie, afhankelijkheid van de ondernemer, kwaliteit van het managementteam en schaalbaarheid van het businessmodel grote invloed kunnen hebben op de uiteindelijke waarde. Deze factoren worden vaak aangeduid als de waardedrijvers van een onderneming.",
      "In de artikelen binnen dit thema lees je onder andere hoe een bedrijfswaardering tot stand komt, welke methoden worden gebruikt om de waarde van een bedrijf te bepalen en welke waardedrijvers het grootste effect hebben op de uiteindelijke verkoopprijs. Ook gaan we in op hoe ondernemers hun bedrijfswaarde kunnen verhogen door gericht te sturen op de factoren waar kopers naar kijken.",
      "In het kader van exit planning vormt inzicht in waardedrijvers een belangrijk strategisch instrument. Ondernemers die begrijpen wat hun bedrijf waardevol maakt, kunnen gerichter investeren in de ontwikkeling van hun onderneming. Daardoor ontstaat niet alleen een hogere bedrijfswaarde, maar ook een onderneming die aantrekkelijker is voor potentiële kopers wanneer een bedrijfsoverdracht zich in de toekomst aandient.",
    ],
  },
  "afhankelijkheid-van-de-ondernemer-verminderen": {
    heroIntro:
      "Veel MKB-bedrijven zijn sterk verbonden met de ondernemer die ze heeft opgebouwd. De ondernemer neemt belangrijke beslissingen, onderhoudt klantrelaties en is vaak de centrale spil in de organisatie. Dat is begrijpelijk, maar wanneer ondernemers nadenken over een bedrijf verkopen of een toekomstige bedrijfsoverdracht, kan deze afhankelijkheid een belangrijke belemmering vormen.",
    bodyParagraphs: [
      "Voor kopers is een bedrijf aantrekkelijker wanneer het ook zonder de oorspronkelijke ondernemer goed kan functioneren. Een onderneming die afhankelijk blijft van één persoon brengt namelijk meer risico met zich mee. Daarom speelt het verminderen van de afhankelijkheid van de ondernemer een belangrijke rol binnen exit planning. Bedrijven die beschikken over een sterk managementteam, duidelijke processen en gedeelde verantwoordelijkheden zijn doorgaans beter overdraagbaar en behalen vaak een hogere bedrijfswaardering.",
      "In de artikelen binnen dit thema lees je onder andere hoe ondernemers hun bedrijf minder afhankelijk kunnen maken van zichzelf, hoe een managementteam kan worden opgebouwd en welke organisatorische stappen nodig zijn om een bedrijf zonder ondernemer te laten draaien. Ook gaan we in op praktische strategieën om kennis, verantwoordelijkheden en besluitvorming breder in de organisatie te verankeren.",
      "Het verminderen van afhankelijkheid is niet alleen relevant wanneer een ondernemer zijn bedrijf wil verkopen. Het zorgt ook voor een gezondere organisatie, meer strategische ruimte voor de ondernemer en een bedrijf dat beter bestand is tegen groei of veranderingen. In het kader van exit planning is het daarom een belangrijke stap richting een onderneming die daadwerkelijk overdraagbaar en toekomstbestendig is.",
    ],
  },
  "bedrijf-overdraagbaar-maken": {
    heroIntro:
      "Een bedrijf verkopen is in de praktijk vaak meer dan het vinden van een koper. Voor een succesvolle bedrijfsoverdracht moet een onderneming ook daadwerkelijk overdraagbaar zijn. Dat betekent dat een nieuwe eigenaar het bedrijf kan voortzetten zonder dat cruciale kennis, relaties of processen verloren gaan wanneer de ondernemer vertrekt.",
    bodyParagraphs: [
      "Veel ondernemers ontdekken tijdens een verkoopproces dat hun bedrijf nog sterk rondom henzelf georganiseerd is. Contracten, klantrelaties, besluitvorming en strategische keuzes lopen vaak via de ondernemer zelf. Voor potentiële kopers kan dit een belangrijk risico vormen. Daarom speelt het overdraagbaar maken van een bedrijf een centrale rol binnen exit planning. Hoe beter de structuur, processen en verantwoordelijkheden zijn ingericht, hoe eenvoudiger een bedrijfsoverdracht kan plaatsvinden.",
      "In de artikelen binnen dit thema lees je onder andere welke organisatorische stappen nodig zijn om een bedrijf overdraagbaar te maken, hoe processen en verantwoordelijkheden kunnen worden vastgelegd en hoe ondernemers hun bedrijf verkoopklaar kunnen maken. Ook behandelen we onderwerpen zoals governance, documentatie en organisatorische structuur die een belangrijke rol spelen tijdens een bedrijfsovername.",
      "Het overdraagbaar maken van een onderneming is in feite het bouwen van een organisatie die onafhankelijk kan functioneren. Voor ondernemers die ooit hun bedrijf willen verkopen vormt dit een essentieel onderdeel van exit planning. Tegelijkertijd levert een goed georganiseerde onderneming ook direct voordelen op in de dagelijkse bedrijfsvoering, doordat verantwoordelijkheden duidelijker zijn verdeeld en de organisatie stabieler functioneert.",
    ],
  },
  "het-persoonlijke-en-financiele-plan-na-overdracht": {
    heroIntro:
      "Voor veel ondernemers draait het gesprek over een bedrijf verkopen vooral om de onderneming zelf. De waarde van het bedrijf, het verkoopproces en de mogelijke koper krijgen vaak de meeste aandacht. Toch blijkt in de praktijk dat een succesvolle bedrijfsoverdracht niet alleen gaat over het bedrijf, maar ook over de toekomst van de ondernemer.",
    bodyParagraphs: [
      "Wanneer een ondernemer zijn bedrijf verkoopt verandert er vaak meer dan alleen de eigendomsstructuur. De dagelijkse rol, de identiteit als ondernemer en de financiële situatie kunnen ingrijpend veranderen. Daarom vormt het persoonlijke plan een belangrijk onderdeel van exit planning. Ondernemers die vooraf nadenken over hun doelen, hun rol na de overdracht en hun financiële planning na verkoop, ervaren doorgaans meer rust en duidelijkheid tijdens het proces.",
      "In de artikelen binnen dit thema lees je onder andere over leven na verkoop van het bedrijf, financiële planning na een bedrijfsoverdracht en de keuzes die ondernemers kunnen maken met het vermogen dat vrijkomt bij een verkoop. Ook behandelen we vragen die vaak spelen rondom persoonlijke doelen, investeringen, nieuwe ondernemingen of een andere invulling van tijd en energie.",
      "Een bedrijfsoverdracht markeert voor veel ondernemers het einde van een belangrijke fase, maar tegelijkertijd ook het begin van een nieuwe. Door tijdig stil te staan bij het persoonlijke en financiële plan ontstaat een duidelijker beeld van wat een succesvolle exit daadwerkelijk betekent. Binnen exit planning vormt deze persoonlijke dimensie daarom een essentieel onderdeel van een goed voorbereide overdracht.",
    ],
  },
};
