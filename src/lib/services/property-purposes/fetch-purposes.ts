import { http } from "@/lib/services/http";
import { PropertyDetails } from "@/lib/schemas/property/property.schema";

export async function fetchPurposes(): Promise<PropertyDetails[]> {
  return http("/api/properties/property-details/purposes");
}
