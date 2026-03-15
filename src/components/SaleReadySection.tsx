import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Bedrijfswaarde en winstgevendheid verbeteren",
    description:
      "Structureel werken aan hogere marges, sterkere resultaten en een bedrijf dat meer waard wordt.",
    slug: "bedrijfswaarde-en-winstgevendheid-verbeteren",
  },
  {
    number: "02",
    title: "Bedrijfswaardering en waardedrijvers",
    description:
      "Begrijpen wat jouw onderneming waardevol maakt in de ogen van een koper.",
    slug: "bedrijfswaardering-en-waardedrijvers",
  },
  {
    number: "03",
    title: "Afhankelijkheid van de ondernemer verminderen",
    description:
      "Een organisatie bouwen die onafhankelijk van de ondernemer kan functioneren.",
    slug: "afhankelijkheid-van-de-ondernemer-verminderen",
  },
  {
    number: "04",
    title: "Bedrijf overdraagbaar maken",
    description:
      "Structuur, processen en governance zodanig inrichten dat overdracht mogelijk wordt.",
    slug: "bedrijf-overdraagbaar-maken",
  },
  {
    number: "05",
    title: "Voorbereiding op bedrijfsoverdracht",
    description:
      "Strategisch toewerken naar het juiste moment met maximale regie en controle.",
    slug: "voorbereiding-op-bedrijfsoverdracht",
  },
  {
    number: "06",
    title: "Het persoonlijke en financiële plan",
    description:
      "Duidelijkheid creëren over jouw toekomst, vermogen en rol na de verkoop.",
    slug: "het-persoonlijke-en-financiele-plan-na-overdracht",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const SaleReadySection = () => {
  return (
    <section id="aanpak" className="py-24 md:py-32">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Het Exit Planning framework
          </motion.p>

          <motion.h2
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-balance"
          >
            De zes bouwstenen van een verkoopklaar bedrijf
          </motion.h2>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-5 text-lg text-muted-foreground leading-relaxed"
          >
            Exit Planning draait om zes samenhangende onderdelen die bepalen hoe
            waardevol en overdraagbaar een bedrijf is.
          </motion.p>
        </div>

        {/* Framework grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              {...fadeInUp}
              transition={{ duration: 0.45, delay: 0.06 * i }}
            >
              <Link
                to={`/kennisbank/thema/${pillar.slug}`}
                className="group relative flex flex-col h-full border-r border-b border-border p-8 md:p-10 transition-colors duration-300 hover:bg-secondary/50"
              >
                {/* Number */}
                <span className="text-4xl md:text-5xl font-bold text-primary/20 leading-none transition-colors duration-300 group-hover:text-primary/40">
                  {pillar.number}
                </span>

                {/* Title */}
                <h3 className="mt-5 text-base md:text-lg font-bold leading-snug text-foreground pr-6">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                  {pillar.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  Ontdek meer
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Conversion prompt */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-border bg-secondary/30 p-8 md:p-10"
        >
          <p className="text-lg md:text-xl font-semibold text-foreground leading-snug max-w-xl">
            Vraag je je af hoe jouw bedrijf scoort op deze zes onderdelen?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:gap-3 shrink-0"
          >
            Doe de Exit Quickscan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SaleReadySection;
