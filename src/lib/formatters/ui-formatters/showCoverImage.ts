import { PropertyViewSchema } from "../../schemas/property/property.schema";

export function showCoverImage(gallery: PropertyViewSchema["gallery"]): string {
  return gallery[0].url;
}
