import { brazilianStates } from "@/lib/constants/states/brazilian-states";

export function getStateName(uf?: string): string {
  return brazilianStates.find((state) => state.uf === uf)?.name ?? "";
}
