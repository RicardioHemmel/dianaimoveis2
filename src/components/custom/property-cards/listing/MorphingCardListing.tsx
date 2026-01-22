import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { MorphingCard } from "../MorphingCard";

interface MorphingCardListingProps {
  viewMode: "grid" | "list";
  properties: PropertyViewSchema[];
}

export function MorphingCardListing({
  viewMode,
  properties,
}: MorphingCardListingProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {properties.map((property, index) => (
          <MorphingCard
            property={property}
            viewMode={viewMode}
            key={`${property._id}-${viewMode}`} // FORCES RE-RENDER TO APPLY APPEARING EFFECT
            index={index}
          />
        ))}
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col flex-1 gap-y-5">
        {properties.map((property, index) => (
          <MorphingCard
            property={property}
            viewMode={viewMode}
            key={`${property._id}-${viewMode}`}
            index={index}
          />
        ))}
      </div>
    );
  }
}
