"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import ServerActionResponse from "@/lib/types/server-action-response";
import {
  NeighborhoodWithLinkedProperties,
  createNeighborhood,
} from "@/lib/services/properties/property-details/property-neighborhoods.service";

const neighborhoodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Digite ao menos 2 caracteres")
    .max(80, "O nome deve ter no máximo 80 caracteres"),
});

interface CreateNeighborhoodActionResponse extends ServerActionResponse {
  data?: NeighborhoodWithLinkedProperties;
}

export async function createNeighborhoodAction(
  _: unknown,
  formData: FormData,
): Promise<CreateNeighborhoodActionResponse> {
  const parsed = neighborhoodSchema.safeParse({
    name: formData.get("name")?.toString() ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const neighborhood = await createNeighborhood(parsed.data.name);

    revalidatePath("/neighborhoods");

    return {
      success: true,
      data: {
        ...neighborhood,
        linkedProperties: [],
      },
    };
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "NEIGHBORHOOD_ALREADY_EXISTS"
    ) {
      return {
        success: false,
        message: "Já existe um bairro com esse nome.",
      };
    }

    if (err instanceof Error && err.message === "NEIGHBORHOOD_NAME_REQUIRED") {
      return {
        success: false,
        message: "O nome do bairro é obrigatório.",
      };
    }

    throw err;
  }
}
