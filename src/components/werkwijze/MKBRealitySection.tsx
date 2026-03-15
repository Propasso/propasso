import { motion } from "framer-motion";

const gaps = [
  {
    founder: "De ondernemer ís het bedrijf",
    buyer: "De koper wil een bedrijf dat zelfstandig draait",
  },
  {
    founder: "Beslissingen lopen via één persoon",
    buyer: "De koper zoekt een managementlaag en governance",
  },
  {
    founder: "Omzet is goed, maar niet voorspelbaar",
    buyer: "De koper waardeert voorspelbare, terugkerende inkomsten",
  },
  {
    founder: "Kennis zit in hoofden, niet in systemen",
    buyer: "De koper verwacht gedocumenteerde processen",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const MKBRealitySection = () => {
  return (
    <section className="py-20 md:py-28 section-alt-bg">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">De realiteit</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          Een succesvol bedrijf is niet automatisch een overdraagbaar bedrijf
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Ondernemers beoordelen hun bedrijf op basis van wat zij hebben
          opgebouwd. Kopers kijken naar iets anders: risico, voorspelbaarheid
          en overdraagbaarheid.
        </motion.p>

        {/* Gap comparison */}
        <div className="mt-14 max-w-4xl">
          {/* Column headers */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-2 gap-8 md:gap-12 mb-6"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Hoe de ondernemer kijkt
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Hoe de koper kijkt
            </span>
          </motion.div>

          {/* Gap rows */}
          <div className="space-y-0">
            {gaps.map((gap, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: 0.15 * i + 0.3 }}
                className="grid grid-cols-2 gap-8 md:gap-12 py-5 border-t border-border/20"
              >
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  {gap.founder}
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {gap.buyer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MKBRealitySection;
