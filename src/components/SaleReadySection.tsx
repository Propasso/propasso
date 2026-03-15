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

// Desktop positions — more spacious
const pillarPositions = [
  { x: 0, y: -260 },    // top center (02)
  { x: -280, y: -130 }, // top-left (01)
  { x: 280, y: -130 },  // top-right (03)
  { x: -280, y: 130 },  // bottom-left (04)
  { x: 280, y: 130 },   // bottom-right (05)
  { x: 0, y: 260 },     // bottom center (06)
];

// Map pillars clockwise: 01=top, 02=top-right, 03=bottom-right, 04=bottom, 05=bottom-left, 06=top-left
const positionMap = [0, 2, 4, 5, 3, 1];

const PillarNode = ({
  pillar,
  style,
  delay,
  onNav,
  index,
}: {
  pillar: (typeof pillars)[0];
  style: React.CSSProperties;
  delay: number;
  onNav: () => void;
  index: number;
}) => (
  <motion.button
    onClick={onNav}
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{ scale: 1.07, y: -4 }}
    className="absolute group cursor-pointer text-left focus:outline-none"
    style={style}
  >
    <div className="flex flex-col items-center text-center h-full justify-center rounded-2xl bg-background/60 backdrop-blur-sm border border-border/10 shadow-[0_1px_3px_0_hsl(var(--primary)/0.04)] group-hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.12)] group-hover:border-border/25 group-hover:bg-background/90 transition-all duration-500 ease-out p-4">
      {/* Number */}
      <span className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em] mb-2">
        {pillar.number}
      </span>

      {/* Icon in circular container */}
      <div className="w-14 h-14 mb-3 rounded-full bg-muted/40 group-hover:bg-muted/60 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
        <img
          src={pillar.image}
          alt={`${pillar.title} — Propasso Exit Planning`}
          loading="lazy"
          className={`object-contain transition-transform duration-500 ${
            pillar.isSvg ? "h-8 w-8" : "h-10 w-10 rounded-full object-cover"
          }`}
        />
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold leading-snug text-foreground tracking-tight">
        {pillar.title}
      </h3>

      {/* Description */}
      <p className="text-[11px] text-muted-foreground/70 leading-relaxed mt-1.5 max-w-[150px]">
        {pillar.description}
      </p>

      {/* Arrow */}
      <ArrowRight className="w-3.5 h-3.5 text-primary mt-2 opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out" />
    </div>
  </motion.button>
);

