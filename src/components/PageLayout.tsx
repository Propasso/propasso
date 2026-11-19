import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
