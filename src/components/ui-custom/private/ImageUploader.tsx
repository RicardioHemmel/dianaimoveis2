// Icons
import { Images, X } from "lucide-react";

// React | Next
import { useEffect } from "react";

// Hooks
import useFileUpload from "@/hooks/use-file-upload";

// Components
import DraggableArea from "./drag-n-drop/DraggableArea";

// Cloudinary
import {} from "cloudinary"

export default function ImageUploader() {
  // Custom hook to handle file upload events
  const {
    isDragging,
    localImages,
    setLocalImages,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFilesFromInput,
    handleCloudUpload,
    removeImage,
    removeAllLocalImages,
    formattedOrder,
  } = useFileUpload();

  // When component is dismounted kills any reference in memory of images preview URLs
  useEffect(() => {
    return () => {
      localImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, []);

  return (
    <>
      <div>
        {/* File Input */}
        <input
          onChange={handleFilesFromInput}
          multiple
          accept="image/*"
          type="file"
          id="imageUploadInput"
          className="hidden"
        />
        {/* Droppable area */}
        <div
          className="mb-8 border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer border-neutral-300 bg-white hover:bg-neutral-100 hover:border-neutral-500"
          onClick={() => document.getElementById("imageUploadInput")?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Images className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-foreground text-center text-sm font-medium">
            {isDragging
              ? "Solte os arquivos aqui!"
              : "Arraste e solte os arquivos ou Clique para selecionar"}
          </p>
        </div>
      </div>

      <DraggableArea
        localImages={localImages}
        removeImage={removeImage}
        removeAllLocalImages={removeAllLocalImages}
        handleCloudUpload={handleCloudUpload}
        setLocalImages={setLocalImages}
        formattedOrder={formattedOrder}
      />
    </>
  );
}
