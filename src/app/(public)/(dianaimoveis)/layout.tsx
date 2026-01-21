import "@/styles/public.css";
import { Footer } from "@/components/custom/public-layout/Footer";
import { Navbar } from "@/components/custom/public-layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
