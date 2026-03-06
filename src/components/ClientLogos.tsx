import reedElsevier from "@/assets/clients/reed-elsevier.png";
import bodi from "@/assets/clients/bodi.png";
import widemex from "@/assets/clients/widemex.svg";
import beJames from "@/assets/clients/bejames.png";
import fiberDowels from "@/assets/clients/fiber-dowels.png";
import crh from "@/assets/clients/crh.png";
import worxx from "@/assets/clients/worxx.png";
import railcolor from "@/assets/clients/railcolor.png";

const logos = [
  { src: reedElsevier, alt: "Reed Elsevier - klant van Propasso exit planning" },
  { src: bodi, alt: "Bodi - klant van Propasso bedrijfsoverdracht" },
  { src: widemex, alt: "Widemex - klant van Propasso waardecreatie" },
  { src: beJames, alt: "BeJames - klant van Propasso bedrijfsoptimalisatie" },
  { src: fiberDowels, alt: "Fiber Dowels - klant van Propasso exit readiness" },
  { src: crh, alt: "CRH - klant van Propasso bedrijfsoverdracht" },
  { src: worxx, alt: "Worxx - klant van Propasso exit planning" },
  { src: railcolor, alt: "RailColor Design - klant van Propasso bedrijfsoverdracht" },
];

const ClientLogos = () => {
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="py-14 border-y border-border/50 overflow-hidden">
      <div className="section-container mb-6">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
          Tevreden klanten van Propasso
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee items-center gap-16 w-max">
          {doubledLogos.map((logo, i) => (
            <img
              key={`${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              className="h-8 md:h-10 object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
