import { Link } from "react-router-dom";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const CookieConsent = () => {
  const { isPending, accept, reject } = useCookieConsent();

  return (
    <AnimatePresence>
      {isPending && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto bg-foreground text-background rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-background/80 leading-relaxed">
                Wij gebruiken cookies om de website goed te laten functioneren en je ervaring te verbeteren.
                Lees meer in onze{" "}
                <Link
                  to="/cookieverklaring"
                  className="text-accent hover:underline font-medium"
                >
                  cookieverklaring
                </Link>
                .
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={reject}
                className="rounded-full border-background/30 text-background hover:bg-background/10 hover:text-background flex-1 sm:flex-initial"
              >
                Weigeren
              </Button>
              <Button
                size="sm"
                onClick={accept}
                className="rounded-full bg-accent text-accent-foreground hover:brightness-110 flex-1 sm:flex-initial"
              >
                Accepteren
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
