import slugify from "slugify";
import PropertyStanding from "@/lib/db/models/property/standings.model";
import { PROPERTY_STANDINGS } from "@/lib/constants/properties/property-standings";

export async function standingsSeed() {
  const standings = PROPERTY_STANDINGS.map((name) => {
    const slug = slugify(name, { lower: true, strict: true, trim: true });
    return { _id: slug, name };
  });

  for (const standing of standings) {
    await PropertyStanding.updateOne(
      { _id: standing._id },
      {
        $set: standing,
      },
      { upsert: true }
    );
  }

  console.log("Standing seed finalizada.");
}
