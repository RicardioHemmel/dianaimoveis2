import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyTypologies from "@/lib/db/models/property/property-details/typologies.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";

export async function getTypologies(): Promise<PropertyDetailSchema[]> {
  await connectMongoDB();

  const typologies = await PropertyTypologies.find({}, { name: 1 }).sort({
    name: 1,
  });

  if (typologies.length === 0) {
    return [];
  }

  return typologies.map((typology) =>
    PropertyMapper.PropertyDetailToView(typology)
  );
}
