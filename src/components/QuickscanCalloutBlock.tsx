import QuickscanSideCallout from "@/components/QuickscanSideCallout";

interface QuickscanCalloutBlockProps {
  contextLine: string;
  withBackground?: boolean;
}

/**
 * Contextual wrapper for QuickscanSideCallout — adds an intro line
 * and optional soft background to embed the callout within a section.
 */
const QuickscanCalloutBlock = ({ contextLine, withBackground = false }: QuickscanCalloutBlockProps) => {
  return (
    <div
      className={`mt-12 md:mt-16 ${
        withBackground ? "bg-secondary/30 rounded-2xl p-6 md:p-8" : ""
      }`}
    >
      <p className="text-sm text-muted-foreground mb-3">{contextLine}</p>
      <QuickscanSideCallout />
    </div>
  );
};

export default QuickscanCalloutBlock;
