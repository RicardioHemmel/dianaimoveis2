import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Heart,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-bg-hero text-primary-foreground overflow-hidden">
      {/* MAIN FOOTER CONTENT */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-12">
          {/* BRAND */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-6 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-tag" />
              Diana Imóveis
            </h4>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 pr-4">
              Realizando o sonho da casa própria há mais de 20 anos em São
              Paulo. Expertise e dedicação para encontrar o imóvel perfeito para
              você.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-6 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-tag" />
              Links Rápidos
            </h4>
            <ul className="space-y-3 text-primary-foreground/70 text-sm">
              {[
                { label: "Imóveis à Venda", href: "/imoveis" },
                { label: "Lançamentos", href: "/lancamentos" },
                { label: "Buscar Imóveis", href: "/busca" },
                { label: "Sobre Nós", href: "/sobre" },
                { label: "Blog", href: "#" },
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
          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-6 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-tag" />
              Contato
            </h4>
            <ul className="space-y-4 text-primary-foreground/70 text-sm">
              <li>
                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-3 hover:text-secondary transition-colors group justify-center md:justify-start"
                >
                  <span className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                    <Phone className="h-4 w-4" />
                  </span>
                  (11) 96653-6993​
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@veryimoveis.com.br"
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

          {/* Hours & Certifications */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-6 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-8 h-0.5 bg-tag" />
              Horário de Atendimento
            </h4>
            <ul className="space-y-2 text-primary-foreground/70 text-sm mb-6">
              <li className="flex justify-between md:justify-between">
                <span>Segunda a Sexta</span>
                <span className="text-secondary">8h às 18h</span>
              </li>
              <li className="flex justify-between md:justify-between">
                <span>Sábados</span>
                <span className="text-secondary">8h às 18h</span>
              </li>
              <li className="flex justify-between md:justify-between">
                <span>Domingos e Feriados</span>
                <span className="text-secondary">8h às 18h</span>
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
            © {currentYear} Diana Imóveis. Todos os direitos
            reservados.
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
            <a
              href="https://facilitasites.online"
              target="_blank"
              className="font-bold"
            >
              Facilita Sites
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
