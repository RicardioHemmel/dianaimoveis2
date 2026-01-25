import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { MapPin, Navigation, Clock, Car } from "lucide-react";
import { GoogleMap } from "@/components/custom/GoogleMap";
import GoogleMapPlaceholder from "@/components/custom/GoogleMapPlaceholder";

export default function PropertyLocation({
  address,
}: {
  address: PropertyViewSchema["address"];
}) {
  // ADDRESS
  const street = address?.street;
  const neighborhood = address?.neighborhood?.name;
  const stateUf = address?.stateUf;
  const city = address?.city;
  const zipCode = address?.zipCode;
  const referencePoints = address?.referencePoint;
  const lat = address?.lat;
  const lng = address?.lng;

  return (
    <section className="py-20 bg-surface-muted">
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
            {/* FULL ADDRESS CONTAINER*/}
            {street && neighborhood && city && stateUf && (
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
            )}

            {/* REFERENCE POINTS LIST */}
            {referencePoints && referencePoints?.length > 0 && (
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
                      {referencePoints.map((rp, i) => (
                        <li key={i} className="list-disc ml-5">
                          {rp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MAP PLACEHOLDER */}
          <div className="lg:col-span-3">
            <div className="h-full min-h-[400px] overflow-hidden shadow-xl rounded-2xl">
              {lat && lng ? (
                <GoogleMap lat={lat} lng={lng} />
              ) : (
                <GoogleMapPlaceholder placeholderText="Um erro ocorreu com o endereço" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
