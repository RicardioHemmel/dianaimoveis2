import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import PropertyTypologies from "@/lib/db/models/property/property-details/typologies.model";

import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { POPULATE_FIELDS } from "@/lib/services/properties/queries/properties-query.service";

// RETURNS EVERY PROPERTY THAT CONTAINS "STUDIO" TYPOLOGY
export async function getStudios(
  limit: number = 10,
): Promise<PropertyViewSchema[]> {
  await connectMongoDB();
  const studioTypology = await PropertyTypologies.findOne({ name: "Studio" });
  const properties = await Property.find({
    propertyTypologies: { $in: [studioTypology?._id!] },
  })
    .limit(limit)
    .populate(POPULATE_FIELDS)
    .lean<IPropertyPopulated[]>();

  if (!properties.length) return [];

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}
