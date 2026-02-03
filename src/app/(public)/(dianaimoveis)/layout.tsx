import "@/styles/public.css";
import { Footer } from "@/components/custom/public-layout/Footer";
import { Navbar } from "@/components/custom/public-layout/Navbar";
import { FloatingWhatsAppBtn } from "@/components/custom/FloatingWhatsAppBtn";
import { PrivacyConsentPopup } from "@/components/custom/PrivacyConsentPopup";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}

      <PrivacyConsentPopup />
      <FloatingWhatsAppBtn />
      <Footer />
    </section>
  );
}
