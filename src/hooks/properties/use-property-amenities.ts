import { useQuery } from "@tanstack/react-query";
import { fetchAmenities } from "@/lib/services/property-amenities/fetch-amenities";
import { PropertyDetails } from "@/lib/schemas/property/property.schema";

export function useAmenities() {
  return useQuery<PropertyDetails[]>({
    queryKey: ["amenities"],
    queryFn: fetchAmenities,
  });

}
