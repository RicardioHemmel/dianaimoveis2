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
import { getPropertyByIdToView } from "@/lib/services/properties/properties";

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
      <PropertyHero
        title={property.title}
        address={property?.address}
        gallery={property?.propertyGallery}
        propertyStatus={property?.propertyStatus}
        typology={property.propertyTypology}
      />
      <PropertyOverview
        bedroomsQty={property?.bedroomsQty}
        bathroomsQty={property?.bathroomsQty}
        parkingSpacesQty={property?.parkingSpacesQty}
        propertyType={property?.propertyType}
        propertyTypology={property?.propertyTypology}
        price={property?.price}
        area={property?.area}
        neighborhood={property?.address?.neighborhood}
      />
      <PropertyDescription />
      <PropertyAmenities />
      <PropertyFloorPlans />
      <PropertyGallery />
      <PropertyLocation />
      <PropertyContact />
      <PropertySimilar />
    </>
  );
}
