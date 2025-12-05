// Icons
import { Images, X } from "lucide-react";

// React | Next
import { useState, useRef, useEffect } from "react";

// Types
import { UploadedImage, LocalImage } from "@/lib/schemas/uplodad-image";

// Hooks
import useFileUpload from "@/hooks/use-file-upload";

// Components
import { Button } from "@/components/ui/button";

export default function ImageUploader() {
  // Custom hook to handle file upload events
  const {
    isDragging,
    localImages,
    countImageIdRef,
    uploadedImages,
    setUploadedImages,
    setLocalImages,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFilesFromInput,
    hasDuplicateFiles,
    validateFilesType,
    handleCloudUpload,
    handleLocalUpload,
    removeImage,
  } = useFileUpload();

  // When component is dismounted kills any reference in memory of images preview URLs
  useEffect(() => {
    return () => {
      localImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, []);

  useEffect(() => {
    console.log(localImages);
  }, [localImages]);

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
      {localImages.length > 0 && (
        <>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-3">
              Defina a ordem de exibição das imagens
            </h3>
            <div className="flex gap-3">
              <Button
                variant={"destructive"}
                className="rounded-full"
                onClick={() => {
                  setLocalImages([]);
                }}
              >
                Remover imagens
              </Button>
              <Button
                className="rounded-full bg-[image:var(--gradient-primary)]"
                onClick={handleCloudUpload}
              >
                Salvar imagens
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-100">
            {localImages.map((image, i) => (
              <div key={image.id} className="flex justify-center relative">
                <img
                  src={image.preview}
                  className="h-64 w-full object-cover rounded-lg animate-[var(--animate-infinity-glow)]"
                />

                <p className="text-center select-none font-bold absolute top-2 left-2 bg-black rounded-full w-7 text-lg text-white">
                  {i + 1}
                </p>

                <button className="absolute top-2 right-2 rounded-full cursor-pointer p-0.5 bg-red-600 hover:bg-red-700">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
