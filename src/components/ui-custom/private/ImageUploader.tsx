// Icons
import { Images } from "lucide-react";

// React | Next
import { useState } from "react";

// Types
import { UploadedImage, localImage } from "@/lib/schemas/uplodad-image";

// Hooks
import useFileUpload from "@/hooks/useFileUpload";

export default function ImageUploader() {
  // Custom hook to handle file upload events
  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFilesFromInput,
  } = useFileUpload(handleLocalUpload);

  const [localImages, setLocalImages] = useState<localImage[]>([]); // Submitted images on the input
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]); // Images with IDs from cloud storage

  function handleLocalUpload(files: File[]) {
    if (!files.length) return;

    
  }

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

      {/* Drag n Drop Grid */}
      <div className="bg-amber-100 h-10 w-full"></div>
    </>
  );
}
