import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/logos/propasso-logo.png";
import logoP from "@/assets/logos/favicon.png";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

// Werkwijze heeft een submenu. De links staan altijd in de HTML (ook voor zoekmachines);
// op desktop klapt het menu open bij hover of toetsenbordfocus, op mobiel staan ze ingesprongen.
const navItems: NavItem[] = [
  {
    label: "Werkwijze",
    href: "/werkwijze",
    children: [
      { label: "Overzicht", href: "/werkwijze" },
      { label: "Je persoonlijke plan", href: "/werkwijze/persoonlijk-plan-opstellen" },
    ],
  },
  { label: "Over Propasso", href: "/over-propasso" },
  { label: "Kennisbank", href: "/kennisbank" },
  { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compactLogo, setCompactLogo] = useState(false);
  const location = useLocation();

  const isKennisbankActive = location.pathname.startsWith("/kennisbank");
  const isWerkwijzeActive = location.pathname.startsWith("/werkwijze");

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${
      isActive
        ? "font-semibold text-foreground"
        : "font-medium text-foreground/70 hover:text-foreground"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-base py-2 transition-colors ${
      isActive
        ? "font-semibold text-foreground"
        : "font-medium text-foreground/70 hover:text-foreground"
    }`;

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setCompactLogo(y > window.innerHeight * 0.5);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-20 lg:h-24">
        <Link to="/" className="block">
          <motion.img
            key={compactLogo ? "compact" : "full"}
            src={compactLogo ? logoP : logo}
            alt="Propasso - Exit Planning & Bedrijfsoverdracht begeleiding voor MKB"
            className={`hidden sm:block ${compactLogo ? "h-10" : "h-10"}`}
            initial={{ opacity: 0.85, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          />

          <img src="/favicon.png" alt="Propasso - Exit Planning" className="h-10 sm:hidden" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            // Kennisbank is also active on /kennisbank/* (pillar + article pages); Werkwijze on /werkwijze/*
            const forceActive =
              (item.href === "/kennisbank" && isKennisbankActive) || (item.href === "/werkwijze" && isWerkwijzeActive);
            const link = (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href !== "/kennisbank"}
                className={({ isActive }) =>
                  navLinkClass({ isActive: isActive || forceActive })
                }
                aria-current={
                  location.pathname === item.href || forceActive ? "page" : undefined
                }
              >
                {item.label}
                {item.children && <ChevronDown size={14} className="ml-1 inline-block align-[-2px] opacity-60" aria-hidden="true" />}
              </NavLink>
            );
            if (!item.children) return link;
            return (
              <div key={item.href} className="relative group">
                {link}
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-150 absolute left-1/2 -translate-x-1/2 top-full pt-3">
                  <ul className="min-w-[13rem] rounded-xl border border-border bg-background p-2 shadow-lg">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavLink
                          to={child.href}
                          end
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2 text-sm transition-colors ${
                              isActive ? "font-semibold text-foreground bg-muted/60" : "font-medium text-foreground/70 hover:text-foreground hover:bg-muted/60"
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-3 ml-1">
            <NavLink
              to="/quickscan"
              onClick={() => {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: "cta_click_quickscan", page_path: window.location.pathname, event_source: "header" });
              }}
              aria-current={location.pathname === "/quickscan" ? "page" : undefined}
              className="relative inline-flex items-center justify-center rounded-full h-10 px-5 text-sm font-semibold text-foreground
                bg-gradient-to-r from-accent/10 to-primary/[0.06] border border-border/40
                hover:border-primary/30 hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.2)] transition-all duration-300
                overflow-hidden"
              style={{ borderLeft: '2px solid hsl(var(--primary))' }}
            >
              Verkoopklaarscan
            </NavLink>
            <NavLink
              to="/contact"
              aria-current={location.pathname === "/contact" ? "page" : undefined}
              className="inline-flex items-center justify-center rounded-full h-10 px-5 text-sm font-semibold text-primary-foreground bg-primary hover:bg-teal-medium transition-colors"
            >
              Contact
            </NavLink>
          </div>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label={mobileOpen ? "Sluit menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <nav className="section-container py-6 flex flex-col gap-4">
              <NavLink to="/" end className={mobileNavLinkClass}>
                Home
              </NavLink>
              {navItems.map((item) => {
                const forceActive = item.href === "/kennisbank" && isKennisbankActive;
                if (item.children) {
                  return (
                    <div key={item.href} className="flex flex-col">
                      <span className="text-base py-2 font-medium text-foreground/70">{item.label}</span>
                      <div className="flex flex-col gap-1 border-l border-border pl-4 ml-1">
                        {item.children.map((child) => (
                          <NavLink key={child.href} to={child.href} end className={mobileNavLinkClass}>
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href !== "/kennisbank"}
                    className={({ isActive }) =>
                      mobileNavLinkClass({ isActive: isActive || forceActive })
                    }
                    aria-current={
                      location.pathname === item.href || forceActive ? "page" : undefined
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
              <NavLink
                to="/quickscan"
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({ event: "cta_click_quickscan", page_path: window.location.pathname, event_source: "header_mobile" });
                }}
                end
                className={mobileNavLinkClass}
                aria-current={location.pathname === "/quickscan" ? "page" : undefined}
              >
                Verkoopklaarscan
              </NavLink>
              <NavLink
                to="/contact"
                aria-current={location.pathname === "/contact" ? "page" : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground mt-2"
              >
                Contact
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
