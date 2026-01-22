"use client";

import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { VerticalCardCarouselListing } from "@/components/custom/property-cards/listing/VerticalCardCarouselListing";

export function PropertyListingStudiosCarousel({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="w-[94%] 2xl:w-[80%] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section mb-3">Studios para Morar ou Investir</h2>
          <p className="subtitle-section">
            Descubra os melhores studios da cidade de São Paulo
          </p>
        </div>
        <div className="flex justify-center">
          <VerticalCardCarouselListing properties={properties} />
        </div>
      </div>
    </section>
  );
}
