"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Send,
  User,
  Building,
  MapPin,
} from "lucide-react";

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
      alert(
        "Você precisa concordar com a LGPD para enviar a mensagem."
      );
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
    <div className="min-h-screen flex flex-col">
      {/* HERO */}
      <section className="relative h-[300px] md:h-[350px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:"url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold">
            Entre em Contato
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Estamos prontos para ajudar você a encontrar o imóvel dos seus sonhos
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* FORM */}
            <div>
              <div className="bg-card rounded-2xl shadow-elegant p-8 md:p-10 border border-border/50">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold">
                    Nos contate por Email
                  </h2>
                  <div className="w-20 h-1 bg-secondary mx-auto mt-3" />
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
                          placeholder="Nome"
                          value={formData.name}
                          onChange={(e) =>
                            handleChange("name", e.target.value)
                          }
                          className="pl-10"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
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
                      onValueChange={(value) =>
                        handleChange("userType", value)
                      }
                    >
                      <SelectTrigger>
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
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                          handleChange("email", e.target.value)
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      handleChange("subject", value)
                    }
                  >
                    <SelectTrigger>
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
                    placeholder="Descreva como podemos ajudá-lo..."
                    value={formData.message}
                    onChange={(e) =>
                      handleChange("message", e.target.value)
                    }
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
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                  Por que escolher a Diana Imóveis?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Navegação intuitiva, ampla divulgação e atendimento
                  profissional para garantir segurança e visibilidade ao seu
                  imóvel.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-md border border-border bg-muted hover:bg-secondary transition-colors cursor-pointer">
                  <Phone className="h-5 w-5" />
                </div>

                <div className="w-10 h-10 flex items-center justify-center rounded-md border border-border bg-muted hover:bg-secondary transition-colors cursor-pointer">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div className="w-10 h-10 flex items-center justify-center rounded-md border border-border bg-muted hover:bg-secondary transition-colors cursor-pointer">
                  <Mail className="h-5 w-5" />
                </div>
              </div>


              <div className="flex gap-3">
                <MapPin />
                <span>São Paulo e Grande São Paulo</span>
              </div>

              <div className="flex gap-3">
                <Building />
                <span>Seg–Sex 8h às 22h • Sáb-Dom 8h às 22h</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
