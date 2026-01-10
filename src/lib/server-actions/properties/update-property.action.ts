"use server";

import {
  propertyInputSchema,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";
import { updateProperty } from "@/lib/services/properties/properties.service";

export async function updatePropertyAction(
  id: string,
  formData: PropertyInputSchema
) {
  const parsed = propertyInputSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await updateProperty(id, parsed.data);

    return { success: true, data: res.property };
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "PROPERTY_TITLE_ALREADY_EXISTS"
    ) {
      return {
        success: false,
        message: "Já existe um imóvel com esse nome",
      };
    }

    throw err; 
  }
}
