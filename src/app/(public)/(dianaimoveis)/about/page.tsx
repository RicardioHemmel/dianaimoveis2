import type { Metadata } from "next";

// ICONS
import { Award, Heart, Users, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// FORMATTER
import { getExperienceYears } from "@/lib/formatters/ui-formatters/experience-years";

import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre",
};

export default function AboutPage() {
  const experienceYears = getExperienceYears();

  const stats = [
    { icon: Award, value: experienceYears, label: "Anos de Experiência" },
    { icon: Users, value: "100+", label: "Clientes Satisfeitos" },
    { icon: Home, value: "50+", label: "Imóveis Negociados" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Atendimento Personalizado",
      description:
        "Cada cliente é único e merece um atendimento exclusivo e dedicado.",
    },
    {
      icon: Award,
      title: "Qualidade e Excelência",
      description:
        "Compromisso com a excelência em cada etapa do processo imobiliário.",
    },
    {
      icon: Users,
      title: "Relacionamento",
      description:
        "Construímos relacionamentos duradouros baseados em confiança e transparência.",
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative flex justify-center items-center h-[440px]  bg-[url('/banners/announcePropertyBanner.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col justify-center align-middle text-center animate-fade-in z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Sobre a{" "}
            <span className="text-tag-text font-primary!">Diana Imóveis</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Transformando sonhos em realidade com dedicação, experiência e um
            atendimento humanizado.
          </p>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-transparent" />
      </section>

      {/* ABOUT DIANA SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* PHOTO CONTAINER */}
            <div>
              <div className="relative max-w-sm mx-auto flex justify-center">
                {/* DECORATIVE RECTANGLES */}
                <div className="absolute -top-4 left-2 sm:-left-4 w-[80%]  sm:w-full h-full bg-action-primary/40 rounded-2xl" />
                <div className="absolute -bottom-4 right-2 sm:-right-4 w-[80%]  sm:w-full h-full bg-[#cac2d4ab] rounded-2xl" />

                {/* MAIN PHOTO */}
                <div className="relative  w-[80%] sm:w-full h-[350px] sm:h-[420px] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={"/dianaPhoto.png"}
                    alt="Corretora Diana"
                    className="object-cover"
                    fill
                  />
                </div>

                {/* CRECI BADGE */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] bg-white shadow-xl rounded-full px-5 py-2 flex items-center gap-2">
                  <span className="bg-action-primary/15 rounded-full p-2">
                    <Award className="size-5 text-action-primary" />
                  </span>
                  <span className="font-semibold text-zinc-900 text-sm sm:text-base">
                    CRECI: 197556-F
                  </span>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="w-full md:w-[90%]">
              <div className="flex justify-center lg:inline-block">
                <span className="inline-block px-4 py-2 bg-action-primary/85 text-white rounded-full text-sm font-medium mb-6 ">
                  Quem Sou Eu
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Corretora Diana
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Olá! Sou Diana, corretora de imóveis com{" "}
                  <strong className="text-foreground">
                    {experienceYears} anos de experiência
                  </strong>{" "}
                  no mercado. Durante esse tempo, me especializei em entender as
                  necessidades dos meus clientes para oferecer soluções
                  personalizadas e eficientes.
                </p>
                <p>
                  Minha abordagem é sempre focada na qualidade e no carinho com
                  que trato cada etapa do processo, seja na compra, venda ou
                  aluguel de imóveis. Acredito que um atendimento exclusivo e
                  atencioso faz toda a diferença, garantindo que cada cliente se
                  sinta valorizado e satisfeito.
                </p>
                <p>
                  Conte comigo para transformar suas expectativas imobiliárias
                  em realidade. Vamos juntos encontrar o imóvel perfeito para
                  você!
                </p>
              </div>

              <div className="flex justify-center lg:inline-block">
                <Button
                  asChild
                  size={"lg"}
                  variant={"gold"}
                  className="group mt-8"
                >
                  <a
                    href="https://wa.me/5511966536993?text=Olá%20Diana,"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Fale Comigo
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-surface-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 white-card rounded-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              >
                <div className="size-16 mx-auto mb-4 bg-action-primary/15 rounded-full flex items-center justify-center">
                  <stat.icon className="size-8 text-action-primary" />
                </div>
                <div className="text-4xl font-bold text-navy mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-action-primary/15 text-action-primary rounded-full text-sm font-medium mb-6">
              Nossos Valores
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O Que Nos Guia
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Princípios que norteiam cada atendimento e negociação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-8 bg-muted/30 rounded-2xl hover:bg-secondary/5 transition-all duration-300 animate-slide-up"
              >
                <div
                  className="w-14 h-14 mb-6 bg-action-primary/15 rounded-xl flex items-center justify-center 
    group-hover:bg-action-primary group-hover:scale-110 transition-all duration-300"
                >
                  <value.icon
                    className="w-7 h-7 text-action-primary 
      group-hover:text-white transition-colors"
                  />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-20 mt-10 relative overflow-hidden bg-linear-to-br from-hero-from via-hero-via to-hero-to">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <blockquote className="text-xl md:text-2xl text-white/90 italic leading-relaxed mb-6">
              Porque Dele e por Ele, e para Ele, são todas as coisas; glória,
              pois, a Ele eternamente. Amém.
            </blockquote>
            <cite className="text-action-primary font-medium text-lg">
              — Romanos 11:36
            </cite>
          </div>
        </div>
      </section>
    </div>
  );
}
