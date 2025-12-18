import { PropertyDB } from "@/lib/schemas/property/property-db";
import { PropertyFormData } from "@/lib/schemas/property/zod/property-base.schema";

export function mapPropertyDBToForm(
  property: PropertyDB,
  propertyTypeSlug: string
): PropertyFormData {
  return {
    _id: property._id.toString(),
    title: property.title,
    description: property.description,

    price: property.price,
    bedroomsQty: property.bedroomsQty,
    suitesQty: property.suitesQty,
    bathroomsQty: property.bathroomsQty,
    parkingSpacesQty: property.parkingSpacesQty,
    area: property.area,
    condominiumFee: property.condominiumFee,
    floorStart: property.floorStart,
    floorEnd: property.floorEnd,

    isFurnished: property.isFurnished,
    isNearSubway: property.isNearSubway,
    isFeatured: property.isFeatured,
    showSquareMeterPrice: property.showSquareMeterPrice,
    isPetFriendly: property.isPetFriendly,

    propertyTypeSlug,
    propertyPurposeId: property.propertyPurposeId?.toString(),
    propertyStandingId: property.propertyStandingId?.toString(),
    propertyStatusId: property.propertyStatusId?.toString(),
    propertyTypologyId: property.propertyTypologyId?.toString(),
    propertyAmenitiesId: property.propertyAmenitiesId?.map((amenity) =>
      amenity?.toString()
    ),

    // // propertyGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: number }],
    // // propertyFloorPlanGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: number }],
    // // coverImage: { type: Schema.Types.ObjectId, ref: "Media" },
    videoUrl: property.videoUrl,

    status: property.status,

    address: {
      street: property?.address?.street,
      neighborhood: property?.address?.neighborhood,
      city: property?.address?.city,
      state: property?.address?.state,
      zipCode: property?.address?.zipCode,
    },
  };
}
