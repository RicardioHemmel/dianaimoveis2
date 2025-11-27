"use client";

// Sidebar Shadcnui
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Next / React
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { SIDEBAR_LINKS } from "@/lib/constants/links/sidebar-links";
import { LogOut, Settings } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);

  // Main navigation links
  const NAV_GROUPS = [
    SIDEBAR_LINKS.dashboard,
    SIDEBAR_LINKS.propertyList,
    SIDEBAR_LINKS.createProperty,
  ];

  function handleLogout() {
    signOut();
  }

  return (
    <Sidebar className="bg-[image:var(--gradient-primary)]">
      <SidebarHeader>
        <div className="px-6 py-6 border-b border-white/10">
          <Link href={SIDEBAR_LINKS.dashboard.path}>
            <div className="flex items-center gap-2">
              <Image
                src="/roundedLogo.png"
                alt="App logo"
                width={32}
                height={32}
              />
              <div>
                <h2 className="text-lg font-bold text-white">Diana Imóveis</h2>
                <p className="text-xs text-white/70">Painel Administrativo</p>
              </div>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      {/* Navegação principal */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>NAVEGAÇÃO PRINCIPAL</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_GROUPS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      isActive(item.path)
                        ? "bg-white/20 text-white shadow-lg"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }
                  >
                    <Link href={item.path}>
                      {item.icon && <item.icon className="size-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER SEPARADO */}
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={
                  isActive("/settings")
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }
              >
                <Link href="/settings">
                  <Settings />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <LogOut />
                  <span>Sair</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
