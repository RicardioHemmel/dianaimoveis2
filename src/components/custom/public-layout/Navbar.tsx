"use client";

// COMPONENTS
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// COMPONENT THAT HIDES ELEMENTS BUT KEEP THEM ON SCREEN FOR SCREEN READ USERS
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// ICONS
import { Menu, Phone, Search } from "lucide-react";

// NEXT / REACT
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// NAVLINKS
import { navLinks } from "@/lib/constants/links/navbar-links";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="bg-navbar-bg flex justify-center min-h-20 border-b">
      <div className="w-[90%] max-w-7xl flex justify-between items-center">
        {/* LOGO */}
        <div>
          <Link href="/">
            <Image
              width={95}
              height={95}
              src="/LogoDianaRemovedBg.png"
              alt="Navbar Logo"
              priority
            />
          </Link>
        </div>

        {/* MENU DESKTOP */}
        <NavigationMenu className="hidden md:block ml-10">
          <NavigationMenuList className="gap-2 lg:gap-6">
            {navLinks.map((item) => {
              const isActive = pathname === item.path;
              return (
                <NavigationMenuItem key={item.title} className="gap-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.path}
                      className={`font-semibold transition-colors px-3 py-2 rounded-md ${isActive ? "text-[var(--color-action-primary)]" : "text-navbar-text"} hover:text-white hover:bg-[var(--color-navbar-hover)]`}>
                      {item.title}
                    </Link>

                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* ACTIONS (WHATS + REDES) */}
        <div className="hidden xl:flex items-center gap-5 text-navbar-text">
          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-200 hover:bg-bg-tag hover:text-tag transition-all duration-300"
            asChild
          >
            <Link href="/properties">
              <Search className="bg-gray-200 h-5 w-5" />
            </Link>
          </Button>

          <Button asChild size={"lg"} variant={"gold"}>
            <a
              href="https://wa.me/5511966536993?text=Olá%20Diana,"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="text-navbar-text w-5 h-5 mr-2" />
              Entre em contato
            </a>
          </Button>
        </div>

        {/* HAMBURGER MOBILE BUTTON */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-white w-screen sm:max-w-screen "
              aria-describedby={undefined}
            >
              {/* ITS NECESSARY TO HAVE A TITLE FOR SCREEN READER USERS*/}
              <VisuallyHidden>
                <SheetTitle>Menu de navegação</SheetTitle>
              </VisuallyHidden>

              <nav className="h-screen flex flex-col items-center justify-center gap-10 mb-10">
                {navLinks.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.title}
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className={`${isActive ? "text-[#447C9C]" : ""
                        } font-semibold text-2xl`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
