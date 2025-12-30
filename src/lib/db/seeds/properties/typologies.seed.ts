import PropertyTypologies from "@/lib/db/models/property/property-details/typologies.model";
import { PROPERTY_TYPOLOGIES } from "@/lib/constants/properties/property-typologies";

export async function typologiesSeed() {
  const typologies = PROPERTY_TYPOLOGIES.map((name) => {
    return name;
  });

  for (const typology of typologies) {
    await PropertyTypologies.updateOne(
      { name: typology },
      {
        $setOnInsert: { name: typology },
      },
      { upsert: true }
    );
  }

  console.log("Typology seed finalizada.");
}
