import { motion } from "framer-motion";

const trustItems = [
  "CEPA-gecertificeerd adviseur",
  "Gespecialiseerd in MKB exitplanning",
  "12+ jaar ondernemer",
];

const TrustBanner = () => {
  return (
    <div
      className="relative w-full bg-primary"
      style={{ borderBottom: "1px solid hsla(var(--teal-medium), 0.5)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Desktop: horizontal row */}
        <div className="hidden md:flex items-center justify-center gap-0">
          {trustItems.map((item, i) => (
            <div key={item} className="flex items-center">
              {i > 0 && (
                <div
                  className="mx-6"
                  style={{
                    width: "1px",
                    height: "16px",
                    backgroundColor: "hsla(var(--teal-medium), 0.35)",
                  }}
                />
              )}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.15,
                  ease: [0, 0, 0.2, 1],
                }}
                className="flex items-center gap-2"
              >
                <span style={{ color: "#DEF249", fontSize: "15px" }}>✓</span>
                <span
                  className="text-primary-foreground/90"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase" as const,
                    fontWeight: 400,
                  }}
                >
                  {item}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex md:hidden flex-col gap-2.5 px-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.15,
                ease: [0, 0, 0.2, 1],
              }}
              className="flex items-center gap-2"
            >
              <span style={{ color: "#DEF249", fontSize: "15px" }}>✓</span>
              <span
                className="text-primary-foreground/90"
                style={{
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase" as const,
                  fontWeight: 400,
                }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
