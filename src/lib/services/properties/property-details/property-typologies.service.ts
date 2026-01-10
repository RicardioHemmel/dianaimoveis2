import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyTypology from "@/lib/db/models/property/property-details/typologies.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { PropertyDetail } from "@/lib/schemas/property/property.schema";

export async function getTypologies(): Promise<PropertyDetail[]> {
  await connectMongoDB();

  const typologies = await PropertyTypology.find({}, { name: 1 }).sort({
    name: 1,
  });

  if (typologies.length === 0) {
    return [];
  }

  return typologies.map((typology) => PropertyMapper.PropertyDetailToView(typology));
}
