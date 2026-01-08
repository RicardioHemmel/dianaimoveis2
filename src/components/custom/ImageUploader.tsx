// ICONS
import { LucideIcon } from "lucide-react";

// REACT | NEXT
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

// COMPONENTS
import DraggableArea from "./DraggableArea";

// SCHEMAS
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";
import { usePropertyFormContext } from "@/context/PropertyFormContext";

interface ImageUploaderProps {
  Icon: LucideIcon;
  uploaderId: string;
}

export default function ImageUploader({
  Icon,
  uploaderId,
}: ImageUploaderProps) {
  // CUSTOM HOOK TO HANDLE FILE UPLOAD EVENTS
  const { fileUploadHook } = usePropertyFormContext();

  const {
    isDragging,
    filesUpload,
    removeCloudFile,
    removeLocalFile,
    removeAllFiles,
    setFilesUpload,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleFilesDrop,
    handleFilesFromInput,
    formattedOrder,
    mapRemoteFilesToFileUpload,
  } = fileUploadHook;

  // IMAGES CLEANUP
  useEffect(() => {
    return () => {
      filesUpload.forEach((img) => URL.revokeObjectURL(img.previewURL ?? ""));
    };
  }, []);

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
      <DraggableArea
        filesUpload={filesUpload}
        removeCloudFile={removeCloudFile}
        removeLocalFile={removeLocalFile}
        removeAllFiles={removeAllFiles}
        setFilesUpload={setFilesUpload}
        formattedOrder={formattedOrder}
      />
    </>
  );
}
