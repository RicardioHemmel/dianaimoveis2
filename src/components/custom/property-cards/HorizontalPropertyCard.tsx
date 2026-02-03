// SCHEMA
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

// ICONS
import { Building } from "lucide-react";

// REACT | NEXT
import Link from "next/link";
import Image from "next/image";

// FORMATTERS
import { showCoverImage } from "@/lib/formatters/ui-formatters/show-cover-image";
import { buildPropertyRanges } from "@/lib/formatters/ui-formatters/property-ranges";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";
import {
  deliveryDateToDeliveryStatus,
  deliveryDateToShortDate,
} from "@/lib/formatters/ui-formatters/property-delivery-date";

// COMPONENTS
import { ToggleFavoriteBtn } from "@/components/custom/ToggleFavoriteBtn";

export function HorizontalPropertyCard({
  property,
}: {
  property: PropertyViewSchema;
}) {
  const {
    address,
    constructionCompany,
    deliveryDate,
    title,
    bedrooms,
    bathrooms,
    parkingSpaces,
    area,
    gallery,
    price,
    _id,
  } = property;

  // MAPPED PROPERTY DETAIL RANGES
  const mappedPropertyDetails = buildPropertyRanges(
    {
      bedrooms,
      bathrooms,
      parkingSpaces,
      area,
    },
    false,
  );

  // DELIVERY STATUS WITH CUSTOM BADGE
  const deliveryStatus = deliveryDateToDeliveryStatus(deliveryDate);

  return (
    <Link
      href={`/property/${_id}`}
      className="rounded-2xl overflow-hidden border border-border/50 shadow-xl group hover:-translate-y-2 cursor-pointer flex flex-col md:flex-row transition-all duration-700 ease-out"
    >
      {/* IMAGE */}
      <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0 overflow-hidden flex items-center justify-center bg-linear-to-b from-hero-via to-hero-bg">
        {gallery.length > 0 ? (
          <Image
            src={showCoverImage(gallery)}
            alt={title}
            className="object-cover transition-transform duration-400 group-hover:scale-110"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center z-20">
            <Building className="size-15 text-action-primary " />
            <p className="text-white mt-3">Imóvel sem imagem</p>
          </div>
        )}
      </div>

      {/* STATUS BADGE - TOP RIGHT */}
      <div className="absolute top-8 right-20 z-10 flex gap-2 ">
        {deliveryDate && (
          <span
            className={`px-3 py-1.5 rounded-full text-primary-foreground text-xs font-bold shadow-lg bg-hero-bg`}
          >
            {deliveryStatus.label}
          </span>
        )}
        {constructionCompany?.name && (
          <span className="px-3 py-1 rounded-full bg-hero-bg border border-white/20 backdrop-blur-md text-white text-xs font-medium">
            {constructionCompany.name}
          </span>
        )}
        {deliveryDate && (
          <span className="px-3 py-1 rounded-full bg-hero-bg border border-white/20 backdrop-blur-md text-white text-xs font-semibold">
            {deliveryDateToShortDate(deliveryDate)}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display text-2xl font-semibold text-text-title group-hover:text-action-primary transition-colors">
              {property.title}
            </h3>
            <span className="bg-gray-300 rounded-full">
              <ToggleFavoriteBtn propertyId={_id!} variant={"blur"} />
            </span>
          </div>

          {address?.neighborhood && address.city && (
            <p className="text-sm mb-4">
              {address?.street} - {address?.neighborhood.name}
            </p>
          )}

          {/* Features */}
          <div className="flex items-center gap-6">
            {mappedPropertyDetails.map((detail, i) => (
              <div key={i} className="flex items-center gap-2">
                <detail.icon className="h-4 w-4" />
                <span className="text-sm">{detail.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xl font-semibold text-text-title">
            {formattedPrice(price, false)}
          </p>
        </div>
      </div>
    </Link>
  );
}
