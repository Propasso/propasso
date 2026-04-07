import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Professionele, deskundige en betrouwbare sparringspartner. Karel levert pragmatische oplossingen die impact maken. Ik beveel hem graag aan bij andere ondernemers.",
    author: "Tom Roos",
    role: "DGA Roos Groep | Fiber Dowels",
  },
  {
    quote:
      "Karel is oprecht geïnteresseerd in zowel ondernemer als onderneming. Hij is doortastend en betrokken en beperkt zich niet tot advies alleen, maar komt ook echt in actie. Dat maakt hem bijzonder in zijn vakgebied.",
    author: "Martijn van der Maas",
    role: "DGA Widemex",
  },
  {
    quote:
      "Karel's opdracht was het opschalen van een passiegedreven bedrijf tot een professionele onderneming, mét behoud van onze 'quirkiness', filosofie en identiteit. Hij pakte deze complexe transformatie met beide handen aan.",
    author: "Simon Wijnakker",
    role: "DGA Railcolor",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const TestimonialsSection = () => {
  return (
    <section id="referenties" className="py-16 md:py-24 lg:py-36">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Klanten en referenties</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight"
        >
          Wat klanten over ons zeggen
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base text-muted-foreground max-w-2xl leading-relaxed"
        >
          Verwacht geen adviseur in een pak met een vlotte babbel. Ik ben
          ondernemer geweest, heb multinationals helpen groeien, droeg mijn
          bedrijf over en verkocht het. Ik ken het en weet hoe mooi, maar ook
          hoe moeilijk ondernemen is.
        </motion.p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="relative bg-secondary rounded-2xl p-8 flex flex-col"
            >
              <Quote size={28} className="text-primary mb-4 shrink-0" />
              <p className="text-sm leading-relaxed text-foreground/80 italic flex-1">
                "{t.quote}"
              </p>
              <footer className="mt-6 pt-4 border-t border-border">
                <cite className="not-italic">
                  <span className="font-bold text-sm block">{t.author}</span>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
