// ICONS
import { LucideIcon } from "lucide-react";

// REACT | NEXT
import { useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";

// COMPONENTS
import DraggableArea from "./DraggableArea";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";
import { FileUpload } from "@/lib/schemas/media/file.schema";

interface ImageUploaderProps {
  Icon: LucideIcon;
  uploaderId: string;
}

export default function ImageUploader({
  Icon,
  uploaderId,
}: ImageUploaderProps) {
  // CUSTOM HOOK TO HANDLE FILE UPLOAD EVENTS
  const { fileUploadHook, form } = usePropertyFormContext();

  // ISOLATES SIGNATURE TO PREVENT RE-RENDER
  const propertyGallery = useWatch({
    control: form.control,
    name: "propertyGallery",
  });

  const {
    isDragging,
    filesUpload,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleFilesDrop,
    handleFilesFromInput,
  } = fileUploadHook;

  //---------------- IMAGES CLEANUP --------------------
  //KEEP IN MEMORY IMAGE FILES BETWEEN RENDERS
  const prevFilesRef = useRef<FileUpload[]>([]);

  // WHEN FILES ARE ADDED, REMOVED OR CHANGED POSITIONS
  useEffect(() => {
    // PREV FILES STATE
    const prev = prevFilesRef.current;

    // CHECKS IF THE PREV FILE IS STILL ON THE UI. IF IT'S NOT, REMOVE IT FROM MEMORY
    prev.forEach((prevImg) => {
      const stillExists = filesUpload.some(
        (img) => img.previewURL === prevImg.previewURL
      );

      if (!stillExists && prevImg.previewURL?.startsWith("blob")) {
        URL.revokeObjectURL(prevImg.previewURL);
      }
    });

    prevFilesRef.current = filesUpload;
  }, [filesUpload]);

  return (
    <>
      <div>
        {/* FILE INPUT */}
        <input
          onChange={handleFilesFromInput}
          multiple
          accept="image/*"
          type="file"
          id={uploaderId}
          className="hidden"
        />
        {/* DROPPABLE AREA */}
        <div
          className="mb-8 border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer border-neutral-300 bg-white hover:bg-neutral-100 hover:border-neutral-500"
          onClick={() => document.getElementById(uploaderId)?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleFilesDrop}
          onDragOver={handleDragOver}
        >
          <Icon className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-foreground text-center text-sm font-medium">
            {isDragging
              ? "Solte os arquivos aqui!"
              : "Arraste e solte os arquivos ou Clique para selecionar"}
          </p>
        </div>
      </div>

      {/* DRAGGABLE AREA WITH ALL IMAGES */}
      <DraggableArea />
    </>
  );
}
