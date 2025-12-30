import { fetchStatus } from "@/lib/services/property-status/fetch-status";
import { useQuery } from "@tanstack/react-query";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

export function useStatus() {
  return useQuery<PropertySelectOption[]>({
    queryKey: ["status"],
    queryFn: fetchStatus,
  });
}
