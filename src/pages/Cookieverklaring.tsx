import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";

const Cookieverklaring = () => {
  return (
    <PageLayout>
      <section className="py-20 bg-background">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Cookieverklaring</h1>
          <p className="text-sm text-muted-foreground mb-8">Alle rechten voorbehouden.</p>

          <div className="prose prose-lg text-muted-foreground space-y-8">
            <div>
              <p className="text-sm text-muted-foreground/70">Versie: 14 maart 2026</p>
              <p className="text-sm text-muted-foreground/70">Van toepassing op: www.propasso.nl</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Wat zijn cookies?</h2>
              <p>
                Cookies zijn kleine tekstbestanden die door je browser worden opgeslagen wanneer je een website bezoekt.
                Ze worden gebruikt om de website goed te laten functioneren, je voorkeuren te onthouden en het gebruik
                van de website te analyseren.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Welke cookies gebruiken wij?</h2>

              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Functionele cookies</h3>
              <p>
                Deze cookies zijn noodzakelijk voor het functioneren van de website. Ze onthouden bijvoorbeeld je
                cookievoorkeuren. Deze cookies worden altijd geplaatst en vereisen geen toestemming.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Doel</th>
                      <th className="text-left p-3 font-semibold text-foreground">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3 font-mono text-xs">propasso_cookie_consent</td>
                      <td className="p-3">Onthoudt je cookievoorkeuren</td>
                      <td className="p-3">Onbeperkt (localStorage)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Cookies van derden</h3>
              <p>
                Onze website bevat een ingesloten Google Maps-kaart op de contactpagina. Google kan hierbij cookies
                plaatsen. Deze kaart wordt alleen geladen nadat je toestemming hebt gegeven via de cookiebanner.
              </p>
              <p className="mt-2">
                Meer informatie over de cookies van Google vind je in het{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  privacybeleid van Google
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Toestemming beheren</h2>
              <p>
                Bij je eerste bezoek aan onze website vragen wij je toestemming voor het plaatsen van niet-functionele
                cookies. Je kunt je toestemming op elk moment intrekken door je browsergegevens te wissen of door
                de cookiebanner opnieuw te laten verschijnen via het verwijderen van je opgeslagen voorkeuren.
              </p>
              <p className="mt-2">
                Je kunt cookies ook uitschakelen of verwijderen via de instellingen van je browser. Houd er rekening mee
                dat het uitschakelen van cookies de werking van de website kan beïnvloeden.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Je rechten</h2>
              <p>
                Je hebt het recht om je toestemming in te trekken, inzage te vragen in je gegevens, of verwijdering te
                verzoeken. Lees meer over je rechten in onze{" "}
                <Link to="/privacyverklaring" className="text-primary hover:underline font-medium">
                  privacyverklaring
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Contact</h2>
              <p>
                Heb je vragen over ons cookiebeleid? Neem dan contact met ons op:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
                <p>Propasso</p>
                <p>Nieuwe Linie 12, 5264 PJ Vught</p>
                <p>E-mail: info@propasso.nl</p>
                <p>Telefoon: 06 1005 7566</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Cookieverklaring;
