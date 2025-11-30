"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { UploadedImage } from "@/lib/schemas/uplodad-image";
import ImageCard from "./drag-n-drop/ImageCard";

import {
  DndContext, // Contexto principal do drag & drop
  DragEndEvent, // Tipo do evento emitido quando o drag termina
  closestCenter, // Algoritmo para detectar colisão entre itens
} from "@dnd-kit/core";

import {
  arrayMove, // Função utilitária que reordena arrays
  SortableContext, // Contexto para listas ordenáveis
  rectSortingStrategy, // Estratégia de ordenação baseada em grid
} from "@dnd-kit/sortable";

export default function ImageUploader() {
  // Contains all submitted images
  const [images, setImages] = useState<UploadedImage[]>([]);

  // Used to define fixed IDs to use on Drag n Drop
  const counterIdRef = useRef(1);

  // Trigger when a image is submitted
  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    // Gets files from input into list
    const files = Array.from(e.target.files || []);

    // If there is no file return
    if (!files.length) return;

    // Number to start setting images IDs
    const startId = counterIdRef.current;

    // Maps files so them can have a preview to display and a index to sort
    const mappedImages: UploadedImage[] = files.map((file, index) => {
      return {
        id: startId + index,
        file,
        preview: URL.createObjectURL(file),
      };
    });

    // Updates the counter ID for the next iteration
    counterIdRef.current = startId + files.length;

    // Adds new imagens into the previous array
    setImages((prev) => [...prev, ...mappedImages]);
  }

  function handleDragEnd(event: DragEndEvent) {
    // active = Which item is being carried | over = Where it's dropping
    const { active, over } = event;

    if (!over) return;

    setImages((prev) => {
      // Discovers the original position of the image
      const oldIndex = prev.findIndex((img) => img.id === active.id);

      // Discovers the new position of the image
      const newIndex = prev.findIndex((img) => img.id === over.id);

      // Returns a new array already sorted
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  // Removes a image based on the ID
  function removeImage(id: number): void {
    setImages((prev) => prev.filter((image) => image.id !== id));
  }

  return (
    <div>
      <div>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
        <Button
          type="button"
          variant={"outline"}
          onClick={() => document.getElementById("fileInput")?.click()}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Escolher Imagem de Capa
        </Button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((image) => image.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                remove={() => removeImage(image.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
