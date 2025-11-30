"use client";

import { UploadedImage } from "@/lib/schemas/uplodad-image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ImageCardProps {
  image: UploadedImage;
  remove: VoidFunction;
}

export default function ImageCard({ image, remove }: ImageCardProps) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative rounded-lg overflow-hidden border bg-gray-200 shadow cursor-grab active:cursor-grabbing"
    >
      <img src={image.preview} className="w-full h-40 object-cover" />

      <button
        onClick={remove}
        className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
      >
        X
      </button>
    </div>
  );
}
