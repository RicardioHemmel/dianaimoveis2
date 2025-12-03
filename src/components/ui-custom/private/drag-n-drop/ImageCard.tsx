"use client";

import { UploadedImage } from "@/lib/schemas/uplodad-image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface ImageCardProps {
  image: UploadedImage;
  remove: VoidFunction;
  index: number;
}

export default function ImageCard({ image, remove, index }: ImageCardProps) {
  const [canDrag, setCanDrag] = useState(true);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: image.id,
      disabled: !canDrag,
    });

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
      <img src={image.preview} className="w-full h-64 object-cover" />

      <p className="text-center font-bold absolute top-2 left-2 bg-[var(--bg-selected)] rounded-full w-7 text-lg text-white">
        {index + 1}
      </p>

      <button
        onMouseEnter={() => setCanDrag(false)}
        onMouseLeave={() => setCanDrag(true)}
        onClick={remove}
        className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded cursor-pointer"
      >
        X
      </button>
    </div>
  );
}
