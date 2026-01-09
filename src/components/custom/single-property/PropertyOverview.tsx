"use client";

import { Building2, MapPin, Maximize, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PropertyOverview() {
  const handleShare = async () => {
    const shareData = {
      title: "Very Bosque da Saúde - Imóvel",
      text: "Confira este imóvel incrível!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado!");
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info Card */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Construtora</p>
                    <p className="font-semibold text-foreground">
                      Very Incorporadora
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Bairro</p>
                    <p className="font-semibold text-foreground">
                      Vila Olímpia
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Maximize className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Área</p>
                    <p className="font-semibold text-foreground">24 a 74m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Previsão</p>
                    <p className="font-semibold text-foreground">Dez/2027</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-muted-foreground">
                  Studio
                </span>
                <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-muted-foreground">
                  1 Dormitório
                </span>
                <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-muted-foreground">
                  2 Dormitórios
                </span>
                <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-muted-foreground">
                  Lançamento
                </span>
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div className="lg:col-span-1">
            <div className="glass-card p-8 sticky top-4">
              <p className="text-muted-foreground text-sm mb-1">
                Valor do Imóvel
              </p>
              <p className="text-3xl font-display font-bold text-primary mb-1">
                A partir de{" "}
                <span className="text-gradient-gold">R$ 614.900</span>
              </p>
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
