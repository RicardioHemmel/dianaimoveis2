import { useQuery } from "@tanstack/react-query";
import { fetchAmenities } from "@/lib/api/properties/amenities/fetch-amenities";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

export function useAmenities() {
  return useQuery<PropertySelectOption[]>({
    queryKey: ["amenities"],
    queryFn: fetchAmenities,
  });

}
