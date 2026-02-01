import {
  Phone,
  Mail,
  TrendingUp,
  Users,
  Shield,
  Building2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { emailLink, whatsappLink } from "@/lib/constants/links/contacts";
import { AnnouncePropertyForm } from "@/components/custom/announce-property-page/AnnoucePropertyForm";

const benefits = [
  {
    icon: TrendingUp,
    title: "Máxima Visibilidade",
    description: "Seu imóvel divulgado nas principais plataformas digitais",
  },
  {
    icon: Users,
    title: "Atendimento Dedicado",
    description: "Equipe especializada para acompanhar todo o processo",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Transações seguras e documentação verificada",
  },
  {
    icon: Building2,
    title: "Avaliação Profissional",
    description: "Precificação estratégica para venda rápida",
  },
];

export default function AnnouncePropertyPage() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative flex justify-center items-center h-[440px]">
        <Image
          src="/banners/announcePropertyBanner.webp"
          alt="Banner Sobre Nós"
          fill
          className="object-cover object-center -z-20"
          priority
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-transparent -z-10" />

        <div className="flex flex-col justify-center items-center text-center animate-fade-in z-10 w-full sm:w-6/10 px-2 sm:px-0">
          <span className="w-fit bg-action-primary mb-5 rounded-full px-4 py-1 text-sm font-bold">
            Anúncio Grátis
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Venda ou Alugue seu Imóvel com a{" "}
            <div className="text-tag-text font-primary!">Diana Imóveis</div>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Transformando sonhos em realidade com dedicação, experiência e um
            atendimento humanizado.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-zinc-200 py-8">
        <div className="container mx-auto grid md:grid-cols-3 gap-6 text-center place-items-center">
          {[
            ["01", "Preencha o formulário"],
            ["02", "Análise do anúncio"],
            ["03", "Publicação em 24h"],
          ].map(([n, text]) => (
            <div
              key={n}
              className="w-[60%] md:w-full flex items-center justify-between md:justify-center gap-3"
            >
              <span className="text-action-primary font-bold text-2xl">
                {n}
              </span>
              <span className="text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-surface-base">
        <div className="container mx-auto grid lg:grid-cols-3 gap-12 px-4">
          {/* FORM */}
          <div className="lg:col-span-2 white-card rounded-2xl p-8 ">
            <h2 className="text-2xl font-serif font-bold mb-6">
              Cadastre seu Imóvel
            </h2>

            <AnnouncePropertyForm />
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold">
                Vantagens de Anunciar
              </h3>

              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 p-4 white-card rounded-2xl  transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="size-10 rounded-xl bg-hero-bg flex items-center justify-center text-action-primary">
                    <benefit.icon className="size-5 text-action-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{benefit.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-hero-bg text-white rounded-xl p-6">
              <h3 className="font-semibold mb-3">Precisa de ajuda?</h3>
              <div className="space-y-2 text-sm">
                <Link href={whatsappLink}>
                  <p className="flex gap-2">
                    <Phone className="h-4 w-4 text-action-primary" /> (11)
                    96653-6993
                  </p>
                </Link>
                <Link href={emailLink}>
                  <p className="flex gap-2 mt-4">
                    <Mail className="h-4 w-4 text-action-primary" />{" "}
                    dianahemmel@creci.org.br
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
