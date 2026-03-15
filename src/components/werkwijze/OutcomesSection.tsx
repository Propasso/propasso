import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  ArrowRightLeft,
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
      "Inzicht in margekwaliteit, kostenstructuur en terugkerende omzet — de waardedrijvers die kopers waarderen.",
  },
  {
    icon: Users,
    title: "Verminderde afhankelijkheid",
    description:
      "De ondernemer wordt minder operationeel onmisbaar. Het bedrijf draait door, ook zonder de oprichter.",
  },
  {
    icon: ArrowRightLeft,
    title: "Verhoogde overdraagbaarheid",
    description:
      "Een bedrijf dat aantoonbaar klaar is voor overdracht — met heldere documentatie, structuur en voorspelbaarheid.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const OutcomesSection = () => {
  return (
    <section className="py-20 md:py-28 section-alt-bg">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Resultaat</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          Wat dit traject oplevert
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Ondernemers die dit traject doorlopen, bouwen een bedrijf dat
          sterker, onafhankelijker en aantoonbaar overdraagbaar is.
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
      </div>
    </section>
  );
};

export default OutcomesSection;
