import { z } from "zod";
import { PropertyBaseSchema } from "@/lib/schemas/property/zod/property-base.schema";

// REQUIRED FIELDS FOR PUBLISHING A PROPERTY
export const PropertySchema = PropertyBaseSchema.extend({
  title: z.string().min(1, { error: "Título é obrigatório" }),
  price: z
    .number({ error: "O preço é obrigatório" })
    .nullable()
    .refine((val) => val !== null && val > 0, {
      error: "O preço é obrigatório",
    }),
  propertyTypeSlug: z.string({ error: "O tipo do imóvel é obrigatório" }),
});
