import { motion } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Inzicht & positionering",
    description:
      "We starten met inzicht in de onderneming, de rol van de ondernemer en de ambities richting overdracht. Waar staat het bedrijf nu? Wat maakt het aantrekkelijk en waar zit risico of afhankelijkheid?",
  },
  {
    number: "02",
    title: "Waardecreatie & voorbereiding",
    description:
      "We werken aan toegevoegde waarde, heldere structuur en het wegnemen van risico's. Resultaten worden voorspelbaarder, structuur wordt overdraagbaar en de organisatie minder afhankelijk van de ondernemer.",
  },
  {
    number: "03",
    title: "Regie & verkoopklaarheid",
    description:
      "In de laatste fase ligt de focus op regie. De ondernemer weet waar hij staat, welke keuzes mogelijk zijn en wanneer het juiste moment daar is. Met controle over timing, voorwaarden en rol na overdracht.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const PhasesSection = () => {
  return (
    <section className="py-20 md:py-28 section-alt-bg">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">De drie fases van een bedrijfsoverdracht</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          Zo begeleiden wij ondernemers richting verkoop
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Wij gaan voor een gestructureerd traject dat start in de 3 tot 5 jaar
          vóór de verkoop. Stap voor stap en schouder-aan-schouder, in het tempo
          van de onderneming én de ondernemer.
        </motion.p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.number}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="relative bg-background rounded-2xl p-8 shadow-sm border border-border/50"
            >
              <span className="text-5xl font-bold text-accent/40 font-serif">
                {phase.number}
              </span>
              <h3 className="mt-4 text-xl font-bold">{phase.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhasesSection;
