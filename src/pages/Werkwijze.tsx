import PageLayout from "@/components/PageLayout";
import PageCTA from "@/components/PageCTA";

const Werkwijze = () => {
  return (
    <PageLayout>
      <section className="py-16 md:py-24">
        <div className="section-container">
          <p className="eyebrow">Werkwijze</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight max-w-3xl text-balance">
            Hoe Propasso ondernemers begeleidt naar een succesvolle bedrijfsoverdracht
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Onze aanpak is gestructureerd, onafhankelijk en gericht op de lange termijn. Van inzicht tot verkoopklaarheid — wij begeleiden je in elke fase.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 section-alt-bg">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Fase 1: Inzicht & positionering</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            We starten met een grondige analyse van de onderneming, de rol van de ondernemer en de ambities richting overdracht. Inhoud volgt binnenkort.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Fase 2: Waardecreatie & voorbereiding</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            We werken aan structuur, overdraagbaarheid en voorspelbaarheid. Inhoud volgt binnenkort.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 section-alt-bg">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Fase 3: Regie & verkoopklaarheid</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            De ondernemer heeft regie over timing, voorwaarden en rol na overdracht. Inhoud volgt binnenkort.
          </p>
        </div>
      </section>

      <PageCTA />
    </PageLayout>
  );
};

export default Werkwijze;
