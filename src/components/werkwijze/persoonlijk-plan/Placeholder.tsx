/**
 * Zichtbare placeholder voor tekst die Karel nog aanlevert ([ERVARING KAREL], [KAREL VULT AAN]).
 * Alleen bedoeld voor de preview: vóór livegang moeten alle placeholders gevuld zijn.
 */
const Placeholder = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border-2 border-dashed border-primary/30 px-5 py-4 text-sm text-muted-foreground ${className}`}>
    {children}
  </div>
);

export default Placeholder;
