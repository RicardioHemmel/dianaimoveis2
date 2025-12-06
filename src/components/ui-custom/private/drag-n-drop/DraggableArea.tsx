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


import { Button } from "@/components/ui/button";
import { LocalImage } from "@/lib/schemas/uplodad-image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import FullScreenImageModal from "../FullScreenModal";

interface DraggableAreaProps {
  localImages: LocalImage[];
  removeImage: (id: number) => void;
  removeAllLocalImages: () => void;
  handleCloudUpload: (files: LocalImage[]) => void;
  setLocalImages: Dispatch<SetStateAction<LocalImage[]>>;
  formattedOrder: (i: number) => number;
}

export default function DraggableArea({
  localImages,
  removeImage,
  removeAllLocalImages,
  handleCloudUpload,
  setLocalImages,
  formattedOrder,
}: DraggableAreaProps) {
  // For highlighting cards during drag n drop
  const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
  const [doubleClickedImageIndex, setDoubleClickedImageIndex] = useState<
    number | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setDoubleClickedImageIndex(null);
    setIsModalOpen(false);
  };

  function handleDoubleClick(imageIndex: number): void {
    setDoubleClickedImageIndex(imageIndex);
    setIsModalOpen(true);
  }

  // Change images positions
  function handleDragEnd(event: DragEndEvent): void {
    // active = Which item is being carried | over = Where it's dropping
    const { active, over } = event;

    // If user is dropping in something not dropabble
    if (!over) return;

    // Discovers the original position of the image
    const oldIndex = localImages.findIndex((img) => img.id === active.id);
    // Discovers the new position of the image
    const newIndex = localImages.findIndex((img) => img.id === over.id);

    if (oldIndex === newIndex) return; // If there is no real movement

    // Identifies the range of moved items for highlighting
    const startIndex = Math.min(oldIndex, newIndex);
    const endIndex = Math.max(oldIndex, newIndex);

    // Gets the IDs of all affected images
    const affectedIds = localImages
      .slice(startIndex, endIndex + 1)
      .map((img) => img.id);
    setHighlightedIds(affectedIds);
    setTimeout(() => setHighlightedIds([]), 500);

    setLocalImages((prev) => {
      // Returns a new array already sorted
      const sortedImages = arrayMove(prev, oldIndex, newIndex);

      return sortedImages.map((img, i) => ({
        ...img,
        order: formattedOrder(i),
      }));
    });
  }
  return (
    <>
      {/* Drag n Drop Grid */}
      {localImages.length > 0 && (
        <DndContext
          collisionDetection={closestCenter} // Collision detection algorithm
          onDragEnd={handleDragEnd} // Event fired when drag ends
        >
          <SortableContext
            items={localImages.map((img) => img.id)} // IDs of the draggable items
            strategy={rectSortingStrategy} // Grid-based sorting strategy
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold mb-3 animate-[var(--animate-right-shake)]">
                Defina a ordem de exibição das imagens
              </h3>
              <div className="flex gap-3">
                <Button
                  variant={"destructive"}
                  className="rounded-full"
                  onClick={removeAllLocalImages}
                >
                  Remover imagens
                </Button>
                <Button
                  className="rounded-full bg-[image:var(--gradient-primary)]"
                  onClick={() => handleCloudUpload(localImages)}
                >
                  Salvar imagens
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-100">
              {localImages.map((image, i) => (
                <ImageCard
                  image={image}
                  removeImage={removeImage}
                  i={i}
                  formattedOrder={formattedOrder}
                  key={image.id}
                  isHighlighted={highlightedIds.includes(image.id)}
                  onDoubleClick={handleDoubleClick}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {isModalOpen && (
        <FullScreenImageModal
          localImages={localImages}
          onClose={onClose}
          doubleClickedImageIndex={doubleClickedImageIndex}
        />
      )}
    </>
  );
}
