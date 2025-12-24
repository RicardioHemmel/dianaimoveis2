import { fetchTypologies } from "@/lib/server-actions/property-typologies/fetch-typologies";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";
import { useQuery } from "@tanstack/react-query";

export function useTypologies() {
  return useQuery<PropertySelectOption[]>({
    queryKey: ["typologies"],
    queryFn: fetchTypologies,
  });
}
