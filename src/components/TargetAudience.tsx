import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import exitSteps from "@/assets/illustrations/propasso-exit-steps.png";

const goodFit = [
  "Een winstgevend MKB-bedrijf met ambitie om binnen 3–5 jaar te verkopen",
  "Ziet dat het bedrijf minder afhankelijk moet zijn van jou als ondernemer",
  "Voelt dat waarde en overdraagbaarheid beter kunnen",
  "Bereid bent keuzes te maken die verder gaan dan alleen de cijfers",
  "Regie wilt over timing, voorwaarden en je rol na de overdracht",
];

const lessFit = [
  "Vooral zoekt naar begeleiding bij de transactie zelf",
  "Op korte termijn wilt verkopen zonder voorbereiding",
  "Alleen optimalisatie van cijfers verwacht",
  "Geen ruimte wilt maken voor structurele verandering",
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const TargetAudience = () => {
  return (
    <section id="voor-wie" className="py-16 md:py-24 lg:py-36 section-alt-bg">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Voor ondernemers die vooruit kijken</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-balance"
        >
          Voor wie is dit traject bedoeld?
        </motion.h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 items-start">
          <div className="space-y-10">
            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/30">
                  <Check size={16} className="text-primary" />
                </span>
                Dit traject past goed bij je als je:
              </h3>
              <ul className="space-y-3">
                {goodFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check size={16} className="shrink-0 mt-0.5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.3 }}>
              <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10">
                  <X size={16} className="text-destructive" />
                </span>
                Dit traject past minder goed als je:
              </h3>
              <ul className="space-y-3">
                {lessFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X size={16} className="shrink-0 mt-0.5 text-destructive/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.3 }} className="flex justify-center">
            <img
              src={exitSteps}
              alt="Propasso Exit Planning - 5 stappen naar verkoopklaarheid en succesvolle bedrijfsoverdracht"
              loading="lazy"
              className="max-w-sm w-full rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
