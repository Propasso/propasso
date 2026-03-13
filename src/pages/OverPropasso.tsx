import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Shield, Briefcase, Users, Eye } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";
import TestimonialsSection from "@/components/TestimonialsSection";

import karelKantoor from "@/assets/images/karel-kantoor.jpeg";
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

const values = [
  {
    icon: Shield,
    title: "Onafhankelijk",
    description: "Altijd náást de ondernemer. Transparant, met jouw doel en belang centraal — niet de deal.",
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

      {/* ─── 1. HERO — Bezoeker-gericht ─── */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
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
            Je bedrijf is je <span className="text-primary">levenswerk</span>.{" "}
            <span className="text-muted-foreground">De juiste begeleiding maakt het verschil.</span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Propasso staat naast ondernemers die hun bedrijf willen laten groeien, herstructureren of
            verkoopklaar maken. Met ervaring uit het bedrijfsleven én het ondernemerschap.
          </motion.p>
        </div>
      </section>

      {/* ─── 2. WAARDEN — Belofte: zo werken wij ─── */}
      <section className="py-20 md:py-28 section-alt-bg">
        <div className="section-container">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="eyebrow justify-center">Hoe wij werken</p>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold">Waar Propasso voor staat</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Geen verkooppraatje, geen theoretische modellen. Dit is hoe wij werken — en waarom ondernemers ons vertrouwen.
            </p>
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
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. VERHAAL (compact) + foto ─── */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
              <p className="eyebrow">Karel Cremers</p>
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                Ondernemer voor ondernemers
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Na een loopbaan in Strategy & Development bij CRH Plc. — fusies, overnames, business
                  development — koos ik in 2013 voor ondernemerschap. Niet in een opwaartse markt, maar
                  midden in de recessie.
                </p>
                <p>
                  Ik begeleidde het familiebedrijf door een faillissement en doorstart, en bouwde het uit
                  tot een winstgevende organisatie. In 2023 stelde ik een directie aan, droeg de leiding over
                  en verkocht eind 2024 een groot deel van het bedrijf. Achteraf gezien was ik mijn eigen
                  Exit Planning adviseur.
                </p>
                <p>
                  Die ervaring — de groei, de dalen, de overdracht — is precies wat ik nu inzet voor
                  MKB-ondernemers via Propasso.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={karelMetOndernemers}
                  alt="Karel Cremers — oprichter van Propasso"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 md:-left-10 bg-accent rounded-xl px-6 py-4 shadow-lg max-w-[220px]">
                <p className="text-sm font-bold text-accent-foreground leading-snug">
                  "Mijn kracht zit in het combineren van ondernemerschap, strategie en cijfers."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 4. QUOTE + TESTIMONIALS ─── */}
      <section className="py-16 md:py-20 tint-teal-bg">
        <div className="section-container">
          <motion.blockquote {...fadeInUp} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-foreground text-balance">
              "Buiten je comfortzone — daar zit de echte winst."
            </p>
            <footer className="mt-6 text-muted-foreground text-base">
              — Karel Cremers, bergbeklimmer met hoogtevrees
            </footer>
          </motion.blockquote>
        </div>
      </section>

      <TestimonialsSection />

      {/* ─── 5. NAAM & MISSIE ─── */}
      <section className="py-20 md:py-28 section-alt-bg">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
              <p className="eyebrow">De naam</p>
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                Propasso — De Volgende Stap
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  De naam Propasso is een verbastering van het Italiaanse <em>Prossimi Passi</em> — "de
                  volgende stap". Het staat voor groei en vooruitgang.
                </p>
                <p>
                  <strong>Mijn overtuiging:</strong> verandering brengt onzekerheid, maar juist daar — buiten
                  de comfortzone — liggen vernieuwing, groei en versterking van zowel de onderneming als de
                  ondernemer.
                </p>
                <p>
                  Bij Propasso begeleid ik ondernemers bij het doorbreken van groeiplafonds, herstructurering
                  en het verkoopklaar maken van bedrijven. Want na het dal ligt de verrijking.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={mountainPassRoute}
                  alt="Illustratie van een bergpas met route — metafoor voor de volgende stap"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 6. PERSOONLIJK (kort) ─── */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp} transition={{ duration: 0.6 }} className="order-2 lg:order-1 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={viaFerrata}
                  alt="Karel Cremers in de bergen — via ferrata"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.15 }} className="order-1 lg:order-2">
              <p className="eyebrow">Persoonlijk</p>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight">Bergbeklimmer met hoogtevrees</h2>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Bergbeklimmer met hoogtevrees? Ja, echt. Ik geloof dat échte groei buiten je comfortzone
                  zit — zakelijk én privé. Ondanks lichte hoogtevrees trek ik elk jaar met vrienden de bergen
                  in: trailrunning, fietsen en bergwandelen.
                </p>
                <p>
                  Diezelfde mentaliteit breng ik mee in mijn werk: de moed om stappen te zetten die richting
                  geven en echte impact maken.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 7. MID-PAGE CTA ─── */}
      <section className="py-16 md:py-20 tint-teal-bg">
        <div className="section-container text-center">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-balance">
              Herken je dit? Laten we kennismaken.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Geen verkooppraatje — gewoon een goed gesprek over jouw situatie en ambities.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition"
              >
                Plan een kennismaking
                <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 8. TIMELINE ─── */}
      <section className="py-20 md:py-28 section-alt-bg">
        <div className="section-container">
          <motion.div {...fadeInUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="eyebrow justify-center">Mijn route</p>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold">Van strategie naar ondernemerschap</h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:ml-auto md:pl-10" : "md:mr-auto md:pr-10 md:text-right"
                }`}
              >
                <div
                  className={`absolute top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background z-10 ${
                    i % 2 === 0 ? "left-[18px] md:-left-[7px]" : "left-[18px] md:-right-[7px] md:left-auto"
                  }`}
                />

                <div className="pl-10 md:pl-0">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. FOTO'S + CTA ─── */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-lg md:col-span-2"
            >
              <img src={kantoor} alt="Propasso kantoor" className="w-full h-full object-cover aspect-[16/9]" />
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
