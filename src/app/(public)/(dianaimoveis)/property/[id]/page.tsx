// COMPONENTS
import PropertyHero from "@/components/custom/single-property/PropertyHero";
import PropertyOverview from "@/components/custom/single-property/PropertyOverview";
import PropertyDescription from "@/components/custom/single-property/PropertyDescription";
import PropertyAmenities from "@/components/custom/single-property/PropertyAmenities";
import PropertyFloorPlans from "@/components/custom/single-property/PropertyFloorPlans";
import PropertyGallery from "@/components/custom/single-property/PropertyGallery";
import PropertyLocation from "@/components/custom/single-property/PropertyLocation";
import PropertyContact from "@/components/custom/single-property/PropertyContact";
import PropertySimilar from "@/components/custom/single-property/PropertySimilar";

// SERVICE
import { getPropertyByIdToView } from "@/lib/services/properties/properties.service";

// NEXT
import { notFound } from "next/navigation";

export default async function SinglePropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const propertyId = resolvedParams.id;

  const property = await getPropertyByIdToView(propertyId);

  if (!property) {
    notFound();
  }

  return (
    <>
    {/* REVISAR PADRONIZAÇÃO DE SERVER COMPONENTES ONDE CABÍVEL */}
      <PropertyHero property={property} />
      <PropertyOverview property={property} />
      <PropertyDescription property={property} />
      {property.propertyAmenities?.length > 0 && (
        <PropertyAmenities propertyAmenities={property.propertyAmenities} />
      )}
      {property.propertyFloorPlanGallery?.length > 0 && <PropertyFloorPlans />}

      <PropertyGallery gallery={property.propertyGallery}/>
      <PropertyLocation />
      <PropertyContact />
      <PropertySimilar />
    </>
  );
}
