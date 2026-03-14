import { Link } from "react-router-dom";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import logo from "@/assets/logos/propasso-logo.png";

const footerNav = [
{ label: "Home", href: "/" },
{ label: "Werkwijze", href: "/werkwijze" },
{ label: "Over Propasso", href: "/over-propasso" },
{ label: "Kennisbank", href: "/kennisbank" },
{ label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
{ label: "Contact", href: "/contact" }];


const Footer = () => {
  return (
    <footer className="bg-foreground py-16 opacity-85">
      <div className="section-container">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="Propasso"
                className="h-8 brightness-0 invert mb-6" />
              
            </Link>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              Wij begeleiden MKB-ondernemers naar maximale waarde en
              verkoopbaarheid in de jaren vóór de bedrijfsoverdracht.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-background/90 uppercase tracking-wider mb-4">
              Navigatie
            </h3>
            <ul className="space-y-2.5">
              {footerNav.map((link) =>
              <li key={link.href}>
                  <Link
                  to={link.href}
                  className="text-sm text-background/50 hover:text-background transition-colors">
                  
                    {link.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-background/90 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <p className="text-sm text-background/50 leading-relaxed">
              Neem vrijblijvend contact op voor een kennismaking.
            </p>
            <a
              href="mailto:info@propasso.nl"
              className="mt-3 inline-block text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
              
              info@propasso.nl
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Propasso. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/disclaimer"
              className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Disclaimer
            </Link>
            <Link
              to="/privacyverklaring"
              className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Privacyverklaring
            </Link>
            <Link
              to="/algemene-voorwaarden"
              className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Algemene Voorwaarden
            </Link>
            <Link
              to="/cookieverklaring"
              className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Cookieverklaring
            </Link>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;