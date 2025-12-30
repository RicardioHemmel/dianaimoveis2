import { fetchStandings } from "@/lib/services/property-standings/fetch-standings";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";
import { useQuery } from "@tanstack/react-query";

export function useStandings() {
  return useQuery<PropertySelectOption[]>({
    queryKey: ["standings"],
    queryFn: fetchStandings,
  });
}
