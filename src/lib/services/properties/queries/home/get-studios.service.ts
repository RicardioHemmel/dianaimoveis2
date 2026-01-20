import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import PropertyTypologies from "@/lib/db/models/property/property-details/typologies.model";

import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { POPULATE_FIELDS } from "@/lib/services/properties/queries/properties-query.service";

export async function getStudios(): Promise<PropertyViewSchema[]> {
  await connectMongoDB();
  const studioTypology = await PropertyTypologies.findOne({ name: "Studio" });
  const properties = await Property.find({
    propertyTypologies: { $in: [studioTypology?._id!] },
  })
    .populate(POPULATE_FIELDS)
    .lean<IPropertyPopulated[]>();

  if (!properties.length) return [];

  console.log(properties);

  return properties.map((property) => PropertyMapper.toViewSchema(property));
}
