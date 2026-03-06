import { motion } from "framer-motion";
import optimizeImg from "@/assets/illustrations/propasso-optimize.svg";
import rocketImg from "@/assets/illustrations/propasso-rocket.png";
import boardImg from "@/assets/illustrations/propasso-board.png";
import teamImg from "@/assets/illustrations/propasso-team.png";
import visionImg from "@/assets/illustrations/propasso-vision.png";

const pillars = [
  {
    image: optimizeImg,
    title: "Optimaliseren van resultaten",
    isSvg: true,
  },
  {
    image: rocketImg,
    title: "Onafhankelijkheid vergroten",
  },
  {
    image: boardImg,
    title: "Overdraagbare structuur",
  },
  {
    image: teamImg,
    title: "Exit-ready vóór de deal",
  },
  {
    image: visionImg,
    title: "Regie en helderheid",
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
          <p className="eyebrow">Wat maakt een bedrijf verkoopklaar</p>
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

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-base font-semibold text-foreground max-w-2xl"
        >
          De fundamenten die waarde en verkoopklaarheid bepalen:
        </motion.p>

        <div className="mt-12 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-4 h-32 w-full max-w-[180px] rounded-2xl bg-secondary overflow-hidden flex items-center justify-center p-4">
                <img
                  src={pillar.image}
                  alt={`${pillar.title} - Propasso verkoopklaarheid en bedrijfsoverdracht`}
                  loading="lazy"
                  className={`object-contain ${pillar.isSvg ? "h-20" : "h-full w-full object-cover rounded-xl"}`}
                />
              </div>
              <h3 className="text-sm font-bold leading-snug">{pillar.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaleReadySection;
