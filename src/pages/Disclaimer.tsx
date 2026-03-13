import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  return (
    <PageLayout>
      <section className="py-20 bg-background">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Disclaimer</h1>

          <div className="prose prose-lg text-muted-foreground space-y-6">
            <p>
              © {new Date().getFullYear()} Propasso. Alle rechten voorbehouden.
            </p>
            <p>
              De informatie op deze website dient uitsluitend ter algemene informatie en vormt geen juridisch, financieel of zakelijk advies. Er kunnen geen rechten aan worden ontleend en Propasso biedt geen garantie op specifieke resultaten. Hoewel wij ons inspannen voor de best mogelijke resultaten, garanderen wij geen specifiek eindresultaat.
            </p>
            <p>
              Claims of uitspraken op deze website over resultaten zijn indicatief en kunnen variëren per situatie. Geen enkele tekst op deze website kan worden beschouwd als een gegarandeerde belofte van succes.
            </p>
            <p>
              Propasso is niet aansprakelijk voor enige schade als gevolg van het gebruik van deze website, waaronder onjuistheden, verouderde informatie, technische storingen of beslissingen op basis van de verstrekte inhoud. Eventuele externe links vallen buiten de verantwoordelijkheid van Propasso.
            </p>
            <p>
              Onze privacyverklaring vindt u{" "}
              <Link to="/privacyverklaring" className="text-primary hover:text-primary/80 underline">
                hier
              </Link>
              . Voor de volledige voorwaarden verwijzen wij naar onze{" "}
              <Link to="/algemene-voorwaarden" className="text-primary hover:text-primary/80 underline">
                Algemene Voorwaarden
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Disclaimer;
