"use server";

import { deletePropertyById } from "@/lib/services/properties/properties";
import { z } from "zod";

export async function deletePropertyByIdAction(id: string) {
  const parsed = z.string().safeParse(id);

  if (!parsed.success) {
    return {
      success: false,
      message: "ID inválido para deleção",
    };
  }

  try {
    await deletePropertyById(id);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: "Erro ao apagar imóvel",
    };
  }
}
