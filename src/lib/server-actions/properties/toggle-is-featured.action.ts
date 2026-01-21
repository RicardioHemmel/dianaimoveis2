"use server";

import { setIsFeatured } from "@/lib/services/properties/properties.service";
import { revalidatePath } from "next/cache";

export async function toggleIsFeatured(id: string) {
  try {
    const res = await setIsFeatured(id);

    revalidatePath("/property-list");

    return {
      success: true,
      data: res.isFeatured,
    };
  } catch (err) {
    console.error("Erro no setIsFeaturedAction:", err);

    return {
      success: false,
      message:
        err instanceof Error
          ? err.message
          : "Erro ao atualizar o destaque do imóvel",
    };
  }
}
