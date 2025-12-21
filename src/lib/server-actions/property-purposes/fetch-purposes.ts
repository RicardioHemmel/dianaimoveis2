import { http } from "@/lib/server-actions/http";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

export async function fetchPurposes(): Promise<PropertySelectOption[]> {
  return http("/api/properties/property-details/purposes");
}
