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
    <footer className="relative bg-hero-bg text-primary-foreground overflow-hidden">
      {/* MAIN FOOTER CONTENT */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-12">
          {/* BRAND */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-6 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-action-primary" />
              Diana Imóveis
            </h4>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 pr-2">
              Há mais de {experienceYears} anos em São Paulo, conectamos você às
              melhores oportunidades de moradia e investimento.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              {[
                {
                  icon: Instagram,
                  href: instagramLink,
                },
                {
                  icon: Facebook,
                  href: facebookLink,
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="size-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          {/* QUICK LINKS */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-6 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-action-primary" />
              Links Rápidos
            </h4>
            <ul className="space-y-3 text-primary-foreground/70 text-sm">
              {[
                { label: "Buscar Imóveis", href: "/properties" },
                { label: "Lançamentos", href: "/properties?sortOption=launch" },
                { label: "Sobre Nós", href: "/about" },
                { label: "Anunciar imóvel", href: "/announce-property" },
                { label: "Imóveis Favoritados", href: "/favorites" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* CONTACT */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-6 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-action-primary" />
              Contato
            </h4>
            <ul className="space-y-4 text-primary-foreground/70 text-sm">
              <li>
                <Link
                  href={callLink}
                  className="flex items-center gap-3 hover:text-secondary transition-colors group justify-center md:justify-start"
                >
                  <span className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                    <Phone className="h-4 w-4" />
                  </span>
                  (11) 96653-6993
                </Link>
              </li>
              <li>
                <Link
                  href={whatsappLink}
                  className="flex items-center gap-3 hover:text-secondary transition-colors group justify-center md:justify-start"
                >
                  <span className="group size-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center transition-all group-hover:bg-secondary">
                    <Image
                      src="/icons/whatsapp.svg"
                      alt="whatsapp icon"
                      width={20}
                      height={20}
                      className="invert 
      brightness-200 
      opacity-70 
      transition-all 
      group-hover:invert-0 
      group-hover:brightness-0 
      group-hover:opacity-100
    "
                    />
                  </span>
                  (11) 96653-6993
                </Link>
              </li>
              <li>
                <a
                  href={emailLink}
                  className="flex items-center gap-3 hover:text-secondary transition-colors group justify-center md:justify-start"
                >
                  <span className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                    <Mail className="h-4 w-4" />
                  </span>
                  dianahemmel@creci.org.br
                </a>
              </li>
            </ul>
          </div>

          {/* HOURS & CERTIFICATIONS */}
          <div className="text-center flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-6 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-action-primary" />
              Horário de Atendimento
            </h4>
            <ul className="space-y-2 text-primary-foreground/70 text-sm mb-6 w-7/8 sm:w-3/5 md:w-4/4">
              <li className="flex justify-between">
                <span>Segunda a Sexta</span>
                <span className="text-secondary md">8h às 22h</span>
              </li>
              <li className="flex justify-between">
                <span>Sábados</span>
                <span className="text-secondary">8h às 22h</span>
              </li>
              <li className="flex justify-between">
                <span>Domingos e Feriados</span>
                <span className="text-secondary">8h às 22h</span>
              </li>
            </ul>
            <div className="p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
              <p className="text-xs text-primary-foreground/50 mb-2">
                Certificações
              </p>
              <p className="text-sm font-medium">CRECI: 197556-F</p>
              <p className="text-xs text-primary-foreground/50 mt-1">
                Conselho Regional de Corretores de Imóveis
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm text-center md:text-left">
            © {currentYear} Diana Imóveis. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-secondary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Termos de Uso
            </a>
          </div>
          <p className="text-primary-foreground/50 text-sm flex items-center gap-1 justify-center md:justify-start">
            Desenvolvido por{" "}
            <Link
              href="https://facilitasites.com.br"
              target="_blank"
              className="font-bold"
            >
              Facilita Sites
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
