import PropertyFormWrapper from "@/components/custom/property-form/PropertyFormWrapper";
import { getAllPropertyDetails } from "@/lib/services/properties/properties-query.service";

export default async function NewPropertyPage() {
  const propertyDetails = await getAllPropertyDetails();

  return (
    <PropertyFormWrapper mode="create" propertyDetails={propertyDetails} />
  );
}
