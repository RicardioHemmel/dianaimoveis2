"use client";

// DND KIT
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// TYPES
import { FileUpload } from "@/lib/schemas/media/file.schema";

// REACT | NEXT
import { useState } from "react";

// ICONS
import { CloudCheck, X, Loader } from "lucide-react";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

interface ImageCardProps {
  image: FileUpload;
  i: number;
  isHighlighted: boolean;
  onDoubleClick: (imageIndex: number) => void;
}

export default function DraggableImageCard({
  image,
  i,
  isHighlighted,
  onDoubleClick,
}: ImageCardProps) {
  const { galleryUploadHook, handleRemoveSingleImage } =
    usePropertyFormContext();
  const { removeLocalFile, formattedOrder } = galleryUploadHook;
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
      className={`flex justify-center relative active:cursor-grabbing ${i === 0 ? "sm:col-span-2" : ""}`}
      onDoubleClick={() => onDoubleClick(i)}
    >
      <div className="w-full h-64 relative overflow-hidden animate-[var(--animate-infinity-glow)] rounded-lg">
        <img
          src={image.previewURL ?? ""}
          alt={`Preview da imagem ${image.id}`}
          className="w-full h-full object-cover"
        />
      </div>

      {image.status === "uploading" && (
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none bg-black/60 rounded-lg">
          <p className="text-white font-bold">{image.uploadProgress}%</p>
          <div className="w-[70%] bg-white/40 backdrop-blur-sm h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--soft-primary-custom)] transition-all"
              style={{ width: `${image.uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <p
        className={`text-center select-none font-bold absolute top-2 left-2 bg-black rounded-full w-7 text-lg text-white
            ${isHighlighted && "animate-[var(--animate-scale-up)]"} `}
      >
        {formattedOrder(i)}
      </p>

      {i === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white font-bold bg-black/80 rounded-3xl px-5 py-1">
            Imagem de Capa
          </p>
        </div>
      )}

      {image.status === "success" && (
        <div className="absolute top-2 right-10 bg-neutral-100 rounded-full p-1">
          <CloudCheck className="text-[#1dd363] size-4" />
        </div>
      )}

      <button
        type="button"
        onMouseEnter={() => setCanDrag(false)}
        onMouseLeave={() => setCanDrag(true)}
        disabled={image.status === "deleting"}
        onClick={(e) => {
          if (image.key) {
            handleRemoveSingleImage(image.key);
          } else if (image.id) {
            removeLocalFile(image.id);
          }
        }}
        className="absolute top-2 right-2 rounded-full cursor-pointer p-0.5 bg-red-600 hover:bg-red-700"
      >
        {image.status === "deleting" ? (
          <Loader className="size-5 text-white animate-spin" />
        ) : (
          <X className="size-5 text-white" />
        )}
      </button>
    </div>
  );
}
