import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

const SCRIPT_ID = "hs-script-loader";
const SCRIPT_SRC = "//js-eu1.hs-scripts.com/147744482.js";

/**
 * Loads the HubSpot tracking script once the visitor has consented
 * to statistics cookies. Guards against duplicate injection.
 */
const HubSpotTracking = () => {
  const { hasConsent } = useCookieConsent();
  const allowed = hasConsent("statistics");

  useEffect(() => {
    if (!allowed) return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.src = SCRIPT_SRC;
    document.body.appendChild(script);
  }, [allowed]);

  return null;
};

export default HubSpotTracking;