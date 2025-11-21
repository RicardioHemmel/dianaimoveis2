"use client";

// Shadcnui components
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

// Component that hides elements but keep them on screen for screen read users
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Icons
import { Menu } from "lucide-react";

// Next / React
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// NavLinks
import { navLinks } from "@/utils/constants/navbar-links";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="flex justify-center min-h-20 border-b">
      <div className="w-[90%] max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              width={80}
              height={80}
              src="/LogoDianaRemovedBg.png"
              className="object-cover w-auto"
              alt="Navbar Logo"
              priority
            />
          </Link>
        </div>

        {/* Menu Desktop */}
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
                        isActive ? "text-[var(--default-navlink)]" : ""
                      } font-semibold hover:text-[var(--default-hover-navlink)]`}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Ações (Whats + redes) - escondo no mobile */}
        <div className="hidden xl:flex items-center gap-10">
          <a
            href={`https://wa.me/5511966536993?text=Olá%20Diana,`}
            className={`flex items-center gap-3`}
          >
            <p className="font-medium text-[15px]">(11) 96653-6993</p>
            <Image
              className="w-[19px] h-[19px]"
              src="/whatsappIcon.png"
              alt="Whatsapp Icon"
              width={19}
              height={19}
            />
          </a>

          <div className="flex gap-4">
            <a href="/" target="_blank">
              <Image
                src="/facebookIcon.png"
                alt="Facebook"
                width={21}
                height={21}
              />
            </a>
            <a href="/" target="_blank">
              <Image
                src="/instagramIcon.png"
                alt="Instagram"
                width={21}
                height={21}
              />
            </a>
          </div>
        </div>

        {/* Botão Hamburger Mobile */}
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
              {/* Its necessary to have a title for screen reader users*/}
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
                        isActive ? "text-[#447C9C]" : ""
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
