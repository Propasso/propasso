import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";

const OverPropasso = () => {
  return (
    <PageLayout>
      <section className="py-16 md:py-24">
        <div className="section-container">
          <p className="eyebrow">Over Propasso</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-balance">
            Onafhankelijke begeleiding bij exit planning en bedrijfsoverdracht
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Propasso begeleidt MKB-ondernemers in de 3-5 jaar vóór de bedrijfsoverdracht naar maximale waarde en verkoopbaarheid. Inhoud volgt binnenkort.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 section-alt-bg">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Onze missie</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Placeholder voor de missie en visie van Propasso. Inhoud volgt binnenkort.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Over Karel</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Placeholder voor het persoonlijke verhaal en achtergrond. Inhoud volgt binnenkort.
          </p>
        </div>
      </section>

      <PageCTA />
    </PageLayout>
  );
};

export default OverPropasso;
