import { useState, useEffect } from "react";
import { SERVICE_CATEGORIES, CATEGORY_LABELS } from "@/hooks/use-cookie-consent";
import { AlertTriangle, CheckCircle2, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComplianceAlert {
  type: "missing_service" | "missing_category";
  severity: "warning" | "error";
  message: string;
}

/**
 * Dev-only tool: scans privacy policy text against cookie consent categories.
 * Warns if services or categories mentioned in the consent system are missing
 * from the privacy policy text.
 *
 * Only renders in development mode.
 */
const PrivacyComplianceScanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [privacyText, setPrivacyText] = useState("");
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([]);
  const [scanned, setScanned] = useState(false);
  const [autoFetched, setAutoFetched] = useState(false);

  // Only render in development
  if (import.meta.env.PROD) return null;

  const fetchPrivacyPage = async () => {
    try {
      const res = await fetch("/privacyverklaring");
      const html = await res.text();
      // Extract text content from HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const text = doc.body?.textContent || "";
      setPrivacyText(text);
      setAutoFetched(true);
    } catch {
      setAutoFetched(false);
    }
  };

  const scan = () => {
    const text = privacyText.toLowerCase();
    const results: ComplianceAlert[] = [];

    // Check each service
    for (const [service, category] of Object.entries(SERVICE_CATEGORIES)) {
      const searchTerms = [service.toLowerCase()];
      // Add common alternative names
      if (service === "Facebook Pixel") searchTerms.push("meta pixel", "facebook");
      if (service === "LinkedIn Insight Tag") searchTerms.push("linkedin");
      if (service === "Google Tag Manager") searchTerms.push("tag manager", "gtm");
      if (service === "Google Analytics") searchTerms.push("analytics");

      const found = searchTerms.some((term) => text.includes(term));
      if (!found) {
        results.push({
          type: "missing_service",
          severity: category === "functional" ? "warning" : "error",
          message: `Dienst "${service}" (categorie: ${CATEGORY_LABELS[category].title}) wordt niet genoemd in de privacyverklaring.`,
        });
      }
    }

    // Check category keywords
    const categoryKeywords: Record<string, string[]> = {
      functional: ["functioneel", "functionele cookies", "noodzakelijk"],
      statistics: ["statistiek", "statistieken", "analytisch", "analytische"],
      marketing: ["marketing", "advertentie", "tracking"],
    };

    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      const found = keywords.some((kw) => text.includes(kw));
      if (!found) {
        results.push({
          type: "missing_category",
          severity: "error",
          message: `Categorie "${CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS].title}" wordt niet als categorie benoemd in de privacyverklaring.`,
        });
      }
    }

    setAlerts(results);
    setScanned(true);
  };

  return (
    <div className="fixed top-4 right-4 z-[100] max-w-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-foreground text-background px-3 py-2 rounded-lg shadow-lg text-xs font-semibold hover:bg-foreground/90 transition-colors"
      >
        <Shield className="w-3.5 h-3.5" />
        Privacy Compliance Scanner
        {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {isOpen && (
        <div className="mt-2 bg-background border border-border rounded-xl shadow-2xl p-4 space-y-3 max-h-[70vh] overflow-y-auto">
          <p className="text-xs text-muted-foreground">
            Scan de privacyverklaring op ontbrekende diensten en categorieën uit de cookiebanner.
          </p>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs rounded-full" onClick={fetchPrivacyPage}>
              {autoFetched ? "Opnieuw ophalen" : "Pagina ophalen"}
            </Button>
            <Button
              size="sm"
              className="text-xs rounded-full"
              onClick={scan}
              disabled={!privacyText.trim()}
            >
              Scan uitvoeren
            </Button>
          </div>

          <textarea
            value={privacyText}
            onChange={(e) => {
              setPrivacyText(e.target.value);
              setScanned(false);
            }}
            placeholder="Plak hier de tekst van je privacyverklaring, of klik 'Pagina ophalen'..."
            className="w-full h-32 text-xs border border-border rounded-lg p-2 bg-muted/30 resize-y"
          />

          {scanned && (
            <div className="space-y-2">
              {alerts.length === 0 ? (
                <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-3 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">Alles in orde! Alle diensten en categorieën zijn gedekt.</span>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold text-destructive flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {alerts.length} compliance alert{alerts.length !== 1 ? "s" : ""}
                  </p>
                  {alerts.map((alert, i) => (
                    <div
                      key={i}
                      className={`text-xs p-2.5 rounded-lg ${
                        alert.severity === "error"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-accent/20 text-foreground"
                      }`}
                    >
                      {alert.message}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PrivacyComplianceScanner;
