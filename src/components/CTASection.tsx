import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" }
};

const CTASection = () => {
  return (
    <section id="quickscan" className="py-20 md:py-28 relative overflow-hidden">
      {/* Accent bg decoration */}
      <div className="absolute inset-0 bg-primary opacity-85" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/15 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/10 -translate-x-1/3 translate-y-1/3" />

      <div className="section-container relative z-10 text-center">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/60">
            Jouw volgende stap begint met Persoonlijk, Financieel en Bedrijfskundig inzicht
          </p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight text-primary-foreground text-balance">
          
          Een succesvolle bedrijfsoverdracht begint met weten waar jij én je bedrijf staan.
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
          
          Daarom starten we altijd met een gereedheidsscan; de mate waarin zowel de ondernemer als het bedrijf
          voorbereid zijn op een bedrijfsoverdracht. Daarna doen we de aantrekkelijkheidsonderzoek; hoe aantrekkelijk is
          je bedrijf vanuit het perspectief van de koper.
        </motion.p>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground hover:brightness-110 transition">
            
            Krijg inzicht in je verkoopklaarheid
            <ChevronRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary-foreground/30 px-7 py-4 text-base font-semibold text-primary-foreground hover:border-primary-foreground/60 transition-colors">
            
            Plan een kennismaking
            <ChevronRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>);

};

export default CTASection;