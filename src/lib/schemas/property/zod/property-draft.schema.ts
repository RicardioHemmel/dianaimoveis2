import { z } from "zod";
import { PropertyBaseSchema } from "@/lib/schemas/property/zod/property-base.schema";

export const PropertyDraftSchema = PropertyBaseSchema.extend({
  title: z.string().min(1, "Título é obrigatório"),
  propertyTypeSlug: z.string({ error: "O tipo do imóvel é obrigatório" }),
});
