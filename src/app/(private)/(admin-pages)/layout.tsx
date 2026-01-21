import type { Metadata } from "next";
import { AppSidebar } from "@/components/custom/private-layout/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu, SquareArrowOutUpRight } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import AccessDenied from "@/components/custom/AccessDenied";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Painel Administrativo",
};

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "admin" && session?.user.role !== "super_admin") {
    return <AccessDenied />;
  } else {
    return (
      <SidebarProvider defaultOpen={true}>
        <section className={`min-h-screen flex w-full bg-background`}>
          <AppSidebar />
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Top Header */}
            <header className="h-16 border-b bg-card flex items-center px-6 gap-4 sticky top-0 z-10 shadow-sm">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <Toaster richColors position="top-right" />
              <div className="flex-1 flex justify-between">
                <h1 className="text-xl font-semibold text-foreground">
                  Dashboard
                </h1>

                <Button variant={"outline"} asChild>
                  <Link
                    href={process.env.NEXT_PUBLIC_BASE_URL!}
                    target="_blank"
                  >
                    <SquareArrowOutUpRight className="size-4" />
                    Ir para o site
                  </Link>
                </Button>
              </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 overflow-auto animate-in fade-in duration-500 fill-mode-both">
              {children}
            </main>
          </div>
        </section>
      </SidebarProvider>
    );
  }
}
