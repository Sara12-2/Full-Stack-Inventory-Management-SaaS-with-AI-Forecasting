import MarketingNavbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";  // ✅ Marketing Footer (Sahi)

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <Footer />  {/* ✅ Marketing Footer */}
    </div>
  );
}