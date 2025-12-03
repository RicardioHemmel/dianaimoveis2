"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";
import { UploadedImage } from "@/lib/schemas/uplodad-image";
import ImageCard from "./drag-n-drop/ImageCard";
import { Button } from "@/components/ui/button";
import { PropertyImage } from "@/lib/schemas/property/property-images";

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

interface ImageUploaderProps {
  inputId: string;
  InputIcon:  LucideIcon;
  onChangeImage: (images: PropertyImage[]) => void;
}

export default function ImagesUploader({
  inputId,
  InputIcon,
  onChangeImage,
}: ImageUploaderProps) {
  // Contains all submitted images
  const [images, setImages] = useState<UploadedImage[]>([]);

  // Used to show rich text to the user
  const [isHovering, setIsHovering] = useState(false);

  // Used to define fixed IDs to use on Drag n Drop
  const counterIdRef = useRef(1);

  // Used to control the amount of times a event of onDragEnter e onDragLeave are activeted
  const dragCounter = useRef(0);

  // Whenever images change (upload completed) remove hover
  useEffect(() => {
    const gallery = images.map((img) => ({
      imageId: "",
      order: img.order,
      file: img.file,
    }));
    onChangeImage(gallery);
    dragCounter.current = 0;
    setIsHovering(false);
  }, [images]);

  // Kills any image saved on memory for display when desmounting the component
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, []);

  // Trigger when a image is submitted
  function handleUpload(e: ChangeEvent<HTMLInputElement> | FileList) {
    // Gets files from input into list
    const files =
      e instanceof FileList ? Array.from(e) : Array.from(e.target.files || []);

    // If there is no file return
    if (!files.length) return;

    // Checks if only images were submitted and not repeated ones
    const invalidFileType = files.find(
      (file) => !file.type.startsWith("image/")
    );

    const hasDuplicate = files.some((file) =>
      images.some(
        (img) => img.file.name === file.name && img.file.size === file.size
      )
    );

    if (invalidFileType || hasDuplicate) {
      alert(
        invalidFileType ? "Arquivo inválido" : "Essa imagem já foi inserida"
      );
      return;
    }

    // Number to start setting images IDs
    const startId = counterIdRef.current;

    // Maps files so them can have a preview to display and a ID to sort
    const mappedImages: UploadedImage[] = files.map((file, index) => {
      return {
        id: startId + index,
        file,
        preview: URL.createObjectURL(file),
        order: images.length + index + 1,
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
      const sortedImages = arrayMove(prev, oldIndex, newIndex);

      return sortedImages.map((img, index) => ({
        ...img,
        order: index + 1,
      }));
    });
  }

  // Removes a image based on the ID
  function removeImage(id: number): void {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);

      // libera a URL da imagem para evitar vazamento de memória
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      const filteredImages = prev.filter((image) => image.id !== id);

      return filteredImages.map((img, index) => ({
        ...img,
        order: index + 1,
      }));
    });
  }

  /**
   * When files are dropped into the drop area.
   * Prevents the browser from opening the image and processing the upload.
   */
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    // Reset drag counter
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (files.length) handleUpload(files);
  }

  // Allows the drop to work (without this the browser opens the file).
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDragEnter() {
    dragCounter.current += 1;
    setIsHovering(true);
  }

  function handleDragLeave() {
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsHovering(false);
    }
  }
  return (
    <div>
      <div>
        <input
          id={inputId}
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        <div
          onClick={() => document.getElementById(inputId)?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`mb-8 border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer border-neutral-300 bg-white hover:bg-neutral-100 hover:border-neutral-500`}
        >
          <div className="text-center">
            <InputIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground mb-1">
              {isHovering
                ? "Solte os arquivos aqui!"
                : "Arraste e solte arquivos ou clique para selecionar"}
            </p>
          </div>
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((image) => image.id)}
          strategy={rectSortingStrategy}
        >
          {images.length > 0 && (
            <>
              <div className="flex justify-between px-4">
                <h1 className="text-lg font-semibold mb-4">
                  Defina a ordem de exibição das imagens
                </h1>

                <Button variant={"ghost"} onClick={() => setImages([])}>
                  Remover Imagens
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-100">
                {images.map((image, index) => (
                  <ImageCard
                    index={index}
                    key={image.id}
                    image={image}
                    remove={() => removeImage(image.id)}
                  />
                ))}
              </div>
            </>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
}
