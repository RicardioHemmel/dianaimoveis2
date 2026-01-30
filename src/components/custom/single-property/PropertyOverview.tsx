// ICONS
import { Building2, MapPin, Maximize, Calendar } from "lucide-react";

// SCHEMA
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

// FORMATERS
import { deliveryDateToShortDate } from "@/lib/formatters/ui-formatters/property-delivery-date";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";
import {
  buildPropertyRanges,
  formatRangeField,
} from "@/lib/formatters/ui-formatters/property-ranges";
import { buildToggleFieldLabels } from "@/lib/formatters/ui-formatters/property-toggle-fields";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/custom/ShareButton";
import { ToggleFavoriteBtn } from "@/components/custom/ToggleFavoriteBtn";

interface PropertyOverviewProps {
  property: PropertyViewSchema;
  whatsAppUrlForScheduling: string;
  whatsAppUrlForMoreInfo: string;
}

export default function PropertyOverview({
  property,
  whatsAppUrlForMoreInfo,
  whatsAppUrlForScheduling,
}: PropertyOverviewProps) {
  // SPREAD PROPERTY
  const {
    isFurnished,
    isNearSubway,
    isPetFriendly,
    floors,
    constructionCompany,
    area,
    bathrooms,
    bedrooms,
    suites,
    parkingSpaces,
    price,
    address,
    deliveryDate,
    title,
    _id,
  } = property;

  // PROPERTY MAPPED ITEMS LIST
  const rangeDetails = buildPropertyRanges({
    bedrooms,
    suites,
    bathrooms,
    parkingSpaces,
    area,
    floors,
  });

  const toggleDetails = buildToggleFieldLabels({
    isFurnished,
    isNearSubway,
    isPetFriendly,
  });

  const propertyDetails = [...rangeDetails, ...toggleDetails];

  const mainInfoCardData = [];

  if (constructionCompany?.name) {
    mainInfoCardData.push({
      label: "Construtora",
      value: constructionCompany.name,
      icon: Building2,
    });
  }

  if (address?.neighborhood?.name) {
    mainInfoCardData.push({
      label: "Bairro",
      value: address.neighborhood.name,
      icon: MapPin,
    });
  }

  if (area?.min) {
    mainInfoCardData.push({
      label: "Área",
      value: formatRangeField("area", area.min, area.max),
      icon: Maximize,
    });
  }

  if (deliveryDate) {
    mainInfoCardData.push({
      label: "Previsão",
      value: deliveryDateToShortDate(deliveryDate),
      icon: Calendar,
    });
  }
  return (
    <section className="py-12 bg-surface-base">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-center">
          {/* MAIN INFO CARD */}
          <div className="xl:col-span-2 white-card rounded-xl">
            <div className="p-8">
              <div className="flex flex-wrap justify-start md:justify-evenly gap-6">
                {mainInfoCardData.length > 0 &&
                  mainInfoCardData.map((data) => (
                    <div
                      key={data.value}
                      className="flex items-center gap-3 min-w-[140px]"
                    >
                      <div className="p-4 rounded-xl bg-action-primary/10 flex items-center justify-center shrink-0">
                        <data.icon className="size-6 text-action-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">
                          {data.label}
                        </p>
                        <p className="font-semibold text-foreground text-sm lg:text-base">
                          {data.value}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* PROPERTY DETAILS */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 mt-5 border-t">
                  <div className="flex flex-wrap justify-start md:justify-evenly gap-x-8 gap-y-6">
                    {propertyDetails.map((detail, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <detail.icon className="size-7 xl:size-6 text-muted-foreground shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm xl:text-[15px] font-medium text-foreground">
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
          <div className=" white-card rounded-xl w-full">
            <div className="p-8 relative">
              <p className="text-muted-foreground text-sm mb-1">
                Valor do Imóvel
              </p>

              <h3 className="text-[23px] sm:text-xl 2xl:text-[26px] font-display font-bold text-text-title mb-6">
                A partir de{" "}
                <span className="">{`${formattedPrice(price)}`}</span>
              </h3>

              <div className="space-y-3">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full font-semibold text-base py-4"
                  asChild
                >
                  <Link href={whatsAppUrlForScheduling} target="_blank">
                    Agendar Visita
                  </Link>
                </Button>

                <Button
                  variant={"hero"}
                  size="lg"
                  className="w-full font-normal text-base py-4"
                  asChild
                >
                  <Link href={whatsAppUrlForMoreInfo} target="_blank">
                    Falar com Corretor
                  </Link>
                </Button>

                {/* SHARE BUTTON */}
                <div className="flex gap-3">
                  <div className="flex-[2] [&>button]:w-full ">
                    <ShareButton title={title} />
                  </div>

                  <div className="flex-[1] [&>button]:w-full">
                    <ToggleFavoriteBtn propertyId={_id!} variant="default" />
                  </div>
                </div>
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
