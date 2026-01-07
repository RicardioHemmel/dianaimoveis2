"use server";

import {
  PropertyInputSchema,
  propertyInputSchema,
} from "@/lib/schemas/property/property.schema";
import ServerActionResponse from "@/lib/types/server-action-response";
import { createProperty } from "@/lib/services/properties/properties";

interface CreatePropertyActionResponse extends ServerActionResponse {
  data?: {
    id: string;
  };
}

export async function createPropertyAction(
  formData: PropertyInputSchema
): Promise<CreatePropertyActionResponse> {
  const parsed = propertyInputSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await createProperty(parsed.data);

    return { success: true, data: { id: res.id } };
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

    throw err; // erro inesperado
  }
}
