import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import PropertyTypologies from "@/lib/db/models/property/property-details/typologies.model";

import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { POPULATE_FIELDS } from "@/lib/services/properties/queries/properties-query.service";

// IDS FROM LOCAL STORAGE
export async function getFavorites(
  propertyIds: string[],
): Promise<PropertyViewSchema[]> {
  await connectMongoDB();

  if (!propertyIds.length) return [];

  const properties = await Property.find({ _id: { $in: propertyIds } })
    .populate(POPULATE_FIELDS)
    .lean<IPropertyPopulated[]>();

  if (!properties.length) return [];

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}
