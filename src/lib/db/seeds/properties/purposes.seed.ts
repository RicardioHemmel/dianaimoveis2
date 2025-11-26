import slugify from "slugify";
import PropertyPurpose from "@/lib/db/models/property/purposes.model";
import { PROPERTY_PURPOSES } from "@/lib/constants/properties/property-purposes";

export async function purposesSeed() {
  const purposes = PROPERTY_PURPOSES.map((name) => {
    const slug = slugify(name, { lower: true, strict: true, trim: true });
    return { _id: slug, name };
  });

  for (const purpose of purposes) {
    await PropertyPurpose.updateOne(
      { _id: purpose._id },
      {
        $set: purpose,
      },
      { upsert: true }
    );
  }

  console.log("Purpose seed finalizada.");
}
