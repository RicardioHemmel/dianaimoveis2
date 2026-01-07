import PropertyFormShell from "@/components/custom/property-form/PropertyForm";
import { getAllPropertyDetails } from "@/lib/services/properties/properties";

export default async function NewPropertyPage() {
  const propertyDetails = await getAllPropertyDetails();

  return <PropertyFormShell mode="create" propertyDetails={propertyDetails} />;
}
