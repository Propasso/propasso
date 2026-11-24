import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  ArrowRightLeft,
  ArrowRight,
  Compass,
} from "lucide-react";

const outcomes = [
  {
    icon: TrendingUp,
    title: "Sterkere bedrijfsstructuur",
    description:
      "Heldere governance, managementdiepte en gedocumenteerde processen die het bedrijf onafhankelijk laten functioneren.",
  },
  {
    icon: ShieldCheck,
    title: "Verbeterde winstgevendheid",
    description:
      "Inzicht in margekwaliteit, kostenstructuur en terugkerende omzet; de waardedrijvers waar kopers op letten.",
  },
  {
    icon: Users,
    title: "Hogere verkoopopbrengst",
    description:
      "Werken aan overdraagbaarheid leidt doorgaans al tot een hogere multiple, specifieke winstgevendheidtrajecten leiden daarnaast tot hogere winst",
  },
  {
    icon: ArrowRightLeft,
    title: "Zelfstandig en overdraag bedrijf",
    description:
      "Een bedrijf dat klaar is voor overdracht, niet afhankelijk is van de ondernemer, met heldere governance en  bedrijfstructuur.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const OutcomesSection = () => {
  return (
    <section className="py-24 md:py-36 section-alt-bg">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Resultaat</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          Wat levert het op?
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Ondernemers die hun bedrijf voorbereiden op overdracht, bouwen een 
          bedrijf dat minder afhankelijk en aantoonbaar overdraagbaar is. Daarnaast 
          werken ze direct en indirect aan hogere winst en bedrijfswaarde.
        </motion.p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl">
          {outcomes.map((outcome, i) => {
            const Icon = outcome.icon;
            return (
              <motion.div
                key={outcome.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: 0.12 * i + 0.25 }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{outcome.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {outcome.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* De ondernemer: het vijfde resultaat, met de brug naar de pagina over het persoonlijke plan */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 max-w-6xl rounded-2xl bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8"
        >
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/30">
            <Compass size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Een plan voor daarna</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Je weet wat je na de verkoop gaat doen, je hebt het thuis besproken en je privézaken staan op papier.
            </p>
          </div>
          <Link
            to="/werkwijze/persoonlijk-plan-opstellen"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline shrink-0"
          >
            Je persoonlijke plan
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OutcomesSection;
