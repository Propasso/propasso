import type { SVGProps } from "react";

// Eigen themaiconen (richting B "Lijn", 24 nov 2026, akkoord Karel).
// 24px-raster, lijndikte 1,75 zoals lucide, kleur via currentColor.
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

// Verkoopklaar: afgevinkt en door naar de volgende eigenaar.
export const IconVerkoopklaar = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="3.5" cy="12.5" r="1.6" fill="currentColor" stroke="none" />
    <path d="M3.5 12.5l4.5 4.5L15.5 9.5H21" />
    <path d="M18 6.5l3 3-3 3" />
  </svg>
);

// Zelfstandig bedrijf: een lus die vanzelf blijft lopen.
export const IconZelfstandig = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 12c-2-2.7-3.6-4-5.5-4a4 4 0 0 0 0 8c1.9 0 3.5-1.3 5.5-4s3.6-4 5.5-4a4 4 0 0 1 0 8c-1.9 0-3.5-1.3-5.5-4z" />
    <circle cx="17.5" cy="8" r="2" fill="currentColor" stroke="none" />
  </svg>
);

// Waardering: exponentiële groei tegenover lineair; het vlak ertussen is de extra waarde.
export const IconWaardering = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 20.5L21 17.5" strokeDasharray="1.6 2.4" strokeWidth={1.4} />
    <path d="M3 20.5C11 20.5 16 17 21 4v13.5z" fill="currentColor" fillOpacity={0.18} stroke="none" />
    <path d="M3 20.5C11 20.5 16 17 21 4" />
    <circle cx="21" cy="4" r="1.7" fill="currentColor" stroke="none" />
  </svg>
);

// Familiebedrijf: de stam groeit door in een nieuwe tak.
export const IconFamilie = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M8 21.5V5.5" />
    <path d="M8 15c0-3.2 3-5.2 6.5-5.2" />
    <path d="M14.3 9.8c.6-3 3-4.7 6.2-4.3-.4 3.2-2.8 5-6.2 4.3z" fill="currentColor" stroke="none" />
    <path d="M8 5.5c-2.4-.2-4-1.6-4.3-3.8 2.4.1 4 1.5 4.3 3.8z" />
  </svg>
);

// Bedrijf verkocht en dan: de lijn passeert het verkoopmoment en loopt vrij verder.
export const IconEnDan = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M9.5 3.5v17" strokeOpacity={0.35} />
    <path d="M2.5 15h7c2.2 0 2.8-6 6-6 2.4 0 2.6 3.2 4.6 3.2" />
    <circle cx="20.6" cy="12.2" r="1.7" fill="currentColor" stroke="none" />
  </svg>
);
