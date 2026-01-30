import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";

import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

// -------------------------------- RETURNS RELATED PROPERTIES BASED ON THE STANDING OF THE SELECTED PROPERTY --------------------------------
interface PropertyFilters {
  excludeId?: string;
  propertyStandingId?: string;
}

export async function getRelatedProperties(
  page: number = 1,
  limit: number = 12,
  filters: PropertyFilters,
): Promise<PropertyViewSchema[]> {
  if (!filters.excludeId || !filters.propertyStandingId) return [];

  await connectMongoDB();

  const skip = (page - 1) * limit;

  const query: any = {
    _id: { $ne: filters.excludeId },
    propertyStanding: filters.propertyStandingId,
  };

  const properties = await Property.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean<IPropertyPopulated[]>();

  if (!properties.length) return [];

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}
