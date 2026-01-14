import "server-only";

import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import { PropertyMapper } from "@/lib/mappers/property/property.mapper";
import { IPropertyPopulated } from "@/lib/schemas/property/IProperty";
import {
  GalleryItemInputSchema,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";

// AUXILIARY SERVICES
import { StorageService } from "@/lib/services/storage/storage.service"; // <--- Importamos o novo service

// MUTATIONS

//-------------------------------- CREATES ONE PROPERTY ----------------------- //
export async function createProperty(
  data: PropertyInputSchema
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
  images: GalleryItemInputSchema[]
) {
  await connectMongoDB();

  const result = await Property.updateOne(
    { _id: id },
    { $set: { propertyGallery: images } }
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
  const keysToDelete: string[] = [];

  if (property.gallery && property.gallery.length > 0) {
    property.gallery.forEach((img) => {
      if (img.key) keysToDelete.push(img.key);
    });
  }

  await Property.findByIdAndDelete(id);

  // DELETE FROM CLOUD ALL PROPERTY IMAGES
  if (keysToDelete.length > 0) {
    try {
      await StorageService.deleteManyFiles(keysToDelete);
    } catch (error) {
      console.error(
        `[CRITICAL] Falha ao deletar imagens do imóvel ${id} no storage. Keys órfãs: ${keysToDelete.join(", ")}`,
        error
      );
    }
  }
}
