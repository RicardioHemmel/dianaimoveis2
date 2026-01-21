"use server";

import { togglePropertyStatus } from "@/lib/services/properties/properties.service";

export async function togglePropertyStatusAction(id: string) {
  try {
    const res = await togglePropertyStatus(id);

    return {
      success: true,
      data: res.newStatus,
    };
  } catch (err) {
    console.error("Erro no togglePropertyStatus:", err);

    return {
      success: false,
      message:
        err instanceof Error
          ? err.message
          : "Erro ao atualizar o status do imóvel",
    };
  }
}
