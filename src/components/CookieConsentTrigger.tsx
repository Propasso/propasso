import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Fingerprint } from "lucide-react";

/**
 * Floating button (bottom-left) to reopen cookie preferences.
 * Only shown when the user has already made a choice.
 */
const CookieConsentTrigger = () => {
  const { isPending, reopenBanner } = useCookieConsent();

  if (isPending) return null;

  return (
    <button
      onClick={reopenBanner}
      aria-label="Cookievoorkeuren wijzigen"
      title="Cookievoorkeuren wijzigen"
      className="fixed bottom-4 left-4 z-40 w-10 h-10 rounded-full bg-foreground/80 text-background hover:bg-foreground flex items-center justify-center shadow-lg backdrop-blur-sm transition-all hover:scale-110"
    >
      <Fingerprint className="w-4 h-4" />
    </button>
  );
};

export default CookieConsentTrigger;
