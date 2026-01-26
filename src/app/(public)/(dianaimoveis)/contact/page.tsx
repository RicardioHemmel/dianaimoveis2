"use client";

import { useState } from "react";
import { Phone, Mail, Send, User, Building, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    userType: "",
    email: "",
    subject: "",
    message: "",
    lgpdConsent: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.lgpdConsent) {
      alert("Você precisa concordar com a LGPD para enviar a mensagem.");
      return;
    }

    alert("Mensagem enviada! Entraremos em contato em breve.");

    setFormData({
      name: "",
      phone: "",
      userType: "",
      email: "",
      subject: "",
      message: "",
      lgpdConsent: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-muted">
      {/* HERO SECTION */}
      <section
        className="relative flex justify-center items-center h-[440px] 
  bg-[url('/banners/contactUsBanner.png')] bg-cover bg-center bg-no-repeat"
      >
        {/* Overlay para escurecer a imagem e dar leitura ao texto */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col justify-center text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold">
            Entre em Contato
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Estamos prontos para ajudar você a encontrar o imóvel dos seus
            sonhos
          </p>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-hero-bg/20 to-transparent" />
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">
                      Seus dados:
                    </Label>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          variant={"gray"}
                          placeholder="Nome"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          variant={"gray"}
                          placeholder="Telefone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select
                      value={formData.userType}
                      onValueChange={(value) => handleChange("userType", value)}
                    >
                      <SelectTrigger variant={"gray"} className="w-full">
                        <SelectValue placeholder="Eu sou" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprador">Comprador</SelectItem>
                        <SelectItem value="vendedor">Vendedor</SelectItem>
                        <SelectItem value="locatario">Locatário</SelectItem>
                        <SelectItem value="investidor">Investidor</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        variant={"gray"}
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Label className="text-sm font-semibold mb-3 block">
                    Assunto:
                  </Label>

                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleChange("subject", value)}
                  >
                    <SelectTrigger variant={"gray"} className="w-full">
                      <SelectValue placeholder="Selecione o assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprar">
                        Quero comprar um imóvel
                      </SelectItem>
                      <SelectItem value="vender">
                        Quero vender meu imóvel
                      </SelectItem>
                      <SelectItem value="alugar">
                        Quero alugar um imóvel
                      </SelectItem>
                      <SelectItem value="anunciar">
                        Quero anunciar meu imóvel
                      </SelectItem>
                      <SelectItem value="duvida">Tenho uma dúvida</SelectItem>
                      <SelectItem value="outro">Outro assunto</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea
                    variant={"gray"}
                    placeholder="Descreva como podemos ajudá-lo..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="min-h-[120px] resize-none"
                    required
                  />

                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={formData.lgpdConsent}
                      onCheckedChange={(checked) =>
                        handleChange("lgpdConsent", checked as boolean)
                      }
                    />
                    <Label className="text-sm text-muted-foreground">
                      Concordo com a LGPD (Lei Geral de Proteção de Dados)
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </form>
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
