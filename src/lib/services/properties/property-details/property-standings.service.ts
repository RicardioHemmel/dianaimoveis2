import connectMongoDB from "@/lib/db/mongodbConnection";
import PropertyStanding from "@/lib/db/models/property/property-details/standings.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";

export async function getStandings(): Promise<PropertyDetailSchema[]> {
  await connectMongoDB();

  const standings = await PropertyStanding.find({}, { name: 1 });

  if (standings.length === 0) {
    return [];
  }

  return standings.map((standing) =>
    PropertyMapper.PropertyDetailToView(standing),
  );
}
