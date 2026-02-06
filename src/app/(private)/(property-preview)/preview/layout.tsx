import "@/styles/public.css";
import { Navbar } from "@/components/custom/public-layout/Navbar";

export default function PublicLayoutSimulation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
