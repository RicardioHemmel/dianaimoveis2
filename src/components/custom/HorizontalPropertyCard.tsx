// COMPONENTS
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

// ICONS
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  MoreVertical,
  Trash2,
  Car,
  Eye,
  Star,
} from "lucide-react";

import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

import { deletePropertyAction } from "@/lib/server-actions/properties/delete-property.action";
import { redirect } from "next/navigation";

import {
  deliveryDateToDeliveryStatus,
  DeliveryStatus,
} from "@/lib/formatters/ui-formatters/property-delivery-date";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";
import { showCoverImage } from "@/lib/media/showCoverImage";
import { detailRange } from "@/lib/formatters/ui-formatters/property-ranges";

interface PropertyCardHorizontalProps {
  property: PropertyViewSchema;
}

export function PropertyCardHorizontal({
  property,
}: PropertyCardHorizontalProps) {
  const {
    deliveryDate,
    title,
    propertyTypology,
    bedrooms,
    bathrooms,
    parkingSpaces,
    isFeatured,
  } = property;

  const statusColors: Record<DeliveryStatus, string> = {
    Lançamento: "bg-neutral-800 text-white",
    Pronto: "bg-emerald-600 text-white",
    "Sem data": "bg-white text-black",
  };

  //----------------- PROPERTY STATUS BADGE ------------------------//
  // FORMATS THE PROPERTY STATUS
  const deliveryStatus = deliveryDateToDeliveryStatus(deliveryDate);

  // DEFINES THE STATUS BADGE STYLE
  const badgeStyle = statusColors[deliveryStatus];

  // PROPERTY EDIT LINK
  const propertyEditLink = `properties/${property._id}/edit`;

  //----------------- PROPERTY TITLE  ------------------------//

  const propertyTitle = propertyTypology?.name
    ? `${title} - ${propertyTypology?.name}`
    : title;

  return (
    <Card className="overflow-hidden shadow-xl bg-white group p-0">
      <div className="flex flex-col md:flex-row min-h-[176px]">
        {/* IMAGE SECTION */}
        <div className="relative w-full md:w-64 h-48 md:h-auto bg-muted overflow-hidden shrink-0">
          <Link href={propertyEditLink}>
            <div className="w-full h-full flex items-center justify-center bg-[image:var(--gradient-primary)]">
              {property.gallery.length > 0 ? (
                <Image
                  alt="Imagem de Capa"
                  src={showCoverImage(property.gallery)}
                  fill
                />
              ) : (
                <Building2 className="size-16 text-white/70" />
              )}
            </div>

            <Badge className={`absolute top-3 left-3 ${badgeStyle}`}>
              {deliveryStatus}
            </Badge>
          </Link>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-2xl text-foreground mb-2">
                {propertyTitle}
              </h3>

              {/*LOCATION */}
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                {property?.address?.street !== "" ? (
                  <>
                    <MapPin className="h-4 w-4 shrink-0 text-black" />
                    <span className="truncate text-black">
                      {`${property?.address?.street}, ${property?.address?.city}`}
                    </span>
                  </>
                ) : (
                  <p>Sem Endereço</p>
                )}
              </div>

              {/* SPECIFICATIONS */}
              <div className="flex flex-wrap items-center gap-6 mb-4">
                {bedrooms && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bed className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {detailRange("quartos", bedrooms.min, bedrooms.max)}
                    </span>
                  </div>
                )}

                {bathrooms && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bath className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {detailRange("banheiros", bathrooms.min, bathrooms.max)}
                    </span>
                  </div>
                )}

                {parkingSpaces && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Car className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {detailRange(
                        "vagas",
                        parkingSpaces.min,
                        parkingSpaces.max
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* PRICE */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-3xl font-bold text-[var(--bg-selected)]">
                  {formattedPrice(property?.price)}
                </p>

                {/* ACTIONS */}
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-500 transition-colors"
                  >
                    <Star
                      className={
                        isFeatured ? "fill-amber-300 stroke-0 size-5" : ""
                      }
                    />
                  </Button>

                  <Button asChild variant="outline">
                    <Link href={propertyEditLink}>Editar</Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`property/${property._id}`} target="_blank">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <form
                          action={async () => {
                            "use server";
                            deletePropertyAction(property._id!);
                            redirect("/property-list");
                          }}
                        >
                          <button
                            type="submit"
                            className="flex cursor-pointer text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                            Excluir
                          </button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
