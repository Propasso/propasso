import { motion } from "framer-motion";
import optimizeImg from "@/assets/illustrations/propasso-optimize.svg";
import rocketImg from "@/assets/illustrations/propasso-rocket.png";
import boardImg from "@/assets/illustrations/propasso-board.png";
import teamImg from "@/assets/illustrations/propasso-team.png";
import visionImg from "@/assets/illustrations/propasso-vision.png";
import parachuteImg from "@/assets/illustrations/parachute.png";

const pillars = [
  {
    image: optimizeImg,
    title: "Bedrijfswaarde en winstgevendheid verbeteren",
    subtitle: "Structureel werken aan hogere marges en een sterker bedrijf",
    isSvg: true,
  },
  {
    image: rocketImg,
    title: "Bedrijfswaardering en waardedrijvers",
    subtitle: "Begrijp wat jouw onderneming waardevol maakt",
  },
  {
    image: visionImg,
    title: "Afhankelijkheid van de ondernemer verminderen",
    subtitle: "Bouw een organisatie die zonder jou kan draaien",
  },
  {
    image: boardImg,
    title: "Bedrijf overdraagbaar maken",
    subtitle: "Structuur, processen en governance op orde",
  },
  {
    image: teamImg,
    title: "Voorbereiding op bedrijfsoverdracht",
    subtitle: "Strategisch toewerken naar het juiste moment",
  },
  {
    image: parachuteImg,
    title: "Het persoonlijke en financiële plan na overdracht",
    subtitle: "Duidelijkheid over jouw toekomst na de verkoop",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const SaleReadySection = () => {
  return (
    <section id="aanpak" className="py-20 md:py-28">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">De zes pijlers van exit planning</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          Wat bepaalt of een bedrijfsoverdracht succesvol is?
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Een koper kijkt fundamenteel anders naar jouw onderneming dan jij als
          ondernemer. Waar jij potentie en historie ziet, zoekt een koper
          schaalbaarheid, overdraagbaarheid en voorspelbaarheid.
        </motion.p>

        <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="relative h-44 w-full bg-secondary overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/60" />
                <img
                  src={pillar.image}
                  alt={`${pillar.title} - Propasso exit planning`}
                  loading="lazy"
                  className={`relative z-10 object-contain transition-transform duration-500 group-hover:scale-105 ${
                    pillar.isSvg ? "h-20" : "h-full w-full object-cover"
                  }`}
                />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold leading-snug text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {pillar.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaleReadySection;
