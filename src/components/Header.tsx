import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logos/propasso-logo.png";
import logoP from "@/assets/logos/favicon.png";

const navItems = [
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Over Propasso", href: "/over-propasso" },
  { label: "Kennisbank", href: "/kennisbank" },
  { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compactLogo, setCompactLogo] = useState(false);
  const location = useLocation();

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
      <div className="section-container flex items-center justify-between h-20">
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-1">
            <Link
              to="/quickscan"
              className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foreground
                bg-gradient-to-r from-accent/10 to-primary/[0.06] border border-border/40
                hover:border-primary/30 hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.2)] transition-all duration-300
                overflow-hidden"
              style={{ borderLeft: '2px solid hsl(var(--primary))' }}
            >
              Quickscan
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-teal-medium transition-colors"
            >
              Contact
            </Link>
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
              <Link to="/" className="text-base font-medium text-foreground/70 hover:text-foreground py-2">
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-base font-medium text-foreground/70 hover:text-foreground py-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground mt-2"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
