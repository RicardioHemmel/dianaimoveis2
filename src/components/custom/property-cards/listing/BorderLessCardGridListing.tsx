"use client";

import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { BorderLessPropertyCard } from "../BorderLessPropertyCard";

export function BorderLessCardsGridListing({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 2xl:gap-10">
      {properties.map((property) => (
        <BorderLessPropertyCard property={property} key={property._id} />
      ))}
    </div>
  );
}
