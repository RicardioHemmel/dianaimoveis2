import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { MapPin, Navigation, CalendarCheck } from "lucide-react";
import { GoogleMap } from "@/components/custom/GoogleMap";
import GoogleMapPlaceholder from "@/components/custom/GoogleMapPlaceholder";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PropertyLocationProps {
  address: PropertyViewSchema["address"];
  whatsAppUrlForScheduling: string;
}

export default function PropertyLocation({
  address,
  whatsAppUrlForScheduling,
}: PropertyLocationProps) {
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
            Não perca tempo e agende já uma visita com Diana
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* LEFT COLUMN (INFO & CTA) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* ADDRESS CARD */}
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
                    <p className="text-muted-foreground text-sm leading-relaxed">
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

            {/* REFERENCE POINTS & DINAMIC CTA */}
            {referencePoints && referencePoints.length > 0 ? (
              <>
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

                {/* SMALLER CTA WHEN THERE IS REFERENCE POINTS */}
                <Button
                  asChild
                  className="py-8 text-white font-bold shadow-lg flex justify-center items-center text-lg transition-all transform hover:-translate-y-1"
                  variant={"gold"}
                >
                  <Link href={whatsAppUrlForScheduling} target="_blank">
                    <CalendarCheck className="size-6" />
                    Agendar Visita Agora
                  </Link>
                </Button>
              </>
            ) : (
              /* BIGGER CTA WHEN THERE ISN'T REFERENCE POINTS*/
              <div className="white-card p-8 flex flex-col items-center justify-center text-center grow">
                <CalendarCheck className="size-10 text-action-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Gostou deste imóvel?
                </h3>
                <p className="text-muted-foreground mb-6">
                  A Diana está pronta para te mostrar todos os detalhes
                  pessoalmente.
                </p>
                <Button
                  asChild
                  className="w-full py-4 bg-action-primary text-white  font-bold hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <Link href={whatsAppUrlForScheduling} target="_blank">
                    Agendar uma Visita
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* COLUNA DA DIREITA (MAPA) */}
          <div className="lg:col-span-3">
            <div className="h-full min-h-[450px] overflow-hidden shadow-xl rounded-2xl border border-border">
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
