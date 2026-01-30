import "server-only";

import Neighborhood from "@/lib/db/models/property/address/neighborhood.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";

export async function createNeighborhood(name: string) {
  const normalized = name.trim();

  // AVOID DUPLICATES
  const existing = await Neighborhood.findOne({
    name: { $regex: `^${normalized}$`, $options: "i" },
  });

  if (existing) return PropertyMapper.PropertyNeighborhoodToSchema(existing);

  const neighborhood = await Neighborhood.create({
    name: normalized,
  });

  return PropertyMapper.PropertyNeighborhoodToSchema(neighborhood);
}
