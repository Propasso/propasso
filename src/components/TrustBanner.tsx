import { motion } from "framer-motion";
import { Check } from "lucide-react";

const trustItems = [
  "CEPA-gecertificeerd adviseur",
  "Gespecialiseerd in MKB exitplanning",
  "12+ jaar ondernemer",
];

const TrustBanner = () => {
  return (
    <div className="w-full bg-primary border-b border-accent/40">
      <div className="section-container py-3">
        {/* Desktop: horizontal row */}
        <div className="hidden md:flex items-center justify-center gap-0">
          {trustItems.map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
            >
              {i > 0 && (
                <div className="w-px h-4 bg-accent/40 mx-6" />
              )}
              <div className="flex items-center gap-2">
                <Check className="w-[15px] h-[15px] text-accent shrink-0" strokeWidth={2.5} />
                <span className="text-[13px] font-medium uppercase tracking-[0.1em] text-primary-foreground/90">
                  {item}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex md:hidden flex-col gap-2.5 px-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
            >
              <Check className="w-[15px] h-[15px] text-accent shrink-0" strokeWidth={2.5} />
              <span className="text-[13px] font-medium uppercase tracking-[0.1em] text-primary-foreground/90">
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
