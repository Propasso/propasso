import { motion } from "framer-motion";

const gaps = [
  {
    founder: "De ondernemer is het bedrijf",
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
    founder: "Kennis zit bij de mensen, niet in systemen",
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
          Ondernemers beoordelen hun bedrijf op basis van wat zij hebben opgebouwd. Kopers kijken naar iets anders:
          risico, voorspelbaarheid en overdraagbaarheid.
        </motion.p>

        {/* Elegant gap comparison */}
        <div className="mt-16 max-w-4xl">
          {gaps.map((gap, i) => (
            <motion.div key={i} {...fadeInUp} transition={{ duration: 0.5, delay: 0.12 * i + 0.3 }} className="group">
              {/* Desktop: side-by-side */}
              <div className="hidden md:grid grid-cols-[1fr,auto,1fr] items-center gap-10 py-7 border-b border-border/15 last:border-b-0">
                <div className="text-right">
                  {i === 0 && (
                    <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50 mb-3">
                      De ondernemer
                    </span>
                  )}
                  <p className="text-base font-medium text-foreground leading-relaxed">{gap.founder}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <div>
                  {i === 0 && (
                    <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50 mb-3">
                      De koper
                    </span>
                  )}
                  <p className="text-base text-muted-foreground leading-relaxed">{gap.buyer}</p>
                </div>
              </div>

              {/* Mobile: stacked */}
              <div className="md:hidden py-6 border-b border-border/15 last:border-b-0 space-y-3">
                {i === 0 && (
                  <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50">
                    De ondernemer
                  </span>
                )}
                <p className="text-sm font-medium text-foreground leading-relaxed">{gap.founder}</p>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <div className="h-px flex-1 bg-border/20" />
                </div>
                {i === 0 && (
                  <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50">
                    De koper
                  </span>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">{gap.buyer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MKBRealitySection;
