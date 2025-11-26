import slugify from "slugify";
import PropertyType from "@/lib/db/models/property/types.model";
import { PROPERTY_TYPES } from "@/lib/constants/properties/property-types";

export async function typesSeed() {
  const types = PROPERTY_TYPES.map((name) => {
    const slug = slugify(name, { lower: true, strict: true, trim: true });
    return { _id: slug, name };
  });

  for (const type of types) {
    await PropertyType.updateOne(
      { _id: type._id },
      {
        $set: type,
      },
      { upsert: true }
    );
  }

  console.log("Types seed finalizada.");
}
