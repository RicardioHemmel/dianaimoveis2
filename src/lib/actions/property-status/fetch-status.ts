import { http } from "@/lib/actions/http";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

export async function fetchStatus(): Promise<PropertySelectOption[]> {
  return http("/api/properties/property-details/status");
}
