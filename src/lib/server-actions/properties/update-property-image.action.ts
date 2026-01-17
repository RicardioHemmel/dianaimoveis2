"use server";

import {
  FloorPlanGalleryItemInputSchema,
  galleryItemInputSchema,
  GalleryItemInputSchema,
} from "@/lib/schemas/property/property.schema";
import { updatePropertyImage } from "@/lib/services/properties/properties.service";

export async function updatePropertyImageAction(
  id: string,
  source: "gallery" | "floorPlanGallery",
  images: GalleryItemInputSchema[] | FloorPlanGalleryItemInputSchema[]
) {
  const parsed = galleryItemInputSchema.array().safeParse(images);

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updatePropertyImage(id, source, parsed.data);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: "Erro ao atualizar imagens",
    };
  }
}
