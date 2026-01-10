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

// FORMATERS
import { deliveryDateToShotDate } from "@/lib/formatters/ui-formatters/property-delivery-date";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";

import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { whatsAppRedirectBaseLink } from "@/lib/constants/links/whatsapp-redirect";
import { ShareButton } from "@/components/custom/ShareButton";

export default async function PropertyOverview({
  property,
}: {
  property: PropertyViewSchema;
}) {
  // SPREAD PROPERTY
  const {
    propertyTypology,
    propertyType,
    area,
    bathroomsQty,
    bedroomsQty,
    parkingSpacesQty,
    price,
    address,
    deliveryDate,
    showSquareMeterPrice,
    title,
  } = property;

  // GET THE CURRENT URL FROM THE SERVER
  const headersList = await headers();
  const domain = headersList.get("host") || "";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const pageUrl = `${protocol}://${domain}`;

  // MOUNT THE MESSAGES
  const customTitle = `${title} - Diana Imóveis`;
  const whatsappMessageForScheduling = `Gostaria de agendar uma visita no: *${customTitle}*\n\n${pageUrl}`;
  const whatsappMessageForMoreInfo = `Gostaria de mais informações sobre o imóvel: *${customTitle}*\n\n${pageUrl}`;

  // GENERATES WHATSAPP LINKS
  const whatsAppUrlForScheduling = `${whatsAppRedirectBaseLink}&text=${encodeURIComponent(whatsappMessageForScheduling)}`;
  const whatsAppUrlForMoreInfo = `${whatsAppRedirectBaseLink}&text=${encodeURIComponent(whatsappMessageForMoreInfo)}`;

  // DISPLAYS ON AREA LABEL
  const squareMeterPrice =
    showSquareMeterPrice && area
      ? formattedPrice(Math.round(price / area))
      : "Área não definida";

  // PROPERTY MAPPED ITEMS LIST
  const propertyDetails = [
    { icon: BedDouble, label: `${bedroomsQty} quartos` },
    { icon: Bath, label: `${bathroomsQty} banheiros` },
    { icon: Car, label: `${parkingSpacesQty} vagas` },
  ];

  const mappedPropertyDetails = propertyDetails.filter(
    (detail) => detail.label
  );

  return (
    <section className="py-12 bg-surface-base">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* MAIN INFO CARD */}
          <div className="lg:col-span-2 bg-white rounded-xl">
            <div className="glass-card p-8">
              <div className="flex flex-wrap gap-6 my-3 items-start">
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

                {/* NEIGHBORHOOD LABEL */}
                {address?.neighborhood && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-action-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-action-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Bairro</p>
                      <p className="font-semibold text-foreground">
                        {address.neighborhood}
                      </p>
                    </div>
                  </div>
                )}

                {/* AREA M² LABEL */}
                {area && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-action-primary/10 flex items-center justify-center">
                      <Maximize className="h-6 w-6 text-action-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Área</p>
                      <p className="font-semibold text-foreground">{`${area} m²`}</p>
                      {showSquareMeterPrice && (
                        <p className="font-light text-sm pl-2">{`R$ ${squareMeterPrice} /m²`}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* DELIVERY DATA LABEL */}
                {deliveryDate && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-action-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-action-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Previsão</p>
                      <p className="font-semibold text-foreground">
                        {deliveryDateToShotDate(deliveryDate)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* PROPERTY DETAILS */}
              <div className="lg:col-span-2 space-y-6">
                {/* Property Details Grid */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Detalhes do Imóvel
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {mappedPropertyDetails.map((detail, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <detail.icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
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
              <h3 className="text-3xl font-display font-bold text-primary mb-6">
                A partir de{" "}
                <span className="text-gradient-gold">{`R$ ${formattedPrice(price)}`}</span>
              </h3>

              <div className="space-y-3">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full font-normal text-base py-6"
                  asChild
                >
                  <Link href={whatsAppUrlForScheduling} target="_blank">
                    Agendar Visita
                  </Link>
                </Button>
                <Button
                  variant={"hero"}
                  size="lg"
                  className="w-full font-normal text-base py-6"
                  asChild
                >
                  <Link href={whatsAppUrlForMoreInfo} target="_blank">
                    Falar com Corretor
                  </Link>
                </Button>

                {/* SHARE BUTTON */}
                <ShareButton title={title} />
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
