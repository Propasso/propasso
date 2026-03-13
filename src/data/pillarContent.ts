/**
 * Rich pillar page content keyed by category slug.
 * Each pillar has a short hero intro and structured SEO sections.
 */

export interface PillarValueDriver {
  icon: string; // lucide icon name
  label: string;
  description: string;
}

export interface PillarContent {
  /** Short intro shown below the H1 in the hero */
  heroIntro: string;
  /** "Waarom dit belangrijk is" — max 2 short paragraphs */
  whyItMatters: string[];
  /** "Wat bepaalt…" — displayed as icon cards */
  valueDrivers: PillarValueDriver[];
  /** "Wat je in deze artikelen leert" — short closing text */
  whatYouLearn: string;
  /** @deprecated — use structured sections above */
  bodyParagraphs?: string[];
}

export const pillarContent: Record<string, PillarContent> = {
  "bedrijfswaarde-en-winstgevendheid-verbeteren": {
    heroIntro:
      "Veel ondernemers bouwen jarenlang aan hun bedrijf met één duidelijke focus: groei. Meer klanten, meer omzet, een sterkere positie in de markt. Maar wanneer ondernemers later nadenken over hun bedrijf verkopen of een toekomstige bedrijfsoverdracht, ontstaat vaak een andere vraag: wat is het bedrijf eigenlijk echt waard? En belangrijker nog: hoe kun je die waarde structureel verhogen voordat je ooit een verkoopproces start?",
    whyItMatters: [
      "Het verbeteren van winstgevendheid en het verhogen van de bedrijfswaarde vormen de kern van goede exit planning. Kopers kijken niet alleen naar omzet, maar vooral naar de kwaliteit van de winst en de toekomstbestendigheid van het bedrijf.",
      "Voor veel ondernemers begint exit planning niet bij het verkopen, maar bij het bouwen van een beter bedrijf. Door structureel te werken aan waardeontwikkeling ontstaat een onderneming die aantrekkelijker is voor kopers én beter functioneert zolang de ondernemer nog aan het roer staat.",
    ],
    valueDrivers: [
      {
        icon: "TrendingUp",
        label: "Stabiele marges",
        description: "Consistente en voorspelbare winstmarges geven kopers vertrouwen in de toekomst.",
      },
      {
        icon: "RefreshCw",
        label: "Terugkerende omzet",
        description: "Abonnementen, contracten en herhalingsaankopen verlagen risico en verhogen waardering.",
      },
      {
        icon: "Users",
        label: "Sterk managementteam",
        description: "Een bedrijf dat draait zonder de eigenaar is aanzienlijk meer waard.",
      },
      {
        icon: "Target",
        label: "Duidelijke strategie",
        description: "Een helder groeiplan en marktpositie maken het bedrijf aantrekkelijk voor overnemende partijen.",
      },
      {
        icon: "ShieldCheck",
        label: "Lage afhankelijkheid",
        description: "Spreiding van klanten, leveranciers en kennis vermindert risico voor kopers.",
      },
      {
        icon: "BarChart3",
        label: "Schaalbaar model",
        description: "Bewezen groeipotentieel zonder evenredige kostenstijging verhoogt de waardering.",
      },
    ],
    whatYouLearn:
      "In de artikelen binnen dit thema lees je hoe je de bedrijfswaarde structureel verhoogt, welke waardedrijvers het grootste effect hebben, en hoe kopers naar bedrijven kijken. Elk artikel vertaalt theorie naar praktische stappen die je direct kunt toepassen.",
  },
};
