"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import ServerActionResponse from "@/lib/types/server-action-response";
import { deleteAmenity } from "@/lib/services/properties/property-details/property-amenities.service";

interface DeleteAmenityActionResponse extends ServerActionResponse {
  data?: {
    removedFromProperties: number;
  };
}

export async function deleteAmenityAction(
  id: string,
): Promise<DeleteAmenityActionResponse> {
  const parsed = z.string().min(1).safeParse(id);

  if (!parsed.success) {
    return {
      success: false,
      message: "ID inválido para deleção",
    };
  }

  try {
    const result = await deleteAmenity(id);

    revalidatePath("/amenities");

    return {
      success: true,
      data: { removedFromProperties: result.removedFromProperties },
    };
  } catch (err) {
    if (err instanceof Error && err.message === "AMENITY_NOT_FOUND") {
      return {
        success: false,
        message: "Comodidade não encontrada.",
      };
    }

    return {
      success: false,
      message: "Erro ao apagar comodidade",
    };
  }
}
