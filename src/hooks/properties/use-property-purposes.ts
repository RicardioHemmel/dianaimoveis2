import { fetchPurposes } from "@/lib/services/property-purposes/fetch-purposes";
import { useQuery } from "@tanstack/react-query";

export function usePurposes() {
  return useQuery({ 
    queryKey: ["purposes"], 
    queryFn: fetchPurposes,
    staleTime: Infinity, 
    // Mantém no cache por mais tempo se não estiver sendo usado
    gcTime: 1000 * 60 * 60 * 48,
  });
}