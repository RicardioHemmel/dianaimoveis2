import { MapPin, Navigation, Clock, Car } from "lucide-react";

export default function PropertyLocation() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Localização</h2>
          <p className="section-subtitle">
            Situado em uma das melhores regiões de São Paulo
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Endereço
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Rua das Olimpíadas, 205
                    <br />
                    Vila Olímpia, São Paulo - SP
                    <br />
                    CEP: 04551-000
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Navigation className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Pontos de Referência
                  </h3>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Shopping Vila Olímpia - 5 min</li>
                    <li>• Av. Faria Lima - 3 min</li>
                    <li>• Parque do Povo - 8 min</li>
                    <li>• Estação Faria Lima - 10 min</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-5 text-center">
                <Clock className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-primary">
                  5
                </p>
                <p className="text-muted-foreground text-xs">min do metrô</p>
              </div>
              <div className="glass-card p-5 text-center">
                <Car className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-primary">
                  10
                </p>
                <p className="text-muted-foreground text-xs">min da Marginal</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-3">
            <div className="glass-card h-full min-h-[400px] overflow-hidden">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Mapa interativo</p>
                  <p className="text-muted-foreground/70 text-sm">
                    Vila Olímpia, São Paulo - SP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
