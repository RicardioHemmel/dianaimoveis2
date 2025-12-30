import PropertyPurpose from "@/lib/db/models/property/property-details/purposes.model";
import { PROPERTY_PURPOSES } from "@/lib/constants/properties/property-purposes";

export async function purposesSeed() {
  const purposes = PROPERTY_PURPOSES.map((name) => {
    return name;
  });

  for (const purpose of purposes) {
    await PropertyPurpose.updateOne(
      { name: purpose },
      {
        $setOnInsert: {name: purpose},
      },
      { upsert: true }
    );
  }

  console.log("Purpose seed finalizada.");
}
