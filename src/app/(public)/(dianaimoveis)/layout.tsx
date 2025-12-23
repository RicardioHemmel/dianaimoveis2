import '@/styles/public.css'
import { Footer } from "@/components/public/layout/Footer";
import { Navbar } from "@/components/public/layout/Navbar";

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
