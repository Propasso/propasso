import climbingImg from "@/assets/propasso-climbing.png";
import teamImg from "@/assets/propasso-team.png";
import moneyImg from "@/assets/propasso-money.png";

export interface Article {
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  entity: string;
}

export const articles: Article[] = [
  {
    slug: "successieplanning-exitstrategie-familiebedrijf",
    title: "Successieplanning uitgelegd: hoe je een exitstrategie voor het familiebedrijf ontwikkelt",
    summary: "Een succesvolle bedrijfsopvolging binnen het familiebedrijf vraagt om meer dan een juridisch plan. Dit artikel beschrijft de stappen naar een exitstrategie die werkt voor familie én onderneming.",
    content: "Placeholder — de volledige artikelinhoud volgt binnenkort. Dit artikel behandelt de kernprincipes van successieplanning en hoe je als ondernemer een exitstrategie ontwikkelt die recht doet aan zowel de familie als de continuïteit van het bedrijf.",
    image: climbingImg,
    entity: "Exit Planning",
  },
  {
    slug: "team-bepaalt-bedrijfswaarde",
    title: "Waarom je team je bedrijfswaarde bepaalt (niet jij)",
    summary: "De waarde van je bedrijf hangt niet alleen af van de cijfers. Hoe overdraagbaar je team functioneert, bepaalt in grote mate of een koper vertrouwen heeft in de continuïteit.",
    content: "Placeholder — de volledige artikelinhoud volgt binnenkort. Dit artikel laat zien waarom een sterk en zelfstandig team de belangrijkste waardecreator is bij een bedrijfsoverdracht.",
    image: teamImg,
    entity: "Bedrijf overdraagbaar maken",
  },
  {
    slug: "waarde-mkb-bedrijf-bepalen",
    title: "Van cijfers naar inzicht: hoe bepaal je de waarde van je MKB-bedrijf",
    summary: "Bedrijfswaardering gaat verder dan een multiple op EBITDA. Dit artikel helpt je begrijpen welke factoren de waarde van je bedrijf écht bepalen.",
    content: "Placeholder — de volledige artikelinhoud volgt binnenkort. Dit artikel geeft inzicht in de factoren die de waarde van een MKB-bedrijf bepalen en hoe je deze kunt optimaliseren.",
    image: moneyImg,
    entity: "Bedrijf verkoopklaar maken",
  },
];
