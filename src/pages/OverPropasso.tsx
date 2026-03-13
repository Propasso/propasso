import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight,
  Shield,
  Briefcase,
  Users,
  Eye,
  Mountain,
  Target,
  TrendingUp,
  Compass,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";

import karelMetOndernemers from "@/assets/images/karel-met-ondernemers.png";
import kantoor from "@/assets/images/kantoor.jpeg";
import viaFerrata from "@/assets/images/via-ferrata.png";
import mountainClimberSvg from "@/assets/images/mountain-climber-line-drawing.svg";
import mountainPassRoute from "@/assets/illustrations/mountain-pass-route.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const timeline = [
  {
    year: "Corporate",
    title: "Strategy, M&A & Business Development",
    description:
      "Jarenlange ervaring in strategie, fusies & overnames en business development binnen het corporate bedrijfsleven.",
  },
  {
    year: "2013",
    title: "Van corporate naar ondernemerschap",
    description:
      "Midden in de recessie het familiebedrijf begeleid door een faillissement en doorstart — en uitgebouwd tot een winstgevende, professionele organisatie.",
  },
  {
    year: "2023",
    title: "Overdracht & start Propasso",
    description:
      "De dagelijkse leiding overgedragen en Propasso gestart om ondernemers te helpen met groei, turnarounds en het verkoopklaar maken van hun bedrijf.",
  },
  {
    year: "Nu",
    title: "Partner voor MKB-ondernemers",
    description:
      "Begeleiding bij het doorbreken van groeiplafonds, herstructurering en het verkoopklaar maken van onderneming én ondernemer.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Onafhankelijk",
    description:
      "Altijd náást de ondernemer. Transparant, met jouw doel en belang centraal — niet de deal.",
  },
  {
    icon: Briefcase,
    title: "Professioneel",
    description:
      "Een integrale aanpak waarbij niet de transactie centraal staat, maar jij en je bedrijf. Strategie, structuur en duidelijke keuzes.",
  },
  {
    icon: Users,
    title: "Ervaringsdeskundige",
    description:
      "Geen theoretische modellen, maar begeleiding door iemand die zelf het ondernemerspad heeft bewandeld — inclusief de dalen.",
  },
  {
    icon: Eye,
    title: "Transparant & Direct",
    description:
      "Integriteit en vertrouwen als basis, maar scherp en direct op de inhoud wanneer een doorbraak nodig is.",
  },
];

