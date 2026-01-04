import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyPurpose from "@/lib/db/models/property/property-details/purposes.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { PropertyDetail } from "@/lib/schemas/property/property.schema";

export async function getPurposes(): Promise<PropertyDetail[]> {
  await connectMongoDB();

  const purposes = await PropertyPurpose.find({}, { name: 1 }).sort({
    name: 1,
  });

  if (purposes.length === 0) {
    return [];
  }

  return purposes.map((purpose) =>
    PropertyMapper.PropertyDetailToView(purpose)
  );
}
