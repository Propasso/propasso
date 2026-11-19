/**
 * Gele "punch"-stip rechtsboven op alle pagina's behalve de homepage.
 * De homepage heeft een eigen, grotere stip in HeroSection.
 *
 * - Zit in PageLayout, dus elke pagina met PageLayout krijgt hem automatisch.
 * - Valt half achter de header; zodra de header bij scrollen een achtergrond krijgt, verdwijnt hij eronder.
 * - Ligt achter alle inhoud (-z-10) en is puur decoratief (aria-hidden).
 * - Grootte en positie zijn bewust zo gekozen dat hij op desktop alleen achter de Contact-knop valt,
 *   niet achter de Verkoopklaarscan-knop.
 */
const PageAccentDot = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[480px] overflow-hidden -z-10">
    <div
      className="absolute rounded-full bg-accent opacity-90
        w-[260px] h-[260px] -top-[50px] -right-[156px]
        md:w-[480px] md:h-[480px] md:-top-[150px] md:-right-[288px]
        lg:w-[640px] lg:h-[640px] lg:-top-[224px] lg:-right-[416px]"
    />
  </div>
);

export default PageAccentDot;