const OverPropasso = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Over Propasso | Exit Planning & Bedrijfsoverdracht begeleiding</title>
        <meta
          name="description"
          content="Propasso begeleidt MKB-ondernemers bij exit planning en bedrijfsoverdracht. Leer meer over Karel Cremers, zijn achtergrond en de missie van Propasso."
        />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-10 right-0 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-accent/30 translate-x-1/3 blur-3xl" />
        <img
          src={mountainClimberSvg}
          alt=""
          className="absolute bottom-0 right-8 h-48 md:h-72 opacity-[0.06] pointer-events-none select-none"
        />

        <div className="section-container relative z-10 py-16 md:py-24">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Over Propasso</p>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl text-balance"
          >
            Ondernemer voor{" "}
            <span className="text-primary">ondernemers</span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 text-xl md:text-2xl font-semibold max-w-2xl"
            style={{ color: "hsl(var(--teal-medium))" }}
          >
            Betrokken en no-nonsense, met de nodige zelfspot.
          </motion.p>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Benoemt wat schuurt, hakt knopen en pakt door. Want echte groei
            begint waar comfort ophoudt.
          </motion.p>
        </div>
      </section>

      {/* ─── STORY: Van Corporate naar Ondernemerschap ─── */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
              <p className="eyebrow">Het verhaal</p>
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                Van de corporate wereld naar ondernemerschap
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  In 2013 verruilde ik een mooie loopbaan in het bedrijfsleven bij
                  CRH Plc., waar ik actief was in Strategy & Development (Fusies en
                  Overnames), voor ondernemerschap. Niet in een opwaartse markt,
                  maar midden in de recessie.
                </p>
                <p>
                  Ik begeleidde het familiebedrijf door een faillissement en
                  doorstart, en bouwde het stap voor stap uit tot een
                  winstgevende en professionele organisatie. Niet vanuit een
                  handboek, maar door te doen — met vallen, opstaan en af en
                  toe een stevig woord aan mezelf.
                </p>
                <p>
                  In 2023 droeg ik de dagelijkse leiding over en startte
                  Propasso. Om mijn passie voor groei, ontwikkeling en
                  verandering verder vorm te geven. Sindsdien help ik
                  MKB-ondernemers met het verkoopklaar maken van hun bedrijf
                  én zichzelf.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={karelMetOndernemers}
                  alt="Karel Cremers — oprichter van Propasso"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 md:-left-10 bg-accent rounded-xl px-6 py-4 shadow-lg max-w-[220px]">
                <p className="text-sm font-bold text-accent-foreground leading-snug">
                  "Mijn kracht zit in het combineren van ondernemerschap,
                  strategie en cijfers."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── QUOTE BREAK ─── */}
      <section className="py-16 md:py-20 tint-teal-bg">
        <div className="section-container">
          <motion.blockquote
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-foreground text-balance">
              "Buiten je comfortzone — daar zit de echte winst."
            </p>
            <footer className="mt-6 text-muted-foreground text-base">
              — Karel Cremers, bergbeklimmer met hoogtevrees
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* ─── PERSONAL: Bergbeklimmer met hoogtevrees ─── */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={viaFerrata}
                  alt="Karel Cremers in de bergen — via ferrata"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="order-1 lg:order-2"
            >
              <p className="eyebrow">Persoonlijk</p>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight">
                Bergbeklimmer met hoogtevrees
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Bergbeklimmer met hoogtevrees? Ja, echt. Ik geloof dat échte
                  groei en de mooiste ervaringen buiten je comfortzone zitten —
                  zakelijk én privé.
                </p>
                <p>
                  Het hooggebergte is daar het beste voorbeeld van. Ondanks
                  lichte hoogtevrees trek ik er elk jaar met vrienden naartoe.
                  Van Zuid-Limburg tot de Alpen en Tirol. Trailrunning, fietsen,
                  crossfit en bergwandelen — sport speelt een grote rol in mijn
                  leven.
                </p>
                <p>
                  En als we in de berghut arriveren, speel ik graag Risk. Waar
                  alle bondjes uiteindelijk ondergeschikt zijn aan de vraag: wie
                  durft op het juiste moment de rode dobbelstenen op te pakken?
                </p>
                <p className="text-xs italic text-muted-foreground/60">
                  * Ja, het Risk-bord gaat mee de rugzak in.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-20 md:py-28 section-alt-bg">
        <div className="section-container">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="eyebrow justify-center">Mijn route</p>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold">
              Van strategie naar ondernemerschap
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 md:w-1/2 ${
                  i % 2 === 0
                    ? "md:ml-auto md:pl-10"
                    : "md:mr-auto md:pr-10 md:text-right"
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background z-10 ${
                    i % 2 === 0
                      ? "left-[18px] md:-left-[7px]"
                      : "left-[18px] md:-right-[7px] md:left-auto"
                  }`}
                />

                <div className="pl-10 md:pl-0">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OVER PROPASSO: naam & missie ─── */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
              <p className="eyebrow">De naam</p>
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                Propasso — De Volgende Stap
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  De naam Propasso is een verbastering van het Italiaanse{" "}
                  <em>Prossimi Passi</em> — "de volgende stap". Het staat
                  voor groei en vooruitgang. Mijn kracht zit in het begeleiden
                  bij en succesvol maken van die volgende stap.
                </p>
                <p>
                  <strong>Mijn overtuiging:</strong> verandering brengt
                  onzekerheid, maar juist daar — buiten de comfortzone — liggen
                  vernieuwing, groei en versterking van zowel de onderneming als
                  de ondernemer.
                </p>
                <p>
                  Bij Propasso begeleid ik ondernemers bij het doorbreken van
                  groeiplafonds, herstructurering en het verkoopklaar maken van
                  bedrijven. Ik help hen om die stap te zetten, hoe uitdagend
                  of confronterend het proces ook is. Want na het dal ligt de
                  verrijking, groei en vooruitgang.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={mountainPassRoute}
                  alt="Illustratie van een bergpas met route naar de top — metafoor voor de volgende stap"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── APPROACH HIGHLIGHT ─── */}
      <section className="py-16 md:py-20 tint-teal-bg">
        <div className="section-container text-center">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
            <p className="eyebrow justify-center">Aanpak</p>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold max-w-3xl mx-auto text-balance">
              Een partner die verder kijkt
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Als fanatiek fietser, trailrunner, crossfitter en bergwandelaar
              weet ik dat elke stap richting de top moed en doorzettingsvermogen
              vraagt. Diezelfde mentaliteit breng ik mee in mijn werk: ik sta
              naast de ondernemer en samen zetten we stappen die richting geven
              en echte impact maken.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="eyebrow justify-center">Waarom Propasso</p>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold">
              Waar ik voor sta
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2">
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
        </div>
      </section>

      {/* ─── PHOTO SECTION ─── */}
      <section className="py-20 md:py-28 section-alt-bg">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-lg md:col-span-2"
            >
              <img
                src={kantoor}
                alt="Propasso kantoor"
                className="w-full h-full object-cover aspect-[16/9]"
              />
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={karelKantoor}
                alt="Karel Cremers"
                className="w-full h-full object-cover aspect-[3/4] md:aspect-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <PageCTA
        title="Benieuwd wat Propasso voor jou kan betekenen?"
        description="Neem vrijblijvend contact op voor een kennismaking. Geen verkooppraatje — gewoon een goed gesprek."
        primaryLabel="Neem contact op"
        secondaryLabel="Bekijk de werkwijze"
      />
    </PageLayout>
  );
};

export default OverPropasso;
