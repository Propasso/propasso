import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type ConsentStatus = "pending" | "accepted" | "rejected";

interface CookieConsentContextType {
  consent: ConsentStatus;
  accept: () => void;
  reject: () => void;
  isPending: boolean;
  hasConsented: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = "propasso_cookie_consent";

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<ConsentStatus>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "rejected") return stored;
    } catch {}
    return "pending";
  });

  const persist = useCallback((status: ConsentStatus) => {
    setConsent(status);
    try {
      localStorage.setItem(STORAGE_KEY, status);
    } catch {}
  }, []);

  const accept = useCallback(() => persist("accepted"), [persist]);
  const reject = useCallback(() => persist("rejected"), [persist]);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        accept,
        reject,
        isPending: consent === "pending",
        hasConsented: consent === "accepted",
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
