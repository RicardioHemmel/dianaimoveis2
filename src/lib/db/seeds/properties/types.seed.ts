import PropertyType from "@/lib/db/models/property/property-details/types.model";
import { PROPERTY_TYPES } from "@/lib/constants/properties/property-types";

export async function typesSeed() {
  const types = PROPERTY_TYPES.map((name) => {
    return name;
  });

  for (const type of types) {
    await PropertyType.updateOne(
      { name: type },
      {
        $setOnInsert: { name: type},
      },
      { upsert: true }
    );
  }

  console.log("Types seed finalizada.");
}
