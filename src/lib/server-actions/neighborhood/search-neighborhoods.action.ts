"use server";

import Neighborhood from "@/lib/db/models/property/address/neighborhood.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";

export async function searchNeighborhoods(query: string) {
  if (!query) return [];

  const neighborhoods = await Neighborhood.find({
    name: { $regex: query, $options: "i" },
  })
    .limit(10)
    .lean();

  return neighborhoods.map((n) =>
    PropertyMapper.PropertyNeighborhoodToSchema(n),
  );
}
