"use server";

import {
  galleryItemInputSchema,
  GalleryItemInputSchema,
} from "@/lib/schemas/property/property.schema";
import { updatePropertyImage } from "@/lib/services/properties/properties.service";

export async function updatePropertyImageAction(
  id: string,
  images: GalleryItemInputSchema[]
) {
  const parsed = galleryItemInputSchema.array().safeParse(images);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updatePropertyImage(id, parsed.data);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: "Erro ao atualizar imagens",
    };
  }
}
