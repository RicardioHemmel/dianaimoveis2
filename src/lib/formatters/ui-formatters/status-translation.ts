import { PropertyBaseSchema } from "@/lib/schemas/property/property.schema";

export function translateStatus(status: PropertyBaseSchema["status"]) {
  if (status === "PUBLISHED") return "Publicado";
  return "Rascunho";
}
