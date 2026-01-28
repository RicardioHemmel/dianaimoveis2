"use client";

import { useState } from "react";
import {
  Home,
  Phone,
  User,
  DollarSign,
  Mail,
  Send,
  CheckCircle,
  TrendingUp,
  Users,
  Shield,
  Building2,
} from "lucide-react";
import Link from "next/link";

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
import { emailLink, whatsappLink } from "@/lib/constants/links/contacts";

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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    purpose: "",
    address: "",
    price: "",
    area: "",
    rooms: "",
    bathrooms: "",
    parking: "",
    description: "",
    lgpd: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.lgpd) {
      alert("Você precisa concordar com a LGPD.");
      return;
    }

    alert("Imóvel enviado com sucesso!");
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative flex justify-center items-center py-16 sm:py-0 min-h-[440px]  bg-[url('/banners/aboutUsBanner.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col justify-center items-center text-center animate-fade-in z-10 w-full sm:w-5/10">
          <span className="w-fit bg-action-primary mb-5 rounded-full px-4 py-1 text-sm font-bold">
            Anúncio Grátis
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Venda ou Alugue seu Imóvel com a{" "}
            <span className="text-tag-text font-primary!">Diana Imóveis</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Transformando sonhos em realidade com dedicação, experiência e um
            atendimento humanizado.
          </p>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-black/30" />
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

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* HEADER */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-action-primary/20">
                  <Home className="h-7 w-7 text-action-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold">
                    Cadastre seu Imóvel
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Preencha os dados abaixo
                  </p>
                </div>
              </div>

              {/* PERSONAL DATA */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-7 w-7 text-action-primary" />
                  Dados Pessoais
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <Input
                    placeholder="Telefone com DDD"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Você é..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proprietario">Proprietário</SelectItem>
                      <SelectItem value="corretor">Corretor</SelectItem>
                      <SelectItem value="imobiliaria">Imobiliária</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Seu melhor e-mail"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </div>

              {/* AD TYPE */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <DollarSign className="h-7 w-7 text-action-primary" />
                  Tipo de Anúncio
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleChange("purpose", "venda")}
                    className={`rounded-xl border-2 p-4 text-center transition ${
                      formData.purpose === "venda"
                        ? "border-gold bg-gold/10"
                        : "border-border"
                    }`}
                  >
                    <p className="font-semibold">Vender</p>
                    <p className="text-xs text-muted-foreground">
                      Venda definitiva
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange("purpose", "aluguel")}
                    className={`rounded-xl border-2 p-4 text-center transition ${
                      formData.purpose === "aluguel"
                        ? "border-gold bg-gold/10"
                        : "border-border"
                    }`}
                  >
                    <p className="font-semibold">Alugar</p>
                    <p className="text-xs text-muted-foreground">
                      Locação mensal
                    </p>
                  </button>
                </div>
              </div>

              {/* PROPERTY DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Building2 className="h-7 w-7 text-action-primary" />
                  Dados do Imóvel
                </div>

                <Input
                  placeholder="Endereço completo"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    value={formData.type}
                    onValueChange={(v) => handleChange("type", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipo do imóvel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apto">Apartamento</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="cobertura">Cobertura</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Valor (R$)"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input placeholder="m²" />
                  <Input placeholder="Quartos" />
                  <Input placeholder="Banheiros" />
                  <Input placeholder="Vagas" />
                </div>

                <Textarea
                  placeholder="Descreva os diferenciais do seu imóvel: acabamentos, localização, facilidades..."
                  className="min-h-[120px]"
                />
              </div>

              {/* CONSENT */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex gap-3 items-start">
                  <Checkbox
                    checked={formData.lgpd}
                    onCheckedChange={(v) => handleChange("lgpd", v as boolean)}
                  />
                  <Label className="text-sm text-muted-foreground">
                    Concordo com a LGPD (Lei Geral de Proteção de Dados)
                  </Label>
                </div>

                <div className="flex gap-3 items-start">
                  <Checkbox />
                  <Label className="text-sm text-muted-foreground">
                    Autorizo o armazenamento das informações enviadas
                  </Label>
                </div>
              </div>

              <Button type="submit" size="lg" variant="gold" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Enviar Anúncio
              </Button>
            </form>
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
                  className="flex items-start gap-4 p-4 white-card rounded-2xl border hover:border-gold/30 transition-colors"
                >
                  <div className="size-10 rounded-xl bg-hero-bg flex items-center justify-center text-action-primary">
                    <benefit.icon className="size-5 text-gold" />
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
