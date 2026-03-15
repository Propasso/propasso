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
    <section className="py-24 md:py-36 section-alt-bg">
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

        {/* Elegant gap comparison */}
        <div className="mt-16 max-w-4xl">
          {gaps.map((gap, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.12 * i + 0.3 }}
              className="group"
            >
              <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6 md:gap-10 py-7 border-b border-border/15 last:border-b-0">
                {/* Founder perspective */}
                <div className="text-right">
                  {i === 0 && (
                    <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50 mb-3">
                      De ondernemer
                    </span>
                  )}
                  <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                    {gap.founder}
                  </p>
                </div>

                {/* Center divider */}
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>

                {/* Buyer perspective */}
                <div>
                  {i === 0 && (
                    <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50 mb-3">
                      De koper
                    </span>
                  )}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {gap.buyer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MKBRealitySection;
