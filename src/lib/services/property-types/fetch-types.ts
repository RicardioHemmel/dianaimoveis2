import { http } from "@/lib/services/http";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

export async function fetchTypes(): Promise<PropertySelectOption[]> {
  return http("/api/properties/property-details/types");
}
