import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import PropertyType from "@/lib/db/models/property/types.model";
import { PropertyFormData } from "@/lib/schemas/property/zod/property-base.schema";

export async function getPropertyById(
  id: string
): Promise<PropertyFormData | null> {
  try {
    await connectMongoDB();

    let property = await Property.findById(id).lean();

    if (!property) return null;

    const { propertyTypeId, ...propertyWithoutType } = property;

    const propertyTypeSlug = await PropertyType.findById({
      _id: property.propertyTypeId,
    });

    return {
      ...propertyWithoutType,
      _id: property._id.toString(),
      propertyTypeSlug: propertyTypeSlug.slug,
      propertyAmenitiesId: property.propertyAmenitiesId?.toString(),
      propertyPurposeId: property.propertyPurposeId?.toString(),
      propertyStandingId: property.propertyStandingId?.toString(),
      propertyStatusId: property.propertyStatusId?.toString(),
      propertyTypologyId: property.propertyTypologyId?.toString(),
      userId: property.userId?.toString(),
    } as PropertyFormData;
  } catch (error) {
    console.error("Erro ao buscar imóvel no DB:", error);
    return null;
  }
}
