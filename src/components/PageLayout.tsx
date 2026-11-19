import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageAccentDot from "@/components/PageAccentDot";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <Header />
      <main className="relative pt-20 lg:pt-24">
        {!isHome && <PageAccentDot />}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;
