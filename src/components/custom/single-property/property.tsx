// COMPONENTS
import PropertyHero from "@/components/custom/single-property/PropertyHero";
import PropertyOverview from "@/components/custom/single-property/PropertyOverview";
import PropertyDescription from "@/components/custom/single-property/PropertyDescription";
import PropertyAmenities from "@/components/custom/single-property/PropertyAmenities";
import PropertyFloorPlans from "@/components/custom/single-property/PropertyFloorPlans";
import PropertyGallery from "@/components/custom/single-property/PropertyGallery";
import PropertyLocation from "@/components/custom/single-property/PropertyLocation";
import PropertyContact from "@/components/custom/single-property/PropertyContact";
import RelatedProperties from "@/components/custom/single-property/PropertySimilar";
import PropertyTypologies from "@/components/custom/single-property/PropertyTypologies";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

export function Property({ property }: { property: PropertyViewSchema }) {
  return (
    <div className="bg-surface-base">
      <PropertyHero property={property} />
      <PropertyOverview property={property} />
      {property.propertyTypologies?.length > 0 && (
        <PropertyTypologies typologies={property.propertyTypologies} />
      )}

      {property.description && property.description.length > 0 && (
        <PropertyDescription description={property.description} />
      )}

      {property.propertyAmenities?.length > 0 && (
        <PropertyAmenities amenities={property.propertyAmenities} />
      )}
      {property.floorPlanGallery?.length > 0 && (
        <PropertyFloorPlans floorPlanGallery={property.floorPlanGallery} />
      )}

      {property.gallery?.length > 0 && (
        <PropertyGallery gallery={property.gallery} />
      )}

      {property.address && <PropertyLocation address={property.address} />}

      <PropertyContact />

      <RelatedProperties />
    </div>
  );
}
