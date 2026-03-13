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
};
