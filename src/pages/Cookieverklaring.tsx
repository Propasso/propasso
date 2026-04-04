import SEO from "@/components/SEO";
import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

const Cookieverklaring = () => {
  const { reopenBanner } = useCookieConsent();

  return (
    <PageLayout>
      <SEO
        title="Cookieverklaring | Propasso"
        description="Cookieverklaring van Propasso. Lees welke cookies wij gebruiken, waarom en hoe u uw voorkeuren kunt beheren."
        canonical="https://propasso.nl/cookieverklaring"
        ogTitle="Cookieverklaring | Propasso"
        ogDescription="Cookieverklaring van Propasso. Lees welke cookies wij gebruiken, waarom en hoe u uw voorkeuren kunt beheren."
      />
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
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Welke cookies en diensten gebruiken wij?</h2>

              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Functionele cookies en diensten</h3>
              <p>
                Deze cookies en diensten zijn noodzakelijk voor het functioneren van de website. Ze worden altijd
                geplaatst en vereisen geen toestemming.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3 font-semibold text-foreground">Cookie / Dienst</th>
                      <th className="text-left p-3 font-semibold text-foreground">Doel</th>
                      <th className="text-left p-3 font-semibold text-foreground">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3 font-mono text-xs">propasso_cookie_consent</td>
                      <td className="p-3">Onthoudt je cookievoorkeuren</td>
                      <td className="p-3">12 maanden (localStorage)</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Google Tag Manager</td>
                      <td className="p-3">Beheer van tags en scripts op de website</td>
                      <td className="p-3">Sessie</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Cloudflare of vergelijkbaar</td>
                      <td className="p-3">Beveiliging, prestaties en bescherming tegen misbruik</td>
                      <td className="p-3">Sessie / max. 30 dagen</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Statistieken</h3>
              <p>
                Deze cookies en diensten helpen ons te begrijpen hoe bezoekers de website gebruiken.
                De verzamelde gegevens worden anoniem verwerkt. Deze worden alleen geplaatst met jouw toestemming.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3 font-semibold text-foreground">Dienst</th>
                      <th className="text-left p-3 font-semibold text-foreground">Doel</th>
                      <th className="text-left p-3 font-semibold text-foreground">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3">Google Analytics</td>
                      <td className="p-3">Websitestatistieken en bezoekersgedrag</td>
                      <td className="p-3">14 maanden</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Google Search Console</td>
                      <td className="p-3">Inzicht in zoekprestaties en indexering</td>
                      <td className="p-3">16 maanden</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">HubSpot</td>
                      <td className="p-3">Bezoekersanalyse, formulieropvolging en klantrelatiebeheer</td>
                      <td className="p-3">13 maanden</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Marketing en social media</h3>
              <p>
                Deze cookies en diensten worden gebruikt voor gerichte communicatie, advertenties en het integreren
                van externe content. Ze worden alleen geplaatst met jouw toestemming.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3 font-semibold text-foreground">Dienst</th>
                      <th className="text-left p-3 font-semibold text-foreground">Doel</th>
                      <th className="text-left p-3 font-semibold text-foreground">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3">Google Ads</td>
                      <td className="p-3">Advertentiecampagnes en conversietracking</td>
                      <td className="p-3">90 dagen</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Facebook Pixel (Meta)</td>
                      <td className="p-3">Advertentie-tracking en remarketing</td>
                      <td className="p-3">90 dagen</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">LinkedIn Insight Tag</td>
                      <td className="p-3">Advertentie-tracking en doelgroepanalyse</td>
                      <td className="p-3">90 dagen</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Hotjar of vergelijkbaar</td>
                      <td className="p-3">Heatmaps en gebruikerservaring-analyse</td>
                      <td className="p-3">365 dagen</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Google Maps</td>
                      <td className="p-3">Interactieve kaart op de contactpagina</td>
                      <td className="p-3">180 dagen</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">YouTube / Instagram embeds</td>
                      <td className="p-3">Ingesloten video's en social media content</td>
                      <td className="p-3">180 dagen</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Calendly of vergelijkbaar</td>
                      <td className="p-3">Inplannen van afspraken</td>
                      <td className="p-3">30 dagen</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm">
                Wij kunnen in de toekomst vergelijkbare diensten inzetten voor dezelfde doeleinden. Bij wezenlijke
                wijzigingen passen wij deze cookieverklaring en de{" "}
                <Link to="/privacyverklaring" className="text-primary hover:underline font-medium">
                  privacyverklaring
                </Link>{" "}
                aan.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Toestemming beheren</h2>
              <p>
                Bij je eerste bezoek aan onze website vragen wij je toestemming voor het plaatsen van niet-functionele
                cookies. Via de cookiebanner kun je per categorie aangeven welke cookies je wilt toestaan:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Functioneel</strong> — altijd actief (noodzakelijk voor de website)</li>
                <li><strong>Statistieken</strong> — voor het meten van websitegebruik</li>
                <li><strong>Marketing</strong> — voor gepersonaliseerde advertenties en social media</li>
              </ul>
              <p className="mt-4">
                Je kunt je voorkeuren op elk moment wijzigen via de vingerafdruk-knop linksonder op de website,
                of via onderstaande knop:
              </p>
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reopenBanner}
                  className="rounded-full gap-1.5"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  Cookievoorkeuren wijzigen
                </Button>
              </div>
              <p className="mt-4">
                Je kunt cookies ook uitschakelen of verwijderen via de instellingen van je browser. Houd er rekening mee
                dat het uitschakelen van cookies de werking van de website kan beïnvloeden.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Externe partijen</h2>
              <p>
                De bovengenoemde diensten van derden kunnen eigen cookies plaatsen en gegevens verwerken buiten
                de EER. Wij hebben geen controle over deze cookies. Door toestemming te geven via de cookiebanner,
                stem je in met de verwerking door deze partijen. Meer informatie vind je in het privacybeleid
                van de betreffende diensten:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google (Analytics, Ads, Maps, Tag Manager, Search Console)</a></li>
                <li><a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Meta (Facebook Pixel)</a></li>
                <li><a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a></li>
                <li><a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hotjar</a></li>
                <li><a href="https://legal.hubspot.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">HubSpot</a></li>
                <li><a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Calendly</a></li>
                <li><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cloudflare</a></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Je rechten</h2>
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
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Contact</h2>
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
