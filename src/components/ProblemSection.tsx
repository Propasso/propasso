import { motion } from "framer-motion";
import { Clock, AlertTriangle, TrendingDown, Target } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Te laat beginnen",
    description:
      "Veel ondernemers denken pas aan verkoop als het moment zich aandient. Dan blijkt vaak dat het bedrijf er nog niet klaar voor is.",
  },
  {
    icon: AlertTriangle,
    title: "Wat ontbreekt",
    description:
      "De resultaten zijn goed, maar niet voorspelbaar. De ondernemer is onmisbaar in de operatie. Structuur en besluitvorming zijn niet overdraagbaar.",
  },
  {
    icon: TrendingDown,
    title: "Het gevolg",
    description:
      "Geen grip en overzicht, waardoor het proces vertraagt. De koper eist garanties, de waardering gaat omlaag of de deal ketst af.",
  },
  {
    icon: Target,
    title: "Waar het verschil zit",
    description:
      "Een succesvolle verkoop ontstaat niet in het laatste jaar. Die wordt opgebouwd in de 3 tot 5 jaar ervoor.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const ProblemSection = () => {
  return (
    <section id="probleem" className="py-20 md:py-28 section-alt-bg">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Het probleem dat ondernemers onderschatten</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          De meeste bedrijven zijn niet te laat om te verkopen, maar te laat om
          zich goed voor te bereiden.
        </motion.h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <problem.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
