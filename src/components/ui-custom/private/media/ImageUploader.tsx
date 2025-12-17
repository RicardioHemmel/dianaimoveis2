// ICONS
import { Images, LucideIcon } from "lucide-react";

// REACT | NEXT
import { useEffect } from "react";

// HOOKS
import useFileUpload from "@/hooks/use-file-upload";

// COMPONENTS
import DraggableArea from "../drag-n-drop/DraggableArea";

interface ImageUploaderProps {
  Icon: LucideIcon;
  fileInputId: string;
}

export default function ImageUploader({
  Icon,
  fileInputId,
}: ImageUploaderProps) {
  // Custom hook to handle file upload events
  const {
    isDragging,
    mediaDrafts,
    setMediaDrafts,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFilesFromInput,
    handleCloudUpload,
    removeImage,
    removeAllMediaDrafts,
    formattedOrder,
  } = useFileUpload();

  // When component is dismounted kills any reference in memory of images preview URLs
  useEffect(() => {
    return () => {
      mediaDrafts.forEach((img) => URL.revokeObjectURL(img.preview));
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
          id={fileInputId}
          className="hidden"
        />
        {/* Droppable area */}
        <div
          className="mb-8 border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer border-neutral-300 bg-white hover:bg-neutral-100 hover:border-neutral-500"
          onClick={() => document.getElementById(fileInputId)?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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

      <DraggableArea
        mediaDrafts={mediaDrafts}
        removeImage={removeImage}
        removeAllMediaDrafts={removeAllMediaDrafts}
        handleCloudUpload={handleCloudUpload}
        setMediaDrafts={setMediaDrafts}
        formattedOrder={formattedOrder}
      />
    </>
  );
}
