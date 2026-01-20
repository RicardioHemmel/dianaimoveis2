"use client";

import Image from "next/image";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { showCoverImage } from "@/lib/media/showCoverImage";
import { buildPropertyRanges } from "@/lib/formatters/ui-formatters/property-ranges";
import { deliveryDateToDeliveryStatus } from "@/lib/formatters/ui-formatters/property-delivery-date";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";
import { ToggleFavoriteBtn } from "../ToggleFavoriteBtn";

interface RelatedPropertyCardProps {
  property: PropertyViewSchema;
  onFavoriteToggle?: () => void;
  onClick?: () => void;
}

export function BorderLessPropertyCard({
  property,
  onFavoriteToggle,
  onClick,
}: RelatedPropertyCardProps) {
  const {
    deliveryDate,
    title,
    bedrooms,
    bathrooms,
    parkingSpaces,
    area,
    gallery,
    price,
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
    <article className="group cursor-pointer" onClick={onClick}>
      {/* Full Image Card with Overlay */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <Image
          src={showCoverImage(gallery) || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Right - Favorite Button */}

        <ToggleFavoriteBtn />

        {/* BOTTOM CONTENT */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3">
          {/* STATUS BADGE */}
          {deliveryStatus && (
            <span
              className={`text-white text-xs font-semibold px-3 py-1.5 rounded-full w-fit ${deliveryStatus.badgeColor}`}
            >
              {deliveryStatus.label}
            </span>
          )}

          {/* TITLE */}
          <h3 className="font-bold text-white text-xl leading-tight line-clamp-2">
            {title}
          </h3>

          {/* PRICE */}
          <p className="text-white/80 text-sm">
            A partir de{" "}
            <span className="font-bold text-white text-lg">
              {formattedPrice(price)}
            </span>
          </p>

          {/* DIVIDER */}
          <div className="w-full h-px bg-white/20" />

          {/* FEATURES ROW */}
          <div className="flex items-center gap-4 text-white/80 text-sm">
            {mappedPropertyDetails.map((detail, i) => (
              <div key={i} className="flex items-center gap-3">
                <detail.icon className="size-4" />
                <span>{detail.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
