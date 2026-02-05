"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import ServerActionResponse from "@/lib/types/server-action-response";
import { deleteConstructionCompany } from "@/lib/services/properties/property-details/property-construction-company.service";

interface DeleteConstructionCompanyActionResponse extends ServerActionResponse {
  data?: {
    removedFromProperties: number;
  };
}

export async function deleteConstructionCompanyAction(
  id: string,
): Promise<DeleteConstructionCompanyActionResponse> {
  const parsed = z.string().min(1).safeParse(id);

  if (!parsed.success) {
    return {
      success: false,
      message: "ID inválido para deleção",
    };
  }

  try {
    const result = await deleteConstructionCompany(id);

    revalidatePath("/construction-companies");

    return {
      success: true,
      data: { removedFromProperties: result.removedFromProperties },
    };
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "CONSTRUCTION_COMPANY_NOT_FOUND"
    ) {
      return {
        success: false,
        message: "Construtora não encontrada.",
      };
    }

    return {
      success: false,
      message: "Erro ao apagar construtora",
    };
  }
}
