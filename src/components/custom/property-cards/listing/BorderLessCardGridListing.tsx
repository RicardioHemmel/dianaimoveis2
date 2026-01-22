"use client";

import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { BorderLessPropertyCard } from "../BorderLessPropertyCard";

export function BorderLessCardsGridListing({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <BorderLessPropertyCard property={property} key={property._id} />
      ))}
    </div>
  );
}
