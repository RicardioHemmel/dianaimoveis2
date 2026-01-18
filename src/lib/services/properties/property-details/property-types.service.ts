import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyType from "@/lib/db/models/property/property-details/types.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";

export async function getTypes(): Promise<PropertyDetailSchema[]> {
  await connectMongoDB();

  const types = await PropertyType.find({}, { name: 1 }).sort({
    name: 1,
  });

  if (types.length === 0) {
    return [];
  }

  return types.map((type) => PropertyMapper.PropertyDetailToView(type));
}
