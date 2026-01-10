import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyAmenities from "@/lib/db/models/property/property-details/amenities.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { PropertyDetail } from "@/lib/schemas/property/property.schema";

export async function getAmenities(): Promise<PropertyDetail[]> {
  await connectMongoDB();

  const amenities = await PropertyAmenities.find({}, { name: 1 }).sort({
    name: 1,
  });

  if (amenities.length === 0) {
    return [];
  }

  return amenities.map((amenity) =>
    PropertyMapper.PropertyDetailToView(amenity)
  );
}
