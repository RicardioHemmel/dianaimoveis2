import { fetchDeliveryStatus } from "@/lib/api/properties/delivery-status/fetch-delivery-status";
import { useQuery } from "@tanstack/react-query";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

export function useDeliveryStatus() {
  return useQuery<PropertySelectOption[]>({
    queryKey: ["deliveryStatus"],
    queryFn: fetchDeliveryStatus,
  });
}