const SaleReadySection = () => {
  const navigate = useNavigate();

  return (
    <section id="aanpak" className="relative py-20 md:py-28 overflow-hidden">
      {/* Subtle background treatment */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
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

        {/* ── Desktop radial layout ── */}
        <div className="hidden lg:block mt-16">
          <div
            className="relative mx-auto"
            style={{ width: 760, height: 680 }}
          >
            {/* SVG lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 760 680"
            >
              <defs>
                <linearGradient
                  id="line-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.15"
                  />
                  <stop
                    offset="50%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.08"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.15"
                  />
                </linearGradient>
              </defs>
              {pillars.map((_, i) => {
                const pos = pillarPositions[positionMap[i]];
                const cx = 380;
                const cy = 340;
                return (
                  <motion.line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={cx + pos.x}
                    y2={cy + pos.y}
                    stroke="url(#line-grad)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.4 + i * 0.12,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </svg>

            {/* Center node */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute z-10 flex flex-col items-center justify-center"
              style={{
                left: 380 - 72,
                top: 340 - 72,
                width: 144,
                height: 144,
              }}
            >
              {/* Glow */}
              <div
                className="absolute inset-[-20px] rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
                }}
              />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-[hsl(var(--teal-deep))] flex flex-col items-center justify-center shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.35)]">
                <span className="text-primary-foreground text-[11px] font-bold uppercase tracking-[0.18em] leading-tight text-center">
                  Exit
                  <br />
                  Planning
                </span>
              </div>
            </motion.div>

            {/* Pillar nodes */}
            {pillars.map((pillar, i) => {
              const pos = pillarPositions[positionMap[i]];
              const nodeW = 200;
              const nodeH = 200;
              return (
                <PillarNode
                  key={pillar.number}
                  pillar={pillar}
                  index={i}
                  delay={0.5 + i * 0.08}
                  onNav={() =>
                    navigate(`/kennisbank/thema/${pillar.slug}`)
                  }
                  style={{
                    left: 380 + pos.x - nodeW / 2,
                    top: 340 + pos.y - nodeH / 2,
                    width: nodeW,
                    height: nodeH,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ── Tablet layout (md) ── */}
        <div className="hidden md:block lg:hidden mt-16">
          <div
            className="relative mx-auto"
            style={{ width: 600, height: 580 }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 580"
            >
              <defs>
                <linearGradient
                  id="line-grad-md"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.12"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.12"
                  />
                </linearGradient>
              </defs>
              {pillars.map((_, i) => {
                const positions = [
                  { x: -200, y: -110 },
                  { x: 0, y: -200 },
                  { x: 200, y: -110 },
                  { x: -200, y: 110 },
                  { x: 200, y: 110 },
                  { x: 0, y: 200 },
                ];
                const pos = positions[i];
                return (
                  <motion.line
                    key={i}
                    x1={300}
                    y1={290}
                    x2={300 + pos.x}
                    y2={290 + pos.y}
                    stroke="url(#line-grad-md)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
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
              style={{
                left: 300 - 56,
                top: 290 - 56,
                width: 112,
                height: 112,
              }}
            >
              <div
                className="absolute inset-[-14px] rounded-full opacity-15"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
                }}
              />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-[hsl(var(--teal-deep))] flex flex-col items-center justify-center shadow-[0_6px_30px_-6px_hsl(var(--primary)/0.3)]">
                <span className="text-primary-foreground text-[10px] font-bold uppercase tracking-[0.16em] leading-tight text-center">
                  Exit
                  <br />
                  Planning
                </span>
              </div>
            </motion.div>

            {(() => {
              const positions = [
                { x: -200, y: -110 },
                { x: 0, y: -200 },
                { x: 200, y: -110 },
                { x: -200, y: 110 },
                { x: 200, y: 110 },
                { x: 0, y: 200 },
              ];
              return pillars.map((pillar, i) => {
                const pos = positions[i];
                const nW = 170;
                const nH = 170;
                return (
                  <PillarNode
                    key={pillar.number}
                    pillar={pillar}
                    index={i}
                    delay={0.4 + i * 0.08}
                    onNav={() =>
                      navigate(`/kennisbank/thema/${pillar.slug}`)
                    }
                    style={{
                      left: 300 + pos.x - nW / 2,
                      top: 290 + pos.y - nH / 2,
                      width: nW,
                      height: nH,
                    }}
                  />
                );
              });
            })()}
          </div>
        </div>

        {/* ── Mobile layout ── */}
        <div className="md:hidden mt-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-10"
          >
            <div className="relative">
              <div
                className="absolute inset-[-12px] rounded-full opacity-15"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
                }}
              />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--teal-deep))] flex flex-col items-center justify-center shadow-[0_6px_24px_-6px_hsl(var(--primary)/0.3)]">
                <span className="text-primary-foreground text-[9px] font-bold uppercase tracking-[0.15em] leading-tight text-center">
                  Exit
                  <br />
                  Planning
                </span>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-border/10 via-border/20 to-border/10" />

            <div className="space-y-1">
              {pillars.map((pillar, i) => (
                <motion.button
                  key={pillar.number}
                  onClick={() =>
                    navigate(`/kennisbank/thema/${pillar.slug}`)
                  }
                  {...fadeInUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative flex items-center gap-4 w-full text-left pl-3 pr-4 py-3.5 rounded-xl hover:bg-muted/30 transition-all duration-400 focus:outline-none"
                >
                  <div className="relative z-10 flex-shrink-0 w-7 h-7 rounded-full border border-border/20 bg-background flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-[0_0_8px_hsl(var(--primary)/0.1)] transition-all duration-400">
                    <span className="text-[8px] font-bold text-muted-foreground/50 group-hover:text-primary/60 transition-colors duration-400">
                      {pillar.number}
                    </span>
                  </div>

                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-muted/30 flex items-center justify-center group-hover:bg-muted/50 transition-all duration-400">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      className={`object-contain transition-transform duration-400 group-hover:scale-110 ${
                        pillar.isSvg
                          ? "h-6 w-6"
                          : "h-8 w-8 rounded-full object-cover"
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground leading-snug tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-muted-foreground/60 leading-tight mt-0.5">
                      {pillar.description}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-primary opacity-0 translate-x-[-4px] group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-400 flex-shrink-0" />
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
