"use client";

// REACT | NEXT
import Link from "next/link";

// ICONS
import { MapPin } from "lucide-react";
import { useState } from "react";

// FORMATTER
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";
import { showCoverImage } from "@/lib/media/showCoverImage";
import { deliveryDateToDeliveryStatus } from "@/lib/formatters/ui-formatters/property-delivery-date";
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
    propertyType,
    propertyTypologies,
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
    <div
      key={_id}
      className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Container (clicável) */}
      <Link
        href={`/property/${_id}`}
        className="block relative h-64 overflow-hidden"
      >
        <img
          src={showCoverImage(gallery)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
    opacity-100 group-hover:opacity-40 transition-opacity duration-500 ease-in-out"
        />

        {/* STATUS BADGE - TOP LEFT */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {deliveryDate && (
            <span
              className={`px-3 py-1.5 rounded-full text-primary-foreground text-xs font-bold shadow-lg ${deliveryStatus.badgeColor}`}
            >
              {deliveryStatus.label}
            </span>
          )}
        </div>

        {/* PROPERTY TYPE & Typology - Bottom of Image */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/20">
              {propertyType?.name}
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-md text-secondary-foreground text-xs font-semibold">
              {propertyTypologies[0].name}
            </span>
          </div>
        </div>
      </Link>

      {/* TOGGLE FAVORITE BTN - TOP RIGHT */}
      <ToggleFavoriteBtn />

      {/* CONTENT */}
      <div className="p-6">
        {/* TITLE */}
        <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-1">
          {title}
        </h3>

        {/* ADDRESS */}
        <div className="flex items-start gap-2 text-muted-foreground mb-5">
          <MapPin className="size-4 mt-0.5 shrink-0 text-action-primary" />
          <span className="text-sm line-clamp-1">
            {address?.street}, {address?.neighborhood}
          </span>
        </div>

        {/* Property Features */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {mappedPropertyDetails.map((detail, i) => (
            <div className="flex flex-col items-center gap-1.5" key={i}>
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <detail.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {detail.label}
              </span>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />

        {/* PRICE + BUTTON */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">
              A partir de
            </span>
            <span className="font-display text-2xl font-bold text-foreground font-primary">
              {formattedPrice(price)}
            </span>
          </div>

          {/* GO TO PROPERTY PAGE */}
          <Link
            href={`/property/${_id}`}
            className="px-4 py-2 rounded-full bg-hero-bg text-white text-sm font-semibold hover:bg-hero-via transition-all duration-300"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
