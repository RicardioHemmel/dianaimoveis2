import PropertyAmenities from "@/lib/db/models/property/property-details/amenities.model";
import { PROPERTY_AMENITIES } from "@/lib/constants/properties/property-amenities";
import { Capitalize } from "@/lib/formatters/capitalize";

export async function amenitiesSeed() {
  const amenities = PROPERTY_AMENITIES.map((rawName) => {
    const name = Capitalize(rawName);
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
