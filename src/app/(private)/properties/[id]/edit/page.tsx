import PropertyFormWrapper from "@/components/custom/property-form/PropertyFormWrapper";
import {
  getAllPropertyDetails,
  getPropertyToInput,
} from "@/lib/services/properties/properties-query.service";
import { notFound } from "next/navigation";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const propertyId = resolvedParams.id;

  const property = await getPropertyToInput(propertyId);
  const propertyDetails = await getAllPropertyDetails();

  if (!property) {
    notFound();
  }

  return (
    <PropertyFormWrapper
      mode="edit"
      propertyDetails={propertyDetails}
      initialData={property}
    />
  );
}
