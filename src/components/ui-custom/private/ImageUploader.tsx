// Icons
import { Images } from "lucide-react";

// React | Next
import { useState, useRef, useEffect } from "react";

// Types
import { UploadedImage, LocalImage } from "@/lib/schemas/uplodad-image";

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
    hasDuplicateFiles,
    validateFilesType,
  } = useFileUpload(handleLocalUpload);

  const [localImages, setLocalImages] = useState<LocalImage[]>([]); // Submitted images on the input
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]); // Images with IDs from cloud storage
  const countImageIdRef = useRef(1);

  useEffect(() => {
    return () => {
      localImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, []);

  useEffect(() => {
    console.log(localImages);
  }, [localImages]);

  function handleLocalUpload(files: File[]) {
    // Validates uploaded files
    const invalidFiles = validateFilesType(files, ["image/"]);
    const hasDuplicates = hasDuplicateFiles(files, localImages);
    if (!files.length) return alert("Nenhum arquivo selecionado");
    if (invalidFiles) return alert("Tipo de arquivo inválido");
    if (hasDuplicates) return alert("Essa imagem já foi inserida");

    // Starting point for creating images IDs
    const startId = countImageIdRef.current;

    const mappedImages: LocalImage[] = files.map((file, i) => {
      return {
        id: startId + i,
        file: file,
        preview: URL.createObjectURL(file),
        order: localImages.length + 1 + i,
        status: "editing",
      };
    });

    //Guarantees that the ID of the next images will not be the same as those of previously deleted images
    countImageIdRef.current = startId + files.length;

    // Adds new images to the previous list
    setLocalImages((prev) => [...prev, ...mappedImages]);
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
      <div className="bg-amber-100 w-full">
        {localImages.length > 0 &&
          localImages.map((image) => (
            <div className="grid grid-cols-3 gap-3" key={image.id}>
              <div>
                <img src={image.preview} className="h-64 object-cover" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
