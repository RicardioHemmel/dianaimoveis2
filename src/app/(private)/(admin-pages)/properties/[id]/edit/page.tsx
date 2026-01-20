import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PropertyFormWrapper from "@/components/custom/property-form/PropertyFormWrapper";
import {
  getAllPropertyDetails,
  getPropertyToInput,
} from "@/lib/services/properties/queries/properties-query.service";

// DYNAMIC METADATA
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const propertyId = resolvedParams.id;

  const property = await getPropertyToInput(propertyId);

  if (!property) {
    return {
      title: "Imóvel não encontrado",
    };
  }

  return {
    title: `${property.title} - Modo Edição`,
    description: `Edição do imóvel ${property.title}`,
  };
}

// PAGE
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
      formMode="edit"
      propertyDetails={propertyDetails}
      initialData={property}
    />
  );
}
