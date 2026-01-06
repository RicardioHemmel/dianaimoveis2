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
import { Dispatch, SetStateAction, useState } from "react";

// COMPONENTS
import { Button } from "@/components/ui/button";
import DraggableImageCard from "@/components/custom/DraggableImageCard";
import FullScreenImageModal from "@/components/custom/FullScreenModal";

// SCHEMAS
import { FileUpload } from "@/lib/schemas/media/file.schema";

interface DraggableAreaProps {
  filesUpload: FileUpload[];
  removeOneCloudFile: (key: string) => Promise<void>;
  removeAllFiles: () => void;
  setFilesUpload: Dispatch<SetStateAction<FileUpload[]>>;
  formattedOrder: (i: number) => number;
}

export default function DraggableArea({
  filesUpload,
  removeOneCloudFile,
  removeAllFiles,
  setFilesUpload,
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
    const oldIndex = filesUpload.findIndex((img) => img.tempId === active.id);
    // Discovers the new position of the image
    const newIndex = filesUpload.findIndex((img) => img.tempId === over.id);

    if (oldIndex === newIndex) return; // If there is no real movement

    // Identifies the range of moved items for highlighting
    const startIndex = Math.min(oldIndex, newIndex);
    const endIndex = Math.max(oldIndex, newIndex);

    // Gets the IDs of all affected images
    const affectedIds = filesUpload
      .slice(startIndex, endIndex + 1)
      .map((img) => img.tempId);
    setHighlightedIds(affectedIds);
    setTimeout(() => setHighlightedIds([]), 500);

    setFilesUpload((prev) => {
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
      {filesUpload.length > 0 && (
        <DndContext
          collisionDetection={closestCenter} // Collision detection algorithm
          onDragEnd={handleDragEnd} // Event fired when drag ends
        >
          <SortableContext
            items={filesUpload.map((img) => img.tempId)} // IDs of the draggable items
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
                  onClick={removeAllFiles}
                >
                  Remover imagens
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-100">
              {filesUpload.map((image, i) => (
                <DraggableImageCard
                  image={image}
                  removeOneCloudMedia={removeOneCloudFile}
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
          filesUpload={filesUpload}
          onClose={onClose}
          doubleClickedImageIndex={doubleClickedImageIndex}
        />
      )}
    </>
  );
}
