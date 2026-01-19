import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import {
  FloorPlanGalleryItemInputSchema,
  GalleryItemInputSchema,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";

// AUXILIARY SERVICES
import { StorageService } from "@/lib/services/storage/storage.service"; // <--- Importamos o novo service

// MUTATIONS

//-------------------------------- CREATES ONE PROPERTY ----------------------- //
export async function createProperty(
  data: PropertyInputSchema,
): Promise<{ id: string }> {
  await connectMongoDB();

  const mappedProperty = PropertyMapper.toPersistence(data);

  // DUPLICITY CHECK
  const existingProperty = await Property.exists({
    title: mappedProperty.title,
  });

  if (existingProperty) {
    throw new Error("PROPERTY_TITLE_ALREADY_EXISTS");
  }

  const createdProperty = await Property.create(mappedProperty);

  return { id: createdProperty._id.toString() };
}

//--------------------------- UPDATES ONE PROPERTY  ----------------------- //

export async function updateProperty(id: string, data: PropertyInputSchema) {
  await connectMongoDB();

  const mappedProperty = PropertyMapper.toPersistence(data);

  const updatedProperty = await Property.findByIdAndUpdate(id, mappedProperty, {
    new: true,
  })
    .populate("propertyType")
    .lean<IPropertyPopulated>();

  if (!updatedProperty) {
    throw new Error("Erro ao atualizar o imóvel: Imóvel não encontrado");
  }

  return { property: PropertyMapper.toInputSchema(updatedProperty) };
}

//--------------------------- UPDATES PROPERTY ----------------------- //

export async function updatePropertyImage(
  id: string,
  source: "gallery" | "floorPlanGallery",
  images: GalleryItemInputSchema[] | FloorPlanGalleryItemInputSchema[],
) {
  await connectMongoDB();

  const field = source === "gallery" ? "gallery" : "floorPlanGallery";

  const result = await Property.updateOne(
    { _id: id },
    { $set: { [field]: images } },
  );

  if (result.matchedCount === 0) {
    throw new Error("Imóvel não encontrado");
  }
}

//--------------------------- DELETES ONE PROPERTY  ----------------------- //

export async function deleteProperty(id: string) {
  await connectMongoDB();

  // SEARCH FOR PROPERTY TO GET THE IMAGES KEY TO DELETE FROM CLOUD
  const property = await Property.findById(id).lean<IPropertyPopulated>();

  if (!property) {
    throw new Error("Falha ao deletar imóvel");
  }

  // GETS ALL PROPERTY IMAGES
  const galleryKeysToDelete: string[] = [];
  const floorPlanGalleryKeysToDelete: string[] = [];

  if (property.gallery && property.gallery.length > 0) {
    property.gallery.forEach((img) => {
      if (img.key) galleryKeysToDelete.push(img.key);
    });
  }

  if (property.floorPlanGallery && property.floorPlanGallery.length > 0) {
    property.floorPlanGallery.forEach((img) => {
      if (img.key) floorPlanGalleryKeysToDelete.push(img.key);
    });
  }

  await Property.findByIdAndDelete(id);

  // DELETE FROM CLOUD ALL PROPERTY IMAGES
  if (galleryKeysToDelete.length > 0) {
    try {
      await StorageService.deleteManyFiles(galleryKeysToDelete);
    } catch (error) {
      console.error(
        `[CRITICAL] Falha ao deletar imagens da galeria do imóvel ${id} no storage. Keys órfãs: ${galleryKeysToDelete.join(", ")}`,
        error,
      );
    }
  }

  if (floorPlanGalleryKeysToDelete.length > 0) {
    try {
      await StorageService.deleteManyFiles(floorPlanGalleryKeysToDelete);
    } catch (error) {
      console.error(
        `[CRITICAL] Falha ao deletar imagens da planta baixa do imóvel ${id} no storage. Keys órfãs: ${floorPlanGalleryKeysToDelete.join(", ")}`,
        error,
      );
    }
  }
}

export async function setIsFeatured(id: string) {
  await connectMongoDB();

  const updatedProperty = await Property.findByIdAndUpdate(
    id,
    [
      {
        $set: {
          isFeatured: { $not: "$isFeatured" },
        },
      },
    ],
    {
      new: true,
      updatePipeline: true,
    },
  );

  if (!updatedProperty) {
    throw new Error("Erro ao atualizar o imóvel: Imóvel não encontrado");
  }

  return {
    isFeatured: updatedProperty.isFeatured,
  };
}
