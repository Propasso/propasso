import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import karelPortretWarm from "@/assets/images/karel-portret-warm.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const MeetKarelSection = () => {
  return (
    <section className="py-16 md:py-24 lg:py-36 section-alt-bg">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={karelPortretWarm}
                  alt="Karel Cremers, oprichter van Propasso"
                  className="w-full h-auto object-cover aspect-[4/5]"
                  style={{ objectPosition: "center 25%" }}
                  loading="lazy"
                />
              </div>
              <div className="hidden md:block absolute -bottom-5 -left-5 lg:-left-8 bg-accent rounded-xl px-5 py-3 shadow-lg max-w-[220px]">
                <p className="text-sm font-bold text-accent-foreground leading-snug">
                  Ondernemer geweest. Nu jouw gids.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <p className="eyebrow">Maak kennis</p>
            <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
              Een gids die zelf de berg op is geweest
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                Ik ben Karel Cremers, oprichter van Propasso. Na jaren in strategie en M&amp;A bij een
                beursgenoteerde onderneming, koos ik voor het ondernemerschap. Ik bouwde een familiebedrijf uit,
                droeg het over en verkocht het. Precies de route waar veel ondernemers nu voor staan.
              </p>
              <p>
                Die ervaring zet ik in voor jou: nuchter, scherp op de cijfers en altijd náást de ondernemer.
                Geen lange rapporten, wel duidelijke keuzes.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to="/over-propasso"
                className="inline-flex items-center gap-1.5 text-base font-semibold text-primary hover:text-teal-medium transition-colors"
              >
                Meer over Karel
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-base font-semibold text-foreground/80 hover:text-primary transition-colors"
              >
                Plan een kennismaking
                <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetKarelSection;