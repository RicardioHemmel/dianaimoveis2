"use client";

// Shadcn/ui components
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Next / React
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// Links
import { SIDEBAR_LINKS } from "@/utils/constants/sidebar-links";

export function AppSidebar() {
  // Returns the current pathname
  const pathname = usePathname();

  // Defines the main navigation items
  const mainNav = [
    SIDEBAR_LINKS.dashboard,
    SIDEBAR_LINKS.profile,
    SIDEBAR_LINKS.properties
  ];

  // Define the account navigation items on the footer
  const accountNav = {
    configuration: SIDEBAR_LINKS.settings,
    logout: SIDEBAR_LINKS.logout,
  };

  // Loading to disable logout button
  const [loading, setLoading] = useState<boolean>(false);

  // Router to push user after logout
  const router = useRouter();

  return (
    <Sidebar collapsible="icon">
      {/* Header with title */}
      <SidebarHeader>
        <div className="flex justify-end group-data-[collapsible=icon]:justify-center px-2 py-1">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1">
          <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center shrink-0">
            <Image src="/roundedLogo.png" alt="App logo" width={100} height={100} />
          </div>
          <span className="font-semibold truncate group-data-[collapsible=icon]:hidden">
            Diana Imóveis
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navegação Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.path}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Navigation */}
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={accountNav.configuration.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === accountNav.configuration.path}
                >
                  <Link href={accountNav.configuration.path}>
                    <accountNav.configuration.icon />
                    <span>{accountNav.configuration.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem key={accountNav.logout.title}>
                <SidebarMenuButton disabled={loading}>
                  <accountNav.logout.icon />
                  <span>{loading ? "Saindo..." : "Sair"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
