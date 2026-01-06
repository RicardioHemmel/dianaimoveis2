import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

export async function getProperties(): Promise<PropertyViewSchema[]> {
  await connectMongoDB();

  const properties = await Property.find()
    .populate("propertyType")
    .populate("propertyPurpose")
    .populate("propertyStanding")
    .populate("propertyStatus")
    .populate("propertyTypology")
    .lean<IPropertyPopulated[]>();

  const mappedProperties = properties.map((property) =>
    PropertyMapper.toView(property)
  );

  return mappedProperties;
}
