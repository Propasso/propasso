import { motion, Variants } from "framer-motion";

const trustItems = ["CEPA-gecertificeerd adviseur", "Gespecialiseerd in MKB exitplanning", "12+ jaar ondernemer"];

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path d="M2.5 7L5.5 10L11.5 4" stroke="#DEF249" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const TrustBanner = () => {
  return (
    <div
      className="w-full bg-primary mt-20"
      style={{
        borderBottom: "1px solid hsla(var(--teal-medium), 0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5">
        {/* Desktop */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {trustItems.map((item, i) => (
            <div key={item} className="flex items-center">
              {i > 0 && (
                <div
                  className="mx-5"
                  style={{
                    width: "1px",
                    height: "14px",
                    backgroundColor: "hsla(var(--teal-medium), 0.35)",
                  }}
                />
              )}
              <motion.div variants={itemVariants} className="flex items-center gap-2">
                <CheckIcon />
                <span
                  className="text-primary-foreground/80"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {item}
                </span>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Mobile */}
        <motion.div
          className="flex md:hidden flex-col gap-3 px-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {trustItems.map((item) => (
            <motion.div key={item} variants={itemVariants} className="flex items-center gap-2.5">
              <CheckIcon />
              <span
                className="text-primary-foreground/80"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBanner;
