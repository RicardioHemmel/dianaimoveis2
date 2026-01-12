"use server";

import { deleteProperty } from "@/lib/services/properties/properties.service";
import { z } from "zod";

export async function deletePropertyAction(id: string) {
  const parsed = z.string().safeParse(id);

  if (!parsed.success) {
    return {
      success: false,
      message: "ID inválido para deleção",
    };
  }

  try {
    await deleteProperty(id);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: "Erro ao apagar imóvel",
    };
  }
}
