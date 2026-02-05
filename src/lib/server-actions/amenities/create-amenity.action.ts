"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import ServerActionResponse from "@/lib/types/server-action-response";
import {
  AmenityWithLinkedProperties,
  createAmenity,
} from "@/lib/services/properties/property-details/property-amenities.service";

const amenitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Digite ao menos 2 caracteres")
    .max(80, "O nome deve ter no máximo 80 caracteres"),
});

interface CreateAmenityActionResponse extends ServerActionResponse {
  data?: AmenityWithLinkedProperties;
}

export async function createAmenityAction(
  _: unknown,
  formData: FormData,
): Promise<CreateAmenityActionResponse> {
  const parsed = amenitySchema.safeParse({
    name: formData.get("name")?.toString() ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const amenity = await createAmenity(parsed.data.name);

    revalidatePath("/amenities");

    return {
      success: true,
      data: {
        ...amenity,
        linkedProperties: [],
      },
    };
  } catch (err) {
    if (err instanceof Error && err.message === "AMENITY_ALREADY_EXISTS") {
      return {
        success: false,
        message: "Já existe uma comodidade com esse nome.",
      };
    }

    if (err instanceof Error && err.message === "AMENITY_NAME_REQUIRED") {
      return {
        success: false,
        message: "O nome da comodidade é obrigatório.",
      };
    }

    throw err;
  }
}
