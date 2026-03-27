import { useEffect, useRef } from "react";

const MEETINGS_SRC = "https://meetings-eu1.hubspot.com/karel-cremers?embed=true";
const SCRIPT_SRC = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

const HubSpotMeetingsEmbed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Avoid loading the script twice
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Cleanup not strictly needed — HubSpot script is idempotent
    };
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
