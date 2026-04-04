import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Pagina niet gevonden | Propasso"
        description="Deze pagina bestaat niet of is verplaatst."
        canonical="https://propasso.nl/404"
        noIndex={true}
      />
      <Header />
      <main className="pt-20">
        <section className="flex min-h-[60vh] items-center justify-center">
          <div className="section-container text-center max-w-xl">
            <p className="text-8xl font-bold text-primary/20 mb-6">404</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pagina niet gevonden
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              De pagina die je zoekt bestaat niet of is verplaatst.
              Ga terug naar de homepage of bekijk onze kennisbank.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Home size={16} />
                Naar homepage
              </Link>
              <Link
                to="/kennisbank"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Kennisbank bekijken
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
