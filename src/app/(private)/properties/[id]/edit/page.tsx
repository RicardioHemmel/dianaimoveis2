import PropertyFormWrapper from "@/components/custom/property-form/PropertyFormWrapper";
import {
  getAllPropertyDetails,
  getPropertyById,
} from "@/lib/services/properties/properties";
import { notFound } from "next/navigation";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const property = await getPropertyById(id);
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
