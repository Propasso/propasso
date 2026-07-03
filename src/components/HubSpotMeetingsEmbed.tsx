import { useEffect, useRef, useCallback } from "react";
import { pushEvent } from "@/lib/tracking";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const MEETINGS_SRC = "https://meetings-eu1.hubspot.com/karel-cremers?embed=true";
const SCRIPT_SRC = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

const HubSpotMeetingsEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookedRef = useRef(false);
  const { hasConsent, reopenBanner } = useCookieConsent();
  const allowed = hasConsent("statistics");

  const handleMessage = useCallback((event: MessageEvent) => {
    // Only accept messages from HubSpot meetings origin
    if (
      typeof event.origin === "string" &&
      !event.origin.includes("hubspot.com")
    ) {
      return;
    }

    if (event.data?.meetingBookSucceeded && !bookedRef.current) {
      bookedRef.current = true;
      pushEvent("meeting_booked", { event_source: "contact" });
    }
  }, []);

  useEffect(() => {
    if (!allowed) return;
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage, allowed]);

  useEffect(() => {
    if (!allowed) return;
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, [allowed]);

  if (!allowed) {
    return (
      <div className="rounded-xl border border-border/40 bg-muted/30 p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Cookie className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Agenda vereist statistiek-cookies
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
              De HubSpot-agenda plaatst cookies. Sta statistiek-cookies toe om
              direct een afspraak in te plannen, of bel/mail ons via de opties
              hiernaast.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={reopenBanner}
            className="rounded-full"
          >
            Cookievoorkeuren openen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="meetings-iframe-container"
      data-src={MEETINGS_SRC}
    />
  );
};

export default HubSpotMeetingsEmbed;
