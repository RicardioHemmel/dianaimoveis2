import { ArrowRight, Phone, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { whatsappLink, callLink } from "@/lib/constants/links/contacts";
import { ContactForm } from "@/components/custom/home-page/ContactForm";

export function HomeCallToAction() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* BACKGROUND WITH GRADIENT OVERLAY */}
      <div className="absolute inset-0">
        <Image
          src="/banners/CTA_Background.jpg"
          alt="Luxury apartment Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-hero-from via-hero-from/90 to-hero-to/80" />
      </div>

      {/* DECORATIVE ELEMENTS - SQUARES */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="text-primary-foreground text-center lg:text-start">
            <span className="px-4 py-2 bg-action-primary/15 text-action-primary rounded-full text-sm font-semibold">
              Atendimento Especializado
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight mt-8">
              Pronto para encontrar o apartamento dos seus sonhos?
            </h2>

            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              Nossa especialista em imóveis está pronta para ajudar você a
              encontrar o imóvel perfeito. Atendimento personalizado, sem
              compromisso e com total transparência.
            </p>

            {/* TRUST INDICATORS */}
            <div className="flex justify-center lg:justify-start flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <Clock className="size-5 text-action-primary" />
                <span>Resposta em até 1h</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/90 shadow-2xl ">
                <MessageCircle className="h-5 w-5 text-action-primary" />
                <span>WhatsApp disponível</span>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex justify-center lg:justify-start flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="gold"
                className="rounded-xl text-base font-bold group text-text-title"
                asChild
              >
                <Link href={callLink}>
                  <Phone className="mr-2 size-5 stroke-3" />
                  Falar com consultor
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform stroke-3" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group rounded-xl font-semibold border-none 
             text-black hover:bg-green-500 hover:text-white"
                asChild
              >
                <Link href={whatsappLink}>
                  <Image
                    src="/icons/whatsapp.svg"
                    alt="whatsapp icon"
                    width={20}
                    height={20}
                    className="transition-all duration-200 group-hover:invert"
                  />
                  WhatsApp
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT - CONTACT CARD */}
          <div className="relative">
            {/* GLOWING EFFECT BEHIND CARD */}
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto bg-action-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Phone className="size-10 text-action-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Ligamos para você
                </h3>
                <p className="text-muted-foreground">
                  Deixe seu contato que retornamos rapidamente
                </p>
              </div>

              <ContactForm />

              <p className="text-xs text-muted-foreground text-center mt-4">
                Seus dados estão seguros e não serão compartilhados
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
