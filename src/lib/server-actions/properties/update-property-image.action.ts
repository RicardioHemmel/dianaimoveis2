"use server";

import {
  galleryItemSchema,
  GalleryItemSchema,
} from "@/lib/schemas/property/property.schema";
import { updatePropertyImage } from "@/lib/services/properties/properties";

export async function updatePropertyImageAction(
  id: string,
  images: GalleryItemSchema[],
  coverImage: string
) {
  const parsed = galleryItemSchema.array().safeParse(images);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updatePropertyImage(id, parsed.data, coverImage);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: "Erro ao atualizar imagens",
    };
  }
}
