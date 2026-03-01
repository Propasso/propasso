import { motion } from "framer-motion";
import { Shield, Briefcase, Users, Eye, ChevronRight } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Onafhankelijk",
    description:
      "Altijd een betrokken partner náást de ondernemer. Transparant, met het doel en belang van de ondernemer centraal.",
  },
  {
    icon: Briefcase,
    title: "Professioneel",
    description:
      "Een integrale aanpak waarbij niet de deal centraal staat maar jij en je bedrijf. Een plan voor de DGA en de juiste stappen in structuur, leiderschap en duidelijke keuzes.",
  },
  {
    icon: Users,
    title: "Ondernemer & Ervaringsdeskundige",
    description:
      "Wij kennen de dynamiek van ondernemen en bedrijfsoverdracht uit eigen ervaring. Geen theoretische modellen, maar begeleiding door een betrokken partner met lange-termijnvisie.",
  },
  {
    icon: Eye,
    title: "Transparant & Betrokken",
    description:
      "Wij kennen het belang van integriteit en vertrouwen, maar weten ook wanneer we scherp en direct op de inhoud moeten zijn als een doorbraak nodig is.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const WhyPropasso = () => {
  return (
    <section id="waarom" className="py-20 md:py-28">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Partner voor succesvolle bedrijfsoverdracht</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          Waarom ondernemers kiezen voor Propasso
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Wij begeleiden ondernemers vóór de deal. Niet vanuit compliance,
          transacties of succesfees, maar vanuit het belang van de ondernemer en
          zijn bedrijf op de lange termijn.
        </motion.p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex gap-5 p-6 rounded-2xl border border-border/50 bg-background hover:shadow-md transition-shadow"
            >
              <div className="shrink-0 h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <value.icon size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.5 }} className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Meer weten?
            <ChevronRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPropasso;
