import logo from "@/assets/propasso-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground py-16">
      <div className="section-container">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <img
              src={logo}
              alt="Propasso"
              className="h-8 brightness-0 invert mb-6"
            />
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
              {[
                { label: "Aanpak", href: "#aanpak" },
                { label: "Waarom Propasso", href: "#waarom" },
                { label: "Voor wie", href: "#voor-wie" },
                { label: "Referenties", href: "#referenties" },
                { label: "Inzichten", href: "#inzichten" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/50 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
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
              className="mt-3 inline-block text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              info@propasso.nl
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Propasso. Alle rechten voorbehouden.
          </p>
          <a
            href="#"
            className="text-xs text-background/40 hover:text-background/60 transition-colors"
          >
            Privacyverklaring
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
