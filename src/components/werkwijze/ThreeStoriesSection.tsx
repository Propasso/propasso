import { motion } from "framer-motion";
import { User, Building2, BarChart3 } from "lucide-react";

const stories = [
  {
    icon: User,
    title: "Het verhaal van de ondernemer",
    description:
      "Waar wil de ondernemer naartoe? Wat zijn de persoonlijke ambities, de tijdshorizon en de financiële doelen na overdracht?",
  },
  {
    icon: Building2,
    title: "Het verhaal van de onderneming",
    description:
      "Hoe sterk staat het bedrijf? Is het overdraagbaar, schaalbaar en niet afhankelijk van één persoon?",
  },
  {
    icon: BarChart3,
    title: "Het verhaal van de cijfers",
    description:
      "Wat vertellen de financiële prestaties? Zijn de marges gezond, de omzet voorspelbaar en de kosten beheersbaar?",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const ThreeStoriesSection = () => {
  return (
    <section className="py-24 md:py-36">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Kernprincipe</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          Drie verhalen moeten kloppen, en op elkaar aansluiten
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          De kern van onze aanpak: een succesvolle overdracht ontstaat alleen
          wanneer het verhaal van de ondernemer, de onderneming en de cijfers
          op één lijn liggen. Waar dat niet zo is, ontstaat frictie. En dat
          is precies waar ons traject begint.
        </motion.p>

        {/* Three stories */}
        <div className="mt-16 grid gap-px md:grid-cols-3 max-w-5xl">
          {stories.map((story, i) => {
            const Icon = story.icon;
            return (
              <motion.div
                key={story.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: 0.15 * i + 0.25 }}
                className="relative py-8 md:px-8 first:md:pl-0 last:md:pr-0"
              >
                {/* Vertical divider (not on first) */}
                {i > 0 && (
                  <div className="hidden md:block absolute left-0 top-8 bottom-8 w-px bg-border/30" />
                )}
                {/* Horizontal divider on mobile (not on first) */}
                {i > 0 && (
                  <div className="md:hidden absolute left-0 right-0 top-0 h-px bg-border/30" />
                )}

                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-5">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {story.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bridge to methodology */}
        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 text-base text-muted-foreground max-w-2xl leading-relaxed border-l-2 border-accent pl-6"
        >
          Dit principe vormt de basis van onze methodiek, geïnspireerd op de{" "}
          <a
            href="https://exit-planning-institute.org/value-acceleration-methodology"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            Value Acceleration Methodology
          </a>{" "}
          en vertaald naar de realiteit van het Nederlandse MKB.
        </motion.p>
      </div>
    </section>
  );
};

export default ThreeStoriesSection;
