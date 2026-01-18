"use server";

import { setIsFeatured } from "@/lib/services/properties/properties.service";

export async function setIsFeaturedAction(id: string) {
  try {
    const res = await setIsFeatured(id);

    return {
      success: true,
      data: res.isFeatured,
    };
  } catch (err) {
    return {
      success: false,
      message: "Erro ao atualizar o destaque do imóvel",
    };
  }
}
