"use client";

import { Phone, Mail, Building, MapPin } from "lucide-react";
import Image from "next/image";
import { GeneralContactForm } from "@/components/custom/contact-page/GeneralContactForm";

export default function ContactClient() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <section className="relative flex justify-center items-center h-[440px] overflow-hidden">
        <Image
          src="/banners/contactUsBanner.webp"
          alt="Banner Entre em Contato"
          fill
          className="object-cover object-center -z-20"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 to-transparent -z-10" />

        <div className="relative z-10 flex flex-col justify-center text-center animate-fade-in px-3 sm:px-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold">
            Entre em Contato
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Estamos prontos para ajudar você a encontrar o imóvel dos seus
            sonhos
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-24 bg-surface-muted">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* FORM */}
            <div>
              <div className="white-card rounded-2xl shadow-elegant p-8 md:p-10 border border-border/50">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Nos contate por Email
                  </h2>
                  <div className="w-20 h-1 bg-action-primary mx-auto mt-3" />
                </div>

                <GeneralContactForm />
              </div>
            </div>

            {/* INFO */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Por que escolher a Diana Imóveis?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Nosso site oferece uma{" "}
                  <b className="text-black">navegação fluida e intuitiva</b>,
                  facilitando a visualização do seu imóvel por{" "}
                  <b className="text-black"> potenciais compradores</b>.
                  Contamos com uma equipe profissional dedicada a oferecer um
                  serviço de alta qualidade e transparência. Entre em contato e
                  tenha a certeza de que seu imóvel estará{" "}
                  <b className="text-black">em boas mãos!</b>
                </p>
              </div>

              <div className="flex gap-3 font-semibold">
                <MapPin className="text-action-primary" />
                <span>São Paulo e Grande São Paulo</span>
              </div>

              <div className="flex gap-3 font-semibold">
                <Building className="text-action-primary " />
                <span>Seg–Sex 8h às 22h • Sáb-Dom 8h às 22h</span>
              </div>

              {/* DIRECT CONTACT */}
              <div className="white-card rounded-2xl p-8 border border-border/50">
                <h3 className="text-xl font-serif font-bold text-foreground text-center mb-6">
                  Converse diretamente com Diana
                </h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="tel:+5511966536993"
                    className="flex items-center justify-center size-14 rounded-full bg-hero-bg text-white hover:bg-hero-bg-hover transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Ligar"
                  >
                    <Phone className="size-6" />
                  </a>
                  <a
                    href="https://wa.me/5511966536993?text=Olá%20Diana,"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-14 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="WhatsApp"
                  >
                    <Image
                      src="/icons/whatsapp.svg"
                      alt="whatsapp icon"
                      width={26}
                      height={26}
                      className="brightness-0 invert"
                    />
                  </a>
                  <a
                    href="mailto:dianahemmel@creci.org.br"
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Email"
                  >
                    <Mail className="size-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
