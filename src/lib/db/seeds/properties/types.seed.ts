import PropertyType from "@/lib/db/models/property/types.model";
import { PROPERTY_TYPES } from "@/lib/constants/properties/property-types";
import slugify from "slugify";

export async function typesSeed() {
  const types = PROPERTY_TYPES.map((name) => {
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    return { slug, name };
  });

  for (const type of types) {
    await PropertyType.updateOne(
      { name: type.name },
      {
        $setOnInsert: { name: type.name, slug: type.slug },
      },
      { upsert: true }
    );
  }

  console.log("Types seed finalizada.");
}
