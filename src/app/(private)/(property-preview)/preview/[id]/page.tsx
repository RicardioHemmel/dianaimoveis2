// COMPONENTS
import { Property } from "@/components/custom/single-property/Property";

// SERVICE
import {
  getPropertyToView,
  getRelatedProperties,
} from "@/lib/services/properties/properties-query.service";

// NEXT
import { notFound } from "next/navigation";

export default async function PropertyPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const propertyId = resolvedParams.id;

  const property = await getPropertyToView(propertyId);
  const relatedProperties = await getRelatedProperties(propertyId);

  if (!property) {
    notFound();
  }

  return <Property property={property} relatedProperties={relatedProperties} />;
}
