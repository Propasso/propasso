import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookieConsent, CATEGORY_LABELS, type ConsentPreferences } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Cookie, Settings2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const CookieConsent = () => {
  const { isPending, acceptAll, rejectAll, savePreferences, preferences } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [localPrefs, setLocalPrefs] = useState<ConsentPreferences>(preferences);

  const handleOpenPreferences = () => {
    setLocalPrefs(preferences);
    setShowPreferences(true);
  };

  const handleSavePreferences = () => {
    savePreferences(localPrefs);
    setShowPreferences(false);
  };

  return (
    <AnimatePresence>
      {isPending && !showPreferences && (
        <motion.div
          key="banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-3xl mx-auto text-background rounded-2xl shadow-2xl p-5 md:p-6 border-0 border-primary border-none bg-inherit opacity-100">
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs text-background/80 leading-relaxed">
                Wij gebruiken cookies om de website goed te laten functioneren, je ervaring te verbeteren en het bereik
                van onze content te meten. Lees meer in onze{" "}
                <Link to="/cookieverklaring" className="text-accent hover:underline font-medium">
                  cookieverklaring
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenPreferences}
                className="rounded-full border-background/30 text-background hover:bg-background/10 hover:text-background gap-1.5"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Voorkeuren aanpassen
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={rejectAll}
                className="rounded-full border-background/30 text-background hover:bg-background/10 hover:text-background"
              >
                Alles weigeren
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="rounded-full bg-accent text-accent-foreground hover:brightness-110"
              >
                Alles accepteren
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {isPending && showPreferences && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPreferences(false)}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-background rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Cookievoorkeuren</h2>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Categories */}
            <div className="p-5 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kies welke categorieën cookies je wilt toestaan. Functionele cookies zijn altijd actief omdat deze
                noodzakelijk zijn voor de werking van de website.
              </p>

              {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((key) => {
                const cat = CATEGORY_LABELS[key];
                const isLocked = key === "functional";
                return (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/50 border border-border/20"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{cat.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{cat.description}</p>
                    </div>
                    <Switch
                      checked={isLocked ? true : localPrefs[key]}
                      disabled={isLocked}
                      onCheckedChange={(checked) => {
                        if (!isLocked) {
                          setLocalPrefs((prev) => ({ ...prev, [key]: checked }));
                        }
                      }}
                      className="flex-shrink-0"
                    />
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-border/30 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button variant="outline" size="sm" onClick={rejectAll} className="rounded-full">
                Alles weigeren
              </Button>
              <Button
                size="sm"
                onClick={handleSavePreferences}
                className="rounded-full bg-primary text-primary-foreground"
              >
                Voorkeuren opslaan
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  acceptAll();
                  setShowPreferences(false);
                }}
                className="rounded-full bg-accent text-accent-foreground hover:brightness-110"
              >
                Alles accepteren
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
