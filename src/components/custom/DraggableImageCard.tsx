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
import { useFileUploadContext } from "@/context/FileUploadContext";

import { Input } from "@/components/ui/input";
import { Img } from "@react-email/components";

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
  const { fileUploadHook, uploaderId } = useFileUploadContext();

  const { form } = usePropertyFormContext();
  const propertyId = form.watch("_id");
  const {
    removeLocalFile,
    formattedOrder,
    removeImageAndUpdateProperty,
    updateImageLabel,
  } = fileUploadHook;
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

  function handleFloorPlanLabel(e: React.ChangeEvent<HTMLInputElement>) {
    updateImageLabel(image.id, e.currentTarget.value);
  }

  console.log("Renderizou de novo karai");

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex justify-center relative active:cursor-grabbing ${i === 0 && uploaderId === "gallery" ? "sm:col-span-2" : ""}`}
      onDoubleClick={() => onDoubleClick(i)}
    >
      {/* IMAGE CARD */}
      <div className="w-full h-64 relative overflow-hidden animate-[var(--animate-infinity-glow)] rounded-lg">
        <img
          src={image.previewURL ?? ""}
          alt={`Preview da imagem ${image.id}`}
          className="w-full h-full object-cover"
        />
        {/* LABEL INPUT FOR FLOOR PLAN GALLERY */}
        {uploaderId === "floorPlanGallery" && (
          <div
            onMouseEnter={() => setCanDrag(false)}
            onMouseLeave={() => setCanDrag(true)}
            onDoubleClick={(e) => e.stopPropagation()}
            className="flex items-center w-full justify-center absolute bottom-2  min-h-3 "
          >
            <Input
              value={image.label}
              onChange={handleFloorPlanLabel}
              onKeyDown={(e) => {
                // IF THE KEY IS SPACE, IT PREVENTS THE DND-KIT FROM INTERCEPTING IT
                if (e.key === " ") {
                  e.stopPropagation();
                }
              }}
              placeholder="Descrição da Planta"
              className="bg-white w-3/5 text-center"
            />
          </div>
        )}
      </div>

      {/* UPLOADING PROGRESS BAR */}
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

      {/* IMAGE ORDER ON GRID*/}
      <p
        className={`text-center select-none font-bold absolute top-2 left-2 bg-black rounded-full w-7 text-lg text-white
            ${isHighlighted && "animate-[var(--animate-scale-up)]"} `}
      >
        {formattedOrder(i)}
      </p>

      {/* COVER IMAGE BADGE*/}
      {i === 0 && uploaderId === "gallery" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white font-bold bg-black/80 rounded-3xl px-5 py-1">
            Imagem de Capa
          </p>
        </div>
      )}

      {/* CLOUD ICON WHEN FILE ON CLOUD */}
      {image.status === "success" && (
        <div className="absolute top-2 right-10 bg-neutral-100 rounded-full p-1">
          <CloudCheck className="text-[#1dd363] size-4" />
        </div>
      )}

      {/* REMOVE IMAGE BUTTON */}
      <button
        type="button"
        onMouseEnter={() => setCanDrag(false)}
        onMouseLeave={() => setCanDrag(true)}
        disabled={image.status === "deleting"}
        onClick={(e) => {
          if (image.key) {
            removeImageAndUpdateProperty(image.key, form, propertyId);
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
