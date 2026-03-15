import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import optimizeImg from "@/assets/illustrations/propasso-optimize.svg";
import moneyImg from "@/assets/illustrations/propasso-money.png";
import rocketImg from "@/assets/illustrations/propasso-rocket.png";
import boardImg from "@/assets/illustrations/propasso-board.png";
import teamImg from "@/assets/illustrations/propasso-team.png";
import visionImg from "@/assets/illustrations/propasso-vision.png";

const pillars = [
  {
    number: "01",
    image: optimizeImg,
    title: "Winstgevendheid",
    description: "Structureel betere marges en omzetkwaliteit",
    slug: "bedrijfswaarde-en-winstgevendheid-verbeteren",
    isSvg: true,
  },
  {
    number: "02",
    image: moneyImg,
    title: "Waardedrijvers",
    description: "Inzicht in wat je bedrijf écht waardevol maakt",
    slug: "bedrijfswaardering-en-waardedrijvers",
  },
  {
    number: "03",
    image: rocketImg,
    title: "Onafhankelijkheid",
    description: "Minder afhankelijk van jou als ondernemer",
    slug: "afhankelijkheid-van-de-ondernemer-verminderen",
  },
  {
    number: "04",
    image: boardImg,
    title: "Structuur & Governance",
    description: "Overdraagbare organisatie en processen",
    slug: "bedrijf-overdraagbaar-maken",
  },
  {
    number: "05",
    image: visionImg,
    title: "Inzicht en Overzichtelijkheid",
    description: "Regie, helderheid en strategische sturing",
    slug: "voorbereiding-op-bedrijfsoverdracht",
  },
  {
    number: "06",
    image: teamImg,
    title: "Persoonlijke & financiële planning",
    description: "Jouw toekomst na de overdracht",
    slug: "persoonlijk-en-financieel-plan",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

// Positions for the hexagonal/radial layout around the center
// Desktop positions (relative to center, in px)
const pillarPositions = [
  { x: 0, y: -220 },    // top center (02)
  { x: -240, y: -110 }, // top-left (01)
  { x: 240, y: -110 },  // top-right (03)
  { x: -240, y: 110 },  // bottom-left (04)
  { x: 240, y: 110 },   // bottom-right (05)
  { x: 0, y: 220 },     // bottom center (06)
];

// Reorder: map pillars to positions as specified in the layout
// (1) top-left, (2) top, (3) top-right, (4) bottom-left, (5) bottom-right, (6) bottom
const positionMap = [1, 0, 2, 3, 4, 5];

const SaleReadySection = () => {
  const navigate = useNavigate();

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

        {/* Desktop radial layout */}
        <div className="hidden lg:block mt-16">
          <div className="relative mx-auto" style={{ width: 680, height: 580 }}>
            {/* SVG connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 680 580"
            >
              {pillars.map((_, i) => {
                const pos = pillarPositions[positionMap[i]];
                const cx = 340;
                const cy = 290;
                return (
                  <motion.line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={cx + pos.x}
                    y2={cy + pos.y}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Center circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute z-10 flex flex-col items-center justify-center"
              style={{
                left: 340 - 64,
                top: 290 - 64,
                width: 128,
                height: 128,
              }}
            >
              <div className="w-full h-full rounded-full bg-primary flex flex-col items-center justify-center shadow-lg">
                <span className="text-primary-foreground text-[11px] font-semibold uppercase tracking-widest leading-tight text-center">
                  Exit
                  <br />
                  Planning
                </span>
              </div>
            </motion.div>

            {/* Pillar nodes */}
            {pillars.map((pillar, i) => {
              const pos = pillarPositions[positionMap[i]];
              const nodeW = 180;
              const nodeH = 160;
              return (
                <motion.button
                  key={pillar.number}
                  onClick={() =>
                    navigate(`/kennisbank/thema/${pillar.slug}`)
                  }
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.06 }}
                  className="absolute group cursor-pointer text-left focus:outline-none"
                  style={{
                    left: 340 + pos.x - nodeW / 2,
                    top: 290 + pos.y - nodeH / 2,
                    width: nodeW,
                    height: nodeH,
                  }}
                >
                  <div className="flex flex-col items-center text-center h-full justify-center rounded-2xl border border-transparent group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300 p-3">
                    <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest mb-1">
                      {pillar.number}
                    </span>
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                      <img
                        src={pillar.image}
                        alt={`${pillar.title} - Propasso Exit Planning`}
                        loading="lazy"
                        className={`object-contain ${pillar.isSvg ? "h-10" : "h-12 w-12 rounded-lg object-cover"}`}
                      />
                    </div>
                    <h3 className="text-sm font-bold leading-snug text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-1">
                      {pillar.description}
                    </p>
                    <ArrowRight className="w-3.5 h-3.5 text-accent mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tablet layout (md) */}
        <div className="hidden md:block lg:hidden mt-16">
          <div className="relative mx-auto" style={{ width: 560, height: 520 }}>
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 560 520"
            >
              {pillars.map((_, i) => {
                const positions = [
                  { x: -180, y: -100 },
                  { x: 0, y: -180 },
                  { x: 180, y: -100 },
                  { x: -180, y: 100 },
                  { x: 180, y: 100 },
                  { x: 0, y: 180 },
                ];
                const pos = positions[i];
                return (
                  <motion.line
                    key={i}
                    x1={280}
                    y1={260}
                    x2={280 + pos.x}
                    y2={260 + pos.y}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                  />
                );
              })}
            </svg>

            {/* Center */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute z-10"
              style={{ left: 280 - 50, top: 260 - 50, width: 100, height: 100 }}
            >
              <div className="w-full h-full rounded-full bg-primary flex flex-col items-center justify-center shadow-lg">
                <span className="text-primary-foreground text-[10px] font-semibold uppercase tracking-widest leading-tight text-center">
                  Exit
                  <br />
                  Planning
                </span>
              </div>
            </motion.div>

            {(() => {
              const positions = [
                { x: -180, y: -100 },
                { x: 0, y: -180 },
                { x: 180, y: -100 },
                { x: -180, y: 100 },
                { x: 180, y: 100 },
                { x: 0, y: 180 },
              ];
              return pillars.map((pillar, i) => {
                const pos = positions[i];
                const nW = 160;
                const nH = 140;
                return (
                  <motion.button
                    key={pillar.number}
                    onClick={() => navigate(`/kennisbank/thema/${pillar.slug}`)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    whileHover={{ scale: 1.05 }}
                    className="absolute group cursor-pointer text-left focus:outline-none"
                    style={{
                      left: 280 + pos.x - nW / 2,
                      top: 260 + pos.y - nH / 2,
                      width: nW,
                      height: nH,
                    }}
                  >
                    <div className="flex flex-col items-center text-center h-full justify-center rounded-2xl border border-transparent group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300 p-2">
                      <span className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest mb-1">
                        {pillar.number}
                      </span>
                      <div className="w-10 h-10 mb-1.5 flex items-center justify-center">
                        <img
                          src={pillar.image}
                          alt={pillar.title}
                          loading="lazy"
                          className={`object-contain ${pillar.isSvg ? "h-8" : "h-10 w-10 rounded-lg object-cover"}`}
                        />
                      </div>
                      <h3 className="text-xs font-bold leading-snug text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.button>
                );
              });
            })()}
          </div>
        </div>

        {/* Mobile layout - vertical list with connecting line */}
        <div className="md:hidden mt-12">
          {/* Center label */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-primary flex flex-col items-center justify-center shadow-lg">
              <span className="text-primary-foreground text-[9px] font-semibold uppercase tracking-widest leading-tight text-center">
                Exit
                <br />
                Planning
              </span>
            </div>
          </motion.div>

          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border/30" />

            <div className="space-y-2">
              {pillars.map((pillar, i) => (
                <motion.button
                  key={pillar.number}
                  onClick={() => navigate(`/kennisbank/thema/${pillar.slug}`)}
                  {...fadeInUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative flex items-center gap-4 w-full text-left pl-3 pr-4 py-3 rounded-xl hover:bg-accent/5 transition-all duration-300 focus:outline-none"
                >
                  {/* Node dot on the line */}
                  <div className="relative z-10 flex-shrink-0 w-7 h-7 rounded-full border-2 border-border/30 bg-background flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                    <span className="text-[8px] font-bold text-muted-foreground/60">
                      {pillar.number}
                    </span>
                  </div>

                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      className={`object-contain ${pillar.isSvg ? "h-8" : "h-10 w-10 rounded-lg object-cover"}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      {pillar.description}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleReadySection;
