"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import ServerActionResponse from "@/lib/types/server-action-response";
import { deleteNeighborhood } from "@/lib/services/properties/property-details/property-neighborhoods.service";

interface DeleteNeighborhoodActionResponse extends ServerActionResponse {
  data?: {
    removedFromProperties: number;
  };
}

export async function deleteNeighborhoodAction(
  id: string,
): Promise<DeleteNeighborhoodActionResponse> {
  const parsed = z.string().min(1).safeParse(id);

  if (!parsed.success) {
    return {
      success: false,
      message: "ID inválido para deleção",
    };
  }

  try {
    const result = await deleteNeighborhood(id);

    revalidatePath("/neighborhoods");

    return {
      success: true,
      data: { removedFromProperties: result.removedFromProperties },
    };
  } catch (err) {
    if (err instanceof Error && err.message === "NEIGHBORHOOD_NOT_FOUND") {
      return {
        success: false,
        message: "Bairro não encontrado.",
      };
    }

    return {
      success: false,
      message: "Erro ao apagar bairro",
    };
  }
}
