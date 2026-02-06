"use client";

// REACT | NEXT
import Link from "next/link";
import Image from "next/image";

// ICONS
import { Building, MapPin } from "lucide-react";

// FORMATTER
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";
import { showCoverImage } from "@/lib/formatters/ui-formatters/show-cover-image";
import {
  deliveryDateToDeliveryStatus,
  deliveryDateToShortDate,
} from "@/lib/formatters/ui-formatters/property-delivery-date";
import { buildPropertyRanges } from "@/lib/formatters/ui-formatters/property-ranges";

// SCHEMAS
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

// COMPONENTS
import { ToggleFavoriteBtn } from "@/components/custom/ToggleFavoriteBtn";

export function VerticalPropertyCard({
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

  // MAPPED DETAILS WITH THEIR ICONS
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
    <article className="group relative rounded-2xl overflow-hidden shadow-xl select-none">
      {/* IMAGE CONTAINER */}
      <Link
        href={`/property/${_id}`}
        className="block relative h-64 overflow-hidden"
      >
        <div className="w-full h-full relative flex items-center justify-center bg-linear-to-b from-hero-via to-hero-bg">
          {gallery.length > 0 ? (
            <Image
              src={showCoverImage(gallery)}
              alt={title}
              className="object-cover transition-transform duration-400 group-hover:scale-110"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
            />
          ) : (
            <div className="flex flex-col items-center z-20">
              <Building className="size-15 text-action-primary " />
              <p className="text-white mt-3">Imóvel sem imagem</p>
            </div>
          )}
        </div>

        {/* DARK GRADIENT OVERLAY */}
        <div
          className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent
    opacity-100 group-hover:opacity-40 transition-opacity duration-500 ease-in-out"
        />

        {/* STATUS BADGE - TOP LEFT */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {deliveryDate && (
            <span
              className={`px-3 py-1.5 rounded-full text-primary-foreground text-xs font-semibold shadow-lg tracking-wider
 ${deliveryStatus.badgeColor}`}
            >
              {deliveryStatus.label}
            </span>
          )}
        </div>

        {/* PROPERTY TYPE & Typology - Bottom of Image */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="flex items-center gap-2">
            {constructionCompany?.name && (
              <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs font-medium">
                {constructionCompany.name}
              </span>
            )}
            {deliveryDate && (
              <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs font-semibold">
                {deliveryDateToShortDate(deliveryDate)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* FAVORITE BUTTON - TOP RIGHT */}
      <span className="absolute top-4 right-4">
        <ToggleFavoriteBtn propertyId={_id!} variant={"blur"} />
      </span>

      {/* CONTENT */}
      <div className="p-6">
        {/* TITLE */}
        <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-1">
          {title}
        </h3>

        {/* ADDRESS */}
        {(address?.street || address?.neighborhood?.name) && (
          <div className="flex items-start gap-2 text-muted-foreground mb-5">
            <MapPin className="size-4 mt-0.5 shrink-0 text-action-primary" />
            <span className="text-sm line-clamp-1">
              {address?.street} - {address?.neighborhood?.name}
            </span>
          </div>
        )}

        {/* PROPERTY DETAILS */}
        <div className="grid grid-cols-4 gap-1 sm:gap-3 mb-6">
          {mappedPropertyDetails.map((detail, i) => (
            <div className="flex flex-col items-center gap-1.5" key={i}>
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <detail.icon className="size-4 text-gray-800" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {detail.label}
              </span>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-linear-to-r from-transparent via-border to-transparent mb-5" />

        {/* PRICE + BUTTON */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">
              A partir de
            </span>
            <span className="font-display text-lg sm:text-xl font-bold text-foreground font-primary">
              {formattedPrice(price, false)}
            </span>
          </div>

          {/* GO TO PROPERTY PAGE */}
          <Link
            href={`/property/${_id}`}
            className="px-3 py-2 rounded-full bg-hero-bg text-white text-[12px] sm:text-sm font-semibold hover:bg-hero-via transition-all duration-300"
            aria-label="Link para ver detalhes do imóvel"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
