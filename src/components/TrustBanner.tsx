import { motion } from "framer-motion";

const trustItems = ["CEPA-gecertificeerd", "Gespecialiseerd in Exit Planning voor het MKB", "Ondernemer sinds 2013"];

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="8" fill="hsl(var(--primary) / 0.14)" />
    <path
      d="M5 8.2L7 10.2L11 6.2"
      stroke="hsl(var(--primary))"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrustBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
      className="mt-8"
    >
      <div className="inline-flex w-full max-w-[920px] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
        <div className="w-full px-5 py-4 md:px-6 md:py-4">
          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-6">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-3 min-w-0">
                <CheckIcon />
                <span className="text-sm leading-snug text-white/82">{item}</span>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-2.5 md:hidden">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-3 min-w-0">
                <CheckIcon />
                <span className="text-sm leading-snug text-white/82">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrustBanner;
