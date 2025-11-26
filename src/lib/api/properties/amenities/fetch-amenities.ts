import { http } from "@/lib/api/http";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

export async function fetchAmenities(): Promise<PropertySelectOption[]> {
  return http("/api/properties/amenities/getAll");
}
