import PropertyAmenities from "@/lib/db/models/property/amenities.model";
import { PROPERTY_AMENITIES } from "@/lib/constants/properties/property-amenities";
import { toTitleCase } from "@/lib/formatters/capitalize.formatter";

export async function amenitiesSeed() {
  const amenities = PROPERTY_AMENITIES.map((rawName) => {
    const name = toTitleCase(rawName);
    return name;
  });

  for (const amenity of amenities) {
    await PropertyAmenities.updateOne(
      { name: amenity },
      { $setOnInsert: { name: amenity } }, 
      { upsert: true }
    );
  }

  console.log("Amenities seed finalizada.");
}
