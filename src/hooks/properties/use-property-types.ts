import { fetchTypes } from "@/lib/api/properties/types/fetch-types";
import { useQuery } from "@tanstack/react-query";

export function useTypes() {
  return useQuery({ queryKey: ["types"], queryFn: fetchTypes });
}
