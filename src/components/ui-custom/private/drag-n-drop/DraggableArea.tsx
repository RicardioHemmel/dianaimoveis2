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
import { MediaDraft } from "@/lib/schemas/media/media-draft";
import { Dispatch, SetStateAction, useState } from "react";
import ImageCard from "./ImageCard";
import FullScreenImageModal from "../media/FullScreenModal";

interface DraggableAreaProps {
  mediaDrafts: MediaDraft[];
  removeImage: (id: number) => void;
  removeAllMediaDrafts: () => void;
  handleCloudUpload: (files: MediaDraft[]) => void;
  setMediaDrafts: Dispatch<SetStateAction<MediaDraft[]>>;
  formattedOrder: (i: number) => number;
}

export default function DraggableArea({
  mediaDrafts,
  removeImage,
  removeAllMediaDrafts,
  handleCloudUpload,
  setMediaDrafts,
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
    const oldIndex = mediaDrafts.findIndex((img) => img.tempId === active.id);
    // Discovers the new position of the image
    const newIndex = mediaDrafts.findIndex((img) => img.tempId === over.id);

    if (oldIndex === newIndex) return; // If there is no real movement

    // Identifies the range of moved items for highlighting
    const startIndex = Math.min(oldIndex, newIndex);
    const endIndex = Math.max(oldIndex, newIndex);

    // Gets the IDs of all affected images
    const affectedIds = mediaDrafts
      .slice(startIndex, endIndex + 1)
      .map((img) => img.tempId);
    setHighlightedIds(affectedIds);
    setTimeout(() => setHighlightedIds([]), 500);

    setMediaDrafts((prev) => {
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
      {mediaDrafts.length > 0 && (
        <DndContext
          collisionDetection={closestCenter} // Collision detection algorithm
          onDragEnd={handleDragEnd} // Event fired when drag ends
        >
          <SortableContext
            items={mediaDrafts.map((img) => img.tempId)} // IDs of the draggable items
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
                  onClick={removeAllMediaDrafts}
                >
                  Remover imagens
                </Button>
                <Button
                  className="rounded-full bg-[image:var(--gradient-primary)]"
                  onClick={() => handleCloudUpload(mediaDrafts)}
                >
                  Salvar imagens
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-100">
              {mediaDrafts.map((image, i) => (
                <ImageCard
                  image={image}
                  removeImage={removeImage}
                  i={i}
                  formattedOrder={formattedOrder}
                  key={image.tempId}
                  isHighlighted={highlightedIds.includes(image.tempId)}
                  onDoubleClick={handleDoubleClick}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {isModalOpen && (
        <FullScreenImageModal
          mediaDrafts={mediaDrafts}
          onClose={onClose}
          doubleClickedImageIndex={doubleClickedImageIndex}
        />
      )}
    </>
  );
}
