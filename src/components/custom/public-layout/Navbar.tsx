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
import { Heart, Menu, Phone, Search } from "lucide-react";

// NEXT / REACT
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// NAVLINKS
import { navLinks } from "@/lib/constants/links/navbar-links";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/constants/links/contacts";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="flex justify-center min-h-20 border-b">
      <div className="w-[90%] max-w-7xl flex justify-between items-center">
        {/* LOGO */}
        <div className="max-w-[86px]">
          <Link href="/" className="block">
            <Image
              src="/DianaImoveisLogo.svg"
              alt="Navbar Logo"
              width={86}
              height={86}
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
                      className={`${
                        isActive ? "text-white bg-hero-bg px-3" : ""
                      } font-semibold hover:bg-zinc-200/70`}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* ACTIONS (WHATS + REDES) */}
        <div className="hidden xl:flex items-center gap-5">
          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-100 hover:bg-action-primary hover:text-tag transition-all duration-300"
            asChild
          >
            <Link href="/properties">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <Button asChild size={"lg"} variant={"gold"} className="rounded-full">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5 mr-2" />
              Fale Conosco
            </a>
          </Button>
        </div>

        {/* HAMBURGER MOBILE BUTTON */}
        <div className="md:hidden flex items-center gap-3">
          {/* SEARCH BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-100 hover:bg-action-primary hover:text-tag transition-all duration-300"
            asChild
          >
            <Link href="/properties">
              <Search className="size-5" />
            </Link>
          </Button>

          {/* FAVORITES BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="bg-gray-100 hover:bg-red-500"
          >
            <Link href="/favorites">
              <Heart className="size-5" />
            </Link>
          </Button>

          {/* HAMBURGUER BUTTON */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-white w-screen sm:max-w-screen z-10000"
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
                      className={`${
                        isActive
                          ? "text-white bg-hero-bg px-3 md:px-6 py-3 rounded-lg"
                          : ""
                      } font-semibold hover:bg-zinc-200/70 text-xl`}
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
