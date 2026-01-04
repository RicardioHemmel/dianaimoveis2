import PropertyFormShell from "@/components/custom/property-form/PropertyForm";
import { getAmenities } from "@/lib/services/properties/property-details/property-amenities";
import { getPurposes } from "@/lib/services/properties/property-details/property-purposes";
import { getStandings } from "@/lib/services/properties/property-details/property-standings";
import { getStatus } from "@/lib/services/properties/property-details/property-status";
import { getTypes } from "@/lib/services/properties/property-details/property-types";
import { getTypologies } from "@/lib/services/properties/property-details/property-typologies";

export default async function NewPropertyPage() {
  const amenities = await getAmenities();
  const purposes = await getPurposes();
  const standings = await getStandings();
  const status = await getStatus();
  const types = await getTypes();
  const typologies = await getTypologies();

  return (
    <PropertyFormShell
      mode="create"
      propertyDetails={{
        amenities,
        purposes,
        standings,
        status,
        types,
        typologies,
      }}
    />
  );
}
