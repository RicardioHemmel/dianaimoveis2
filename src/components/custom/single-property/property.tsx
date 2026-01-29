// COMPONENTS
import PropertyHero from "@/components/custom/single-property/PropertyHero";
import PropertyOverview from "@/components/custom/single-property/PropertyOverview";
import PropertyDescription from "@/components/custom/single-property/PropertyDescription";
import PropertyAmenities from "@/components/custom/single-property/PropertyAmenities";
import PropertyFloorPlans from "@/components/custom/single-property/PropertyFloorPlans";
import PropertyGallery from "@/components/custom/single-property/PropertyGallery";
import PropertyVideo from "@/components/custom/single-property/PorpertyVideo";
import PropertyLocation from "@/components/custom/single-property/PropertyLocation";
import PropertyContact from "@/components/custom/single-property/PropertyContact";
import PropertyRelated from "@/components/custom/single-property/PropertyRelated";
import PropertyTypologies from "@/components/custom/single-property/PropertyTypologies";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

// GENERATE PROPERTY LINKS
import { headers } from "next/headers";
import { whatsAppRedirectBaseLink } from "@/lib/constants/links/contacts";

export async function Property({
  property,
  relatedProperties,
}: {
  property: PropertyViewSchema;
  relatedProperties: PropertyViewSchema[];
}) {
  // GET THE CURRENT URL FROM THE SERVER
  const headersList = await headers();
  const domain = headersList.get("host") || "";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const pageUrl = `${protocol}://${domain}`;

  // MOUNT THE MESSAGES
  const customTitle = `${property.title} - Diana Imóveis`;
  const whatsappMessageForScheduling = `Gostaria de agendar uma visita no: *${customTitle}*\n\n${pageUrl}`;
  const whatsappMessageForMoreInfo = `Gostaria de mais informações sobre o imóvel: *${customTitle}*\n\n${pageUrl}`;

  // GENERATES WHATSAPP LINKS
  const whatsAppUrlForScheduling = `${whatsAppRedirectBaseLink}&text=${encodeURIComponent(whatsappMessageForScheduling)}`;
  const whatsAppUrlForMoreInfo = `${whatsAppRedirectBaseLink}&text=${encodeURIComponent(whatsappMessageForMoreInfo)}`;

  return (
    <div className="bg-surface-base">
      <PropertyHero property={property} />
      <PropertyOverview
        property={property}
        whatsAppUrlForMoreInfo={whatsAppUrlForMoreInfo}
        whatsAppUrlForScheduling={whatsAppUrlForScheduling}
      />
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

      {property.videoUrl && <PropertyVideo videoUrl={property.videoUrl} />}

      {property.gallery?.length > 0 && (
        <PropertyGallery gallery={property.gallery} />
      )}

      {property.address?.street &&
        property.address?.neighborhood &&
        property.address?.city && (
          <PropertyLocation
            address={property.address}
            whatsAppUrlForScheduling={whatsAppUrlForScheduling}
          />
        )}

      <PropertyContact propertyTitle={property.title} />

      {relatedProperties && relatedProperties.length > 0 && (
        <PropertyRelated relatedProperties={relatedProperties} />
      )}
    </div>
  );
}
