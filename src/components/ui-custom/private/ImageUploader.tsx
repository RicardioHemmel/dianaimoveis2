// Icons
import { Images, X, CloudCheck } from "lucide-react";

// React | Next
import { useEffect } from "react";

// Hooks
import useFileUpload from "@/hooks/use-file-upload";

// Components
import DraggableArea from "./drag-n-drop/DraggableArea";

// Cloudinary
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";

export default function ImageUploader() {
  // Custom hook to handle file upload events
  const {
    isDragging,
    UploadedImages,
    setUploadedImages,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFilesFromInput,
    handleCloudUpload,
    removeImage,
    removeAllUploadedImages,
    formattedOrder,
  } = useFileUpload();

  // When component is dismounted kills any reference in memory of images preview URLs
  useEffect(() => {
    return () => {
      UploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
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
        UploadedImages={UploadedImages}
        removeImage={removeImage}
        removeAllUploadedImages={removeAllUploadedImages}
        handleCloudUpload={handleCloudUpload}
        setUploadedImages={setUploadedImages}
        formattedOrder={formattedOrder}
      />
    </>
  );
}
