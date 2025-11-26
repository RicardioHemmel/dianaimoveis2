import slugify from "slugify";
import PropertyTypologies from "@/lib/db/models/property/typologies.model";
import { PROPERTY_TYPOLOGIES } from "@/lib/constants/properties/property-typologies";

export async function typologiesSeed() {
  const typologies = PROPERTY_TYPOLOGIES.map((name) => {
    const slug = slugify(name, { lower: true, strict: true, trim: true });
    return { _id: slug, name };
  });

  for (const typology of typologies) {
    await PropertyTypologies.updateOne(
      { _id: typology._id },
      {
        $set: typology,
      },
      { upsert: true }
    );
  }

  console.log("Typology seed finalizada.");
}
