import PropertyStanding from "@/lib/db/models/property/property-details/standings.model";
import { PROPERTY_STANDINGS } from "@/lib/constants/properties/property-standings";

export async function standingsSeed() {
  const standings = PROPERTY_STANDINGS.map((name) => {
    return name;
  });

  for (const standing of standings) {
    await PropertyStanding.updateOne(
      { name: standing },
      {
        $setOnInsert: { name: standing },
      },
      { upsert: true }
    );
  }

  console.log("Standing seed finalizada.");
}
