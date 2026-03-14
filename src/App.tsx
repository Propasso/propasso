import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { CookieConsentProvider } from "@/hooks/use-cookie-consent";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import Styleguide from "./pages/Styleguide";
import Contact from "./pages/Contact";
import Werkwijze from "./pages/Werkwijze";
import OverPropasso from "./pages/OverPropasso";
import VeelgesteldeVragen from "./pages/VeelgesteldeVragen";
import Kennisbank from "./pages/Kennisbank";
import KennisbankPillar from "./pages/KennisbankPillar";
import KennisbankArticle from "./pages/KennisbankArticle";
import Disclaimer from "./pages/Disclaimer";
import Privacyverklaring from "./pages/Privacyverklaring";
import AlgemeneVoorwaarden from "./pages/AlgemeneVoorwaarden";
import Cookieverklaring from "./pages/Cookieverklaring";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/werkwijze" element={<Werkwijze />} />
    <Route path="/over-propasso" element={<OverPropasso />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/veelgestelde-vragen" element={<VeelgesteldeVragen />} />
    <Route path="/kennisbank" element={<Kennisbank />} />
    <Route path="/kennisbank/thema/:categorySlug" element={<KennisbankPillar />} />
    <Route path="/kennisbank/:slug" element={<KennisbankArticle />} />
    <Route path="/disclaimer" element={<Disclaimer />} />
    <Route path="/privacyverklaring" element={<Privacyverklaring />} />
    <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
    <Route path="/cookieverklaring" element={<Cookieverklaring />} />
    <Route path="/styleguide" element={<Styleguide />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CookieConsentProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
            <CookieConsent />
          </BrowserRouter>
        </CookieConsentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
