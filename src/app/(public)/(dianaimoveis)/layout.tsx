import { Navbar } from "@/components/public/layout/Navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`${poppins.className}`}>
      <Navbar />
      {children}
    </section>
  );
}
