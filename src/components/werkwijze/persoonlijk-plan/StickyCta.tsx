import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { closing } from "./content";
import { pushEvent } from "@/lib/tracking";

/**
 * Vaste knop "Plan een kennismaking" onderin, alleen op mobiel (blauwdruk 13.2).
 * Verschijnt als de hero uit beeld is; verdwijnt zolang de agenda vaststaat (#wat-je-kwijtraakt in beeld)
 * en zodra het slot (#slot) in beeld komt. Laat links ruimte voor de cookieknop en houdt rekening met de onderrand
 * van de iPhone. Staat onder de cookiebanner (z-30), zodat die altijd voorgaat.
 */
const StickyCta = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const loss = document.getElementById("wat-je-kwijtraakt");
    const slot = document.getElementById("slot");
    let lossInView = false;
    let slotInView = false;
    const update = () => setShow(window.scrollY > window.innerHeight * 0.8 && !lossInView && !slotInView);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === loss) lossInView = e.isIntersecting;
        if (e.target === slot) slotInView = e.isIntersecting;
      });
      update();
    });
    if (loss) io.observe(loss);
    if (slot) io.observe(slot);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      className="lg:hidden fixed bottom-0 left-16 right-4 z-30 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-300"
      style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(1rem)", pointerEvents: show ? "auto" : "none" }}
      aria-hidden={!show}
    >
      <Link
        to="/contact"
        tabIndex={show ? 0 : -1}
        onClick={() => pushEvent("cta_click_contact", { event_source: "sticky" })}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_12px_30px_-10px_rgba(5,41,64,0.6)]"
      >
        {closing.stickyLabel}
        <ChevronRight size={18} />
      </Link>
    </div>
  );
};

export default StickyCta;
