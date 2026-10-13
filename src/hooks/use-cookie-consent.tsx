import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type ConsentCategory = "functional" | "statistics" | "marketing";

export interface ConsentPreferences {
  functional: boolean; // always true
  statistics: boolean;
  marketing: boolean;
}

type ConsentStatus = "pending" | "customized" | "all_accepted" | "all_rejected";

interface CookieConsentContextType {
  status: ConsentStatus;
  preferences: ConsentPreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Partial<ConsentPreferences>) => void;
  reopenBanner: () => void;
  isPending: boolean;
  hasConsent: (category: ConsentCategory) => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = "propasso_cookie_consent";

const DEFAULT_PREFERENCES: ConsentPreferences = {
  functional: true,
  statistics: false,
  marketing: false,
};

const ALL_ACCEPTED: ConsentPreferences = {
  functional: true,
  statistics: true,
  marketing: true,
};

const ALL_REJECTED: ConsentPreferences = {
  functional: true, // functional always on
  statistics: false,
  marketing: false,
};

interface StoredConsent {
  status: ConsentStatus;
  preferences: ConsentPreferences;
  timestamp: number;
}

/** Consent blijft 12 maanden geldig; daarna verschijnt de banner opnieuw. */
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000;

/** Synchroniseert de opgeslagen keuze met Google Consent Mode v2. */
function updateGtagConsent(prefs: ConsentPreferences) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: prefs.statistics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
}

function loadConsent(): { status: ConsentStatus; preferences: ConsentPreferences } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: StoredConsent = JSON.parse(raw);
      if (parsed.status && parsed.preferences) {
        const isExpired =
          typeof parsed.timestamp !== "number" || Date.now() - parsed.timestamp > CONSENT_TTL_MS;
        if (isExpired) {
          localStorage.removeItem(STORAGE_KEY);
          return { status: "pending", preferences: DEFAULT_PREFERENCES };
        }
        return { status: parsed.status, preferences: { ...parsed.preferences, functional: true } };
      }
    }
  } catch {}
  return { status: "pending", preferences: DEFAULT_PREFERENCES };
}

function persistConsent(status: ConsentStatus, preferences: ConsentPreferences) {
  try {
    const data: StoredConsent = { status, preferences, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

/** Services mapped to their consent category */
export const SERVICE_CATEGORIES: Record<string, ConsentCategory> = {
  "Google Tag Manager": "functional",
  Cloudflare: "functional",
  "Google Analytics": "statistics",
  "Google Search Console": "statistics",
  HubSpot: "statistics",
};

export const CATEGORY_LABELS: Record<ConsentCategory, { title: string; description: string }> = {
  functional: {
    title: "Functioneel",
    description: "Noodzakelijk voor de werking van de website. Altijd actief.",
  },
  statistics: {
    title: "Statistieken",
    description: "Helpen ons de website te verbeteren door anoniem gebruik te meten (Google Analytics, HubSpot).",
  },
  marketing: {
    title: "Marketing",
    description: "Voor gepersonaliseerde advertenties. Momenteel plaatsen wij geen marketingcookies.",
  },
};

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [{ status, preferences }, setState] = useState(loadConsent);

  // Bij laden van de pagina: geef een opgeslagen keuze door aan Google Consent Mode
  useEffect(() => {
    updateGtagConsent(preferences);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const acceptAll = useCallback(() => {
    const next = { status: "all_accepted" as const, preferences: ALL_ACCEPTED };
    setState(next);
    persistConsent(next.status, next.preferences);
    updateGtagConsent(next.preferences);
  }, []);

  const rejectAll = useCallback(() => {
    const next = { status: "all_rejected" as const, preferences: ALL_REJECTED };
    setState(next);
    persistConsent(next.status, next.preferences);
    updateGtagConsent(next.preferences);
  }, []);

  const savePreferences = useCallback((prefs: Partial<ConsentPreferences>) => {
    const merged: ConsentPreferences = {
      functional: true,
      statistics: prefs.statistics ?? false,
      marketing: prefs.marketing ?? false,
    };
    const next = { status: "customized" as const, preferences: merged };
    setState(next);
    persistConsent(next.status, next.preferences);
    updateGtagConsent(next.preferences);
  }, []);

  const reopenBanner = useCallback(() => {
    setState((prev) => ({ ...prev, status: "pending" as const }));
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const hasConsent = useCallback(
    (category: ConsentCategory) => {
      if (category === "functional") return true;
      return preferences[category] === true;
    },
    [preferences]
  );

  return (
    <CookieConsentContext.Provider
      value={{
        status,
        preferences,
        acceptAll,
        rejectAll,
        savePreferences,
        reopenBanner,
        isPending: status === "pending",
        hasConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
};
