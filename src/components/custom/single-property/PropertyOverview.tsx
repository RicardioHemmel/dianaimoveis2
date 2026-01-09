"use client";

// ICONS
import {
  Building2,
  MapPin,
  Maximize,
  Calendar,
  Share2,
  Bath,
  BedDouble,
  Building,
  Car,
  Sofa,
  Train,
} from "lucide-react";

// SCHEMA
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PropertyOverviewProps {
  propertyType?: PropertyViewSchema["propertyType"];
  propertyTypology?: PropertyViewSchema["propertyTypology"];
  bedroomsQty?: PropertyViewSchema["bedroomsQty"];
  bathroomsQty?: PropertyViewSchema["bathroomsQty"];
  parkingSpacesQty?: PropertyViewSchema["parkingSpacesQty"];
  area?: PropertyViewSchema["area"];
  price?: PropertyViewSchema["price"];
  neighborhood?: string;
}

export default function PropertyOverview({
  propertyTypology,
  propertyType,
  area,
  bathroomsQty,
  bedroomsQty,
  parkingSpacesQty,
  price,
  neighborhood,
}: PropertyOverviewProps) {
  const handleShare = async () => {
    const shareData = {
      title: "Very Bosque da Saúde - Imóvel",
      text: "Confira este imóvel incrível!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado!");
    }
  };

  const propertyDetails = [
    { icon: BedDouble, label: `${bedroomsQty} quartos` },
    { icon: Bath, label: `${bathroomsQty} banheiros` },
    { icon: Car, label: `${parkingSpacesQty} vagas` },
    { icon: Maximize, label: `${area} m²` },
  ];

  return (
    <section className="py-12 bg-surface-base">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* MAIN INFO CARD */}
          <div className="lg:col-span-2 bg-white rounded-xl">
            <div className="glass-card p-8">
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-action-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-action-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Construtora</p>
                    <p className="font-semibold text-foreground">
                      Very Incorporadora
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-action-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-action-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Bairro</p>
                    <p className="font-semibold text-foreground">
                      {neighborhood}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-action-primary/10 flex items-center justify-center">
                    <Maximize className="h-6 w-6 text-action-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Área</p>
                    <p className="font-semibold text-foreground">24 a 74m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-action-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-action-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Previsão</p>
                    <p className="font-semibold text-foreground">Dez/2027</p>
                  </div>
                </div>
              </div>

              {/* PROPERTY DETAILS */}
              <div className="lg:col-span-2 space-y-6">
                {/* Property Details Grid */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Detalhes do Imóvel
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {propertyDetails.map((detail, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <detail.icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {detail.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRICE CARD */}
          <div className="lg:col-span-1 bg-white rounded-xl">
            <div className="glass-card p-8 sticky top-4">
              <p className="text-muted-foreground text-sm mb-1">
                Valor do Imóvel
              </p>
              <h3 className="text-3xl font-display font-bold text-primary mb-1">
                A partir de{" "}
                <span className="text-gradient-gold">R$ 614.900</span>
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                ou parcelas a partir de R$ 3.500/mês
              </p>

              <div className="space-y-3">
                <Button variant="gold" size="lg" className="w-full">
                  Agendar Visita
                </Button>
                <Button variant="ghost" size="lg" className="w-full">
                  Falar com Corretor
                </Button>

                {/* Share button */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>

              <p className="text-center text-muted-foreground text-xs mt-4">
                Resposta em até 2 horas úteis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
