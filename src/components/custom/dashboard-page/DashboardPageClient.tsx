"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardInsights } from "@/components/custom/dashboard-page/DashboardInsights";
import { propertyStandingMapper } from "@/lib/formatters/ui-formatters/property-standings";
import { cn } from "@/lib/utils";
import {
  Building2,
  FileText,
  Globe,
  Plus,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type DashboardPageClientProps = {
  userName?: string | null;
};

const standingsBase = [
  { _id: "standing-popular", name: "Popular" },
  { _id: "standing-medio", name: "Médio Padrão" },
  { _id: "standing-alto", name: "Alto Padrão" },
  { _id: "standing-altissimo", name: "Altíssimo Padrão" },
];

const standingCounts: Record<string, number> = {
  Popular: 36,
  "Médio Padrão": 28,
  "Alto Padrão": 32,
  "Altíssimo Padrão": 14,
};

// Dados de cadastros por mês
const monthlyRegistrations = [
  { name: "Ago", cadastros: 8 },
  { name: "Set", cadastros: 12 },
  { name: "Out", cadastros: 15 },
  { name: "Nov", cadastros: 18 },
  { name: "Dez", cadastros: 22 },
  { name: "Jan", cadastros: 28 },
];

const apartmentStandards = [
  { name: "Popular", value: 36, color: "hsl(var(--secondary))" },
  { name: "Médio Padrão", value: 28, color: "hsl(var(--primary))" },
  { name: "Alto Padrão", value: 32, color: "hsl(var(--accent))" },
  { name: "Altíssimo Padrão", value: 14, color: "hsl(var(--warning))" },
];

// Últimos imóveis editados
const recentlyEdited = [
  {
    title: "Apartamento Familiar Zona Sul",
    location: "Botafogo, Rio de Janeiro",
    price: "R$ 980.000",
    bedrooms: 2,
    bathrooms: 1,
    status: "available" as const,
    editedAt: "Hoje, 16:20",
    editType: "Preço atualizado",
  },
  {
    title: "Flat Executivo Faria Lima",
    location: "Itaim Bibi, São Paulo",
    price: "R$ 750.000",
    bedrooms: 1,
    bathrooms: 1,
    status: "available" as const,
    editedAt: "Hoje, 11:00",
    editType: "Fotos adicionadas",
  },
];

export function DashboardPageClient({ userName }: DashboardPageClientProps) {
  const standings = propertyStandingMapper(standingsBase) ?? [];
  const standingsWithCounts = standings.map((standing) => ({
    ...standing,
    value: standingCounts[standing.name] ?? 0,
  }));

  // Dados simulados
  const totalApartamentos = 110;
  const rascunhos = 12;
  const publicados = 98;

  return (
    <div className="space-y-6">
      {/* Welcome Section com CTA */}
      <div className="bg-[image:var(--gradient-primary)] rounded-2xl p-8 text-white shadow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Bem-vinda de volta{userName ? `, ${userName}` : ""}!
            </h2>
            <p className="text-white/80 max-w-lg">
              Seu portfólio de apartamentos está crescendo! Você tem{" "}
              <span className="font-semibold text-white">
                {totalApartamentos} apartamentos
              </span>{" "}
              cadastrados.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold group whitespace-nowrap"
            asChild
          >
            <Link href="/properties/new">
              <Plus className="h-5 w-5 mr-2" />
              Cadastrar Apartamento
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* PROPERTY STANDINGS METRIC */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {standingsWithCounts.map((standard, index) => (
          <Card
            key={`${standard.name}-${index}`}
            className="p-6 shadow-card hover:shadow-premium transition-shadow duration-300 relative overflow-hidden group"
          >
            <div
              className={cn(
                "absolute top-0 right-0 size-20 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500",
                standard.bgColor,
              )}
            />
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "size-14 rounded-xl flex items-center justify-center",
                  standard.bgColor,
                )}
              >
                <standard.icon className={cn("size-7", standard.textColor)} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {standard.name}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {standard.value}
                </p>
                <p className="text-xs text-muted-foreground">apartamentos</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <DashboardInsights
        monthlyRegistrations={monthlyRegistrations}
        apartmentStandards={apartmentStandards}
      />

      {/* Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Imóveis Publicados
              </h3>
              <p className="text-sm text-muted-foreground">
                Visíveis para todos os visitantes
              </p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold text-foreground">{publicados}</p>
              <p className="text-sm text-success font-medium">89% do total</p>
            </div>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full"
                style={{ width: "89%" }}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Rascunhos Pendentes
              </h3>
              <p className="text-sm text-muted-foreground">
                Aguardando finalização
              </p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold text-foreground">{rascunhos}</p>
              <p className="text-sm text-warning font-medium">11% do total</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-warning text-warning hover:bg-warning/10"
            >
              Ver rascunhos
            </Button>
          </div>
        </Card>
      </div>

      {/* Recently Created Properties */}
      {/* <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Últimos Criados
              </h3>
              <p className="text-sm text-muted-foreground">
                Apartamentos adicionados recentemente
              </p>
            </div>
          </div>
          <a
            href="/imoveis"
            className="text-secondary font-medium hover:text-secondary/80 transition-colors flex items-center gap-1"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyCreated.map((property, index) => (
            <div key={index} className="relative">
              <PropertyCardHorizontal />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <Badge className="bg-card/90 text-foreground backdrop-blur-sm shadow-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {property.createdAt}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Recently Edited Properties */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Últimas Edições
              </h3>
              <p className="text-sm text-muted-foreground">
                Apartamentos atualizados recentemente
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentlyEdited.map((property, index) => (
            <Card
              key={index}
              className="p-4 shadow-card hover:shadow-premium transition-shadow duration-300"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-10 w-10 text-white/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {property.title}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {property.location}
                  </p>
                  <p className="text-lg font-bold text-primary mt-1">
                    {property.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {property.editedAt}
                    </Badge>
                    <Badge className="bg-accent/10 text-accent text-xs">
                      {property.editType}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <Card className="p-8 shadow-premium bg-linear-to-r from-card to-muted/50 border-2 border-dashed border-primary/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Pronto para expandir seu portfólio?
            </h3>
            <p className="text-muted-foreground max-w-md">
              Cadastre novos apartamentos e aumente suas oportunidades de
              negócio.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90 shadow-lg font-semibold group whitespace-nowrap"
          >
            <Building2 className="h-5 w-5 mr-2" />
            Novo Apartamento
            <Sparkles className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
