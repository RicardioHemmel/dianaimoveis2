import {
  DndContext, // DRAG & DROP MAIN CONTEXT
  DragEndEvent, // TYPE OF EVENT EMITTED WHEN DRAG ENDS
  closestCenter, // ALGORITHM TO DETECT COLLISION BETWEEN ITEMS
} from "@dnd-kit/core";

import {
  arrayMove, //UTILITY FUNCTION THAT REORDERS ARRAYS
  SortableContext, // CONTEXT FOR SORTABLE LISTS
  rectSortingStrategy, // GRID-BASED SORTING STRATEGY
} from "@dnd-kit/sortable";

// REACT | NEXT
import { useState } from "react";

// COMPONENTS
import { Button } from "@/components/ui/button";
import DraggableImageCard from "@/components/custom/DraggableImageCard";
import FullScreenImageModal from "@/components/custom/FullScreenModal";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

export default function DraggableArea() {
  const { galleryUploadHook, handleClearGallery } = usePropertyFormContext();
  const { filesUpload, setFilesUpload, formattedOrder } = galleryUploadHook;

  // For highlighting cards during drag n drop
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
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

  // CHANGE IMAGES POSITIONS
  function handleDragEnd(event: DragEndEvent): void {
    // ACTIVE = WHICH ITEM IS BEING CARRIED | OVER = WHERE IT'S DROPPING
    const { active, over } = event;

    // IF USER IS DROPPING IN SOMETHING NOT DROPABBLE
    if (!over) return;

    // DISCOVERS THE ORIGINAL POSITION OF THE IMAGE
    const oldIndex = filesUpload.findIndex((img) => img.id === active.id);
    // DISCOVERS THE NEW POSITION OF THE IMAGE
    const newIndex = filesUpload.findIndex((img) => img.id === over.id);

    if (oldIndex === newIndex) return; // IF THERE IS NO REAL MOVEMENT

    // IDENTIFIES THE RANGE OF MOVED ITEMS FOR HIGHLIGHTING
    const startIndex = Math.min(oldIndex, newIndex);
    const endIndex = Math.max(oldIndex, newIndex);

    // GETS THE IDS OF ALL AFFECTED IMAGES
    const affectedImages = filesUpload
      .slice(startIndex, endIndex + 1)
      .map((img) => img.id);
    setHighlightedIds(affectedImages);
    setTimeout(() => setHighlightedIds([]), 500);

    setFilesUpload((prev) => {
      // RETURNS A NEW ARRAY ALREADY SORTED
      const sortedImages = arrayMove(prev, oldIndex, newIndex);

      return sortedImages.map((img, i) => ({
        ...img,
        order: formattedOrder(i),
      }));
    });
  }

  return (
    <>
      {/* DRAG N DROP GRID */}
      {filesUpload.length > 0 && (
        <DndContext
          collisionDetection={closestCenter} // COLLISION DETECTION ALGORITHM
          onDragEnd={handleDragEnd} // EVENT FIRED WHEN DRAG ENDS
        >
          <SortableContext
            items={filesUpload.map((img) => img.id)} // IDS OF THE DRAGGABLE ITEMS
            strategy={rectSortingStrategy} // GRID-BASED SORTING STRATEGY
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold mb-3 animate-[var(--animate-right-shake)]">
                Defina a ordem de exibição das imagens
              </h3>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={"destructive"}
                  className="rounded-full"
                  onClick={handleClearGallery}
                >
                  Remover imagens
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-100">
              {filesUpload.map((image, i) => (
                // CARD IMAGE
                <DraggableImageCard
                  image={image}
                  i={i}
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
          onClose={onClose}
          doubleClickedImageIndex={doubleClickedImageIndex}
        />
      )}
    </>
  );
}
