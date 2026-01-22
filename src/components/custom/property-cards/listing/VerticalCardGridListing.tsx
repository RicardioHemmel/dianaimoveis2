"use client";

import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { VerticalPropertyCard } from "@/components/custom/property-cards/VerticalPropertyCard";

export function VerticalCardsGridListing({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <VerticalPropertyCard property={property} key={property._id} />
      ))}
    </div>
  );
}
