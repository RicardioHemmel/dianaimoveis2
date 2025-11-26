import slugify from "slugify";
import PropertyAmenities from "@/lib/db/models/property/amenities.model";
import { PROPERTY_AMENITIES } from "@/lib/constants/properties/property-amenities";
import { toTitleCase } from "@/lib/formatters/capitalize.formatter";

export async function amenitiesSeed() {
  const amenities = PROPERTY_AMENITIES.map((rawName) => {
    const name = toTitleCase(rawName);

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    return { _id: slug, name };
  });

  for (const amenity of amenities) {
    await PropertyAmenities.updateOne(
      { _id: amenity._id },
      { $set: amenity },
      { upsert: true }
    );
  }

  console.log("Amenities seed finalizada.");
}
