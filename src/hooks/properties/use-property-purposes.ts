import { fetchPurposes } from "@/lib/services/property-purposes/fetch-purposes";
import { useQuery } from "@tanstack/react-query";

export function usePurposes() {
  return useQuery({ queryKey: ["purposes"], queryFn: fetchPurposes });
}
