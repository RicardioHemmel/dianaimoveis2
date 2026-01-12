import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { MapPin, Navigation, Clock, Car } from "lucide-react";

export default function PropertyLocation({
  address,
}: {
  address: PropertyViewSchema["address"];
}) {
  // ADDRESS
  const street = address?.street;
  const neighborhood = address?.neighborhood;
  const stateUf = address?.stateUf;
  const city = address?.city;
  const zipCode = address?.zipCode;

  return (
    <section className="py-16 bg-surface-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section">Localização</h2>
          <p className="subtitle-section">
            Situado em uma das melhores regiões de São Paulo
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* INFO CARDS */}
          <div className="lg:col-span-2 space-y-4 ">
            <div className="white-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-action-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-action-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Endereço
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {street}
                    <br />
                    {`${neighborhood}, ${city} - ${stateUf}`}
                    <br />
                    {`CEP: ${zipCode}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="white-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-action-primary/10 flex items-center justify-center shrink-0">
                  <Navigation className="h-6 w-6 text-action-primary" />
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
              <div className="white-card p-5 text-center">
                <Clock className="h-6 w-6 text-action-primary mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-primary">
                  5
                </p>
                <p className="text-muted-foreground text-xs">min do metrô</p>
              </div>
              <div className="white-card p-5 text-center">
                <Car className="h-6 w-6 text-action-primary mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-primary">
                  10
                </p>
                <p className="text-muted-foreground text-xs">min da Marginal</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-3">
            <div className="h-full min-h-[400px] overflow-hidden shadow-xl rounded-2xl">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
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
