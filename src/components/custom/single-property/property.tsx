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
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import PropertyTypologies from "@/components/custom/single-property/PropertyTypologies";

export function Property({ property }: { property: PropertyViewSchema }) {
  return (
    <div className="bg-surface-base">
      <PropertyHero property={property} />
      <PropertyOverview property={property} />

      {property.propertyTypologies?.length > 0 && (
        <PropertyTypologies typologies={property.propertyTypologies} />
      )}

      <PropertyDescription property={property} />
      {property.propertyAmenities?.length > 0 && (
        <PropertyAmenities amenities={property.propertyAmenities} />
      )}
      {property.floorPlanGallery?.length > 0 && (
        <PropertyFloorPlans floorPlanGallery={property.floorPlanGallery} />
      )}
      <PropertyGallery gallery={property.gallery} />
      <PropertyLocation address={property.address} />
      <PropertyContact />
      <PropertySimilar />
    </div>
  );
}
