import Image from "next/image";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { showCoverImage } from "@/lib/formatters/ui-formatters/show-cover-image";
import { buildPropertyRanges } from "@/lib/formatters/ui-formatters/property-ranges";
import { deliveryDateToDeliveryStatus } from "@/lib/formatters/ui-formatters/property-delivery-date";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";
import { ToggleFavoriteBtn } from "../ToggleFavoriteBtn";
import Link from "next/link";
import { Building } from "lucide-react";

export function BorderLessPropertyCard({
  property,
}: {
  property: PropertyViewSchema;
}) {
  const {
    deliveryDate,
    constructionCompany,
    title,
    address,
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
    <article>
      <Link className="group cursor-pointer" href={`/property/${_id}`}>
        {/* FULL IMAGE CARD */}
        <div className="relative h-[520px] 2xl:h-[570px] w-auto overflow-hidden rounded-2xl">
          {gallery.length > 0 ? (
            <Image
              src={showCoverImage(gallery)}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw,
         (max-width: 1280px) 50vw,
         33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="h-full flex flex-col justify-center items-center bg-linear-to-b from-hero-via to-hero-bg">
              <div className="flex flex-col items-center z-20">
                <Building className="size-18 text-action-primary " />
                <p className="text-white mt-3">Imóvel sem imagem</p>
              </div>
            </div>
          )}

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

          {/* TOP RIGHT - FAVORITE BUTTON */}
          <span className="absolute top-3 right-3">
            <ToggleFavoriteBtn propertyId={_id!} variant={"blur"} />
          </span>

          {deliveryDate && (
            <span
              className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1.5 rounded-full w-fit ${deliveryStatus.badgeColor}`}
            >
              {deliveryStatus.label}
            </span>
          )}

          {/* BOTTOM CONTENT */}
          <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3">
            {/* STATUS BADGE */}
            {constructionCompany?.name && (
              <span
                className={`px-3 py-1 rounded-full bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs font-medium w-fit`}
              >
                {constructionCompany.name}
              </span>
            )}

            {/* TITLE */}
            <h3 className="font-bold text-white text-xl leading-tight line-clamp-2">
              {title}
            </h3>

            {address?.street && address?.neighborhood && (
              <span className="text-white text-sm leading-tight line-clamp-2">
                {`${address.street} - ${address.neighborhood.name}`}
              </span>
            )}

            {/* PRICE */}
            <p className="text-white/80 text-sm">
              A partir de{" "}
              <span className="font-bold text-white text-lg">
                {formattedPrice(price, false)}
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
      </Link>
    </article>
  );
}
