import { useEffect, useRef, useCallback } from "react";
import { pushEvent } from "@/lib/tracking";

const MEETINGS_SRC = "https://meetings-eu1.hubspot.com/karel-cremers?embed=true";
const SCRIPT_SRC = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

const HubSpotMeetingsEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookedRef = useRef(false);

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
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      className="meetings-iframe-container"
      data-src={MEETINGS_SRC}
    />
  );
};

export default HubSpotMeetingsEmbed;
