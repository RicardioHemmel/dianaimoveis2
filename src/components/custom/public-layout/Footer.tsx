import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getExperienceYears } from "@/lib/formatters/ui-formatters/experience-years";
import {
  whatsappLink,
  facebookLink,
  instagramLink,
  callLink,
  emailLink,
} from "@/lib/constants/links/contacts";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const experienceYears = getExperienceYears();
  return (
    <footer className="relative bg-hero-bg text-primary-foreground overflow-hidden border-t border-primary-foreground/5">
      {/* MAIN FOOTER CONTENT */}
      <div className="container mx-auto px-4 xl:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-16 max-w-7xl mx-auto">
          {/*  COLUMN 1: BRAND --- */}
          <div className="flex flex-col items-center xl:items-start w-full">
            <div className="max-w-xs xl:max-w-none text-center xl:text-left">
              <h3 className="font-semibold mb-6 flex items-center gap-2 justify-center xl:justify-start">
                <span className="w-8 h-0.5 bg-action-primary rounded-full" />
                Diana Imóveis
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
                Há mais de {experienceYears} anos em São Paulo, conectamos você
                às melhores oportunidades de moradia e investimento.
              </p>
              <div className="flex gap-3 justify-center xl:justify-start">
                {[
                  { icon: Instagram, href: instagramLink },
                  { icon: Facebook, href: facebookLink },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="size-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/20"
                    aria-label={`Link para ${social.icon.name}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2 - LINKS */}
          <div className="flex flex-col items-center">
            <div className="w-fit flex flex-col items-start">
              <h3 className="font-semibold mb-6 flex items-center gap-2 self-start">
                <span className="w-8 h-0.5 bg-yellow-500" />
                Links Rápidos
              </h3>

              <ul className="space-y-3 text-primary-foreground/70 text-sm flex flex-col items-start">
                {[
                  { label: "Buscar Imóveis", href: "/properties" },
                  {
                    label: "Lançamentos",
                    href: "/properties?sortOption=launch",
                  },
                  { label: "Sobre Nós", href: "/about" },
                  { label: "Anunciar imóvel", href: "/announce-property" },
                  { label: "Imóveis Favoritados", href: "/favorites" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-yellow-500 transition-colors duration-300 hover:translate-x-1 inline-block text-left"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUMN 3 - CONTACT */}
          <div className="flex flex-col items-center">
            <div className="w-fit flex flex-col items-start">
              <h3 className="font-semibold mb-6 flex items-center gap-2 self-start">
                <span className="w-8 h-0.5 bg-yellow-500" />
                Contato
              </h3>

              <ul className="space-y-4 text-primary-foreground/70 text-sm">
                <li>
                  <Link
                    href={callLink}
                    className="flex items-center gap-3 hover:text-yellow-500 transition-colors group"
                  >
                    <span className="size-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all shrink-0">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="whitespace-nowrap">(11) 96653-6993</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={whatsappLink}
                    className="flex items-center gap-3 hover:text-yellow-500 transition-colors group"
                  >
                    <span className="size-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-yellow-500 transition-all shrink-0">
                      {/* WHATSAPP ICON */}
                      <Image
                        src="/icons/whatsapp-white-icon.svg"
                        alt="Ícone do WhatsApp"
                        width={16}
                        height={16}
                      />
                    </span>
                    <span className="whitespace-nowrap">(11) 96653-6993</span>
                  </Link>
                </li>
                <li>
                  <a
                    href={emailLink}
                    className="flex items-center gap-3 hover:text-yellow-500 transition-colors group"
                  >
                    <span className="size-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all shrink-0">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="whitespace-nowrap">
                      dianahemmel@creci.org.br
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 4: HOURS & INFO */}
          <div className="flex flex-col items-center xl:items-start w-full">
            <div className="w-full max-w-[280px] xl:max-w-none">
              <h3 className="font-semibold mb-6 flex items-center gap-2 justify-center xl:justify-start">
                <span className="w-8 h-0.5 bg-action-primary rounded-full" />
                Atendimento
              </h3>
              <ul className="space-y-2 text-primary-foreground/70 text-sm mb-6 w-full">
                <li className="flex justify-between items-center border-b border-white/5 pb-2 border-dashed">
                  <span>Seg - Sex</span>
                  <span className="text-secondary font-medium">8h - 22h</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-2 border-dashed">
                  <span>Sábados</span>
                  <span className="text-secondary font-medium">8h - 22h</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Dom / Feriados</span>
                  <span className="text-secondary font-medium">8h - 22h</span>
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:border-action-primary/50 transition-colors">
                <p className="text-xs text-primary-foreground/50 mb-1 uppercase tracking-wider">
                  Certificações
                </p>
                <p className="text-sm font-medium text-white">
                  CRECI: 197556-F
                </p>
                <p className="text-xs text-primary-foreground/50 mt-1">
                  Conselho Regional de Corretores de Imóveis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-sm text-primary-foreground/50">
          <p className="text-center lg:text-left order-2 lg:order-1">
            © {currentYear} Diana Imóveis. Todos os direitos reservados.
          </p>

          <div className="flex flex-wrap justify-center gap-6 order-1 lg:order-2">
            <Link
              href="/privacy"
              className="hover:text-secondary transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/terms"
              className="hover:text-secondary transition-colors"
            >
              Termos de Uso
            </Link>
          </div>

          <p className="flex items-center gap-1 justify-center order-3">
            Desenvolvido por
            <Link
              href="https://facilitasites.com.br"
              target="_blank"
              className="font-bold hover:text-white transition-colors"
            >
              Facilita Sites
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
