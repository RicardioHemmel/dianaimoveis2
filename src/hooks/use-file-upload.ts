import { useRef, useState } from "react";
import { toast } from "sonner";
import { MediaDraft } from "@/lib/schemas/media/media-draft";

//UPLOAD FILE WITH AXIOS TO ACCESS THE "UPLOAD PROGRESS"
import axios from "axios"; 

export default function useFileUpload() {
  // FOR ONDRAGENTER AND ONDRAGLEAVE CONTROL
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mediaDrafts, setMediaDrafts] = useState<MediaDraft[]>([]);

  const countRef = useRef(0); // TO PREVENT FLICKERING WHEN DRAGGING OVER CHILD ELEMENTS
  const countImageIdRef = useRef(1); // USED AS IMAGES IDS

  function formattedOrder(i: number): number {
    return i + 1;
  }

  function handleDragEnter(): void {
    countRef.current++;
    setIsDragging(true);
  }

  function handleDragLeave(): void {
    countRef.current--;
    if (countRef.current === 0) {
      setIsDragging(false);
    }
  }

  // ALLOWS THE DROP TO WORK (WITHOUT THIS THE BROWSER OPENS THE FILE).
  function handleDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function validateFilesType(files: File[], acceptedTypes: string[]): boolean {
    return files.some((file) =>
      acceptedTypes.some((type) => !file.type.startsWith(type))
    );
  }

  function hasDuplicateFiles(
    newFiles: File[],
    oldFiles: MediaDraft[]
  ): boolean {
    return newFiles.some((newFile) =>
      oldFiles.some(
        (oldFile) =>
          newFile.name === oldFile.file.name &&
          newFile.size === oldFile.file.size
      )
    );
  }

  function removeImage(id: number): void {
    setMediaDrafts((prev) => {
      // IMAGE TO BE REMOVED
      const targetImage = prev.find((image) => image.tempId === id);

      // KILLS ANY REFERENCE TO TEMPORARY IMAGE URL
      if (targetImage) {
        URL.revokeObjectURL(targetImage.preview);
      }

      const filteredImages = prev.filter((img) => img.tempId !== targetImage?.tempId);

      // RETURN ALL IMAGES WITH THEIR NEW ORDER
      return filteredImages.map((img, i) => ({
        ...img,
        order: formattedOrder(i),
      }));
    });
  }

  function removeAllMediaDrafts() {
    setMediaDrafts((prev) => {
      prev?.map((img) => {
        URL.revokeObjectURL(img.preview);
      });

      return [];
    });
  }

  // ------------------------------ LOCAL IMAGES TO BE MANIPULATED BEFORE GO TO A CLOUD STORAGE -----------------------//

  // CALLS THE UPLOAD HANDLER WHEN FILES ARE DROPPED INTO THE DROP AREA
  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();

    // RESET DRAG COUNTER
    countRef.current = 0;
    setIsDragging(false);

    // VERIFIES IF FILES WERE DROPPED
    const files = Array.from(e.dataTransfer.files);
    if (files.length) handleLocalUpload(files);
  }

  // CALLS THE UPLOAD HANDLER WHEN FILES ARE SELECTED FROM THE INPUT
  function handleFilesFromInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const files = Array.from(e.target.files || []);
    if (files.length) handleLocalUpload(files);

    // CLEANS FILE PATH IN MEMORY SO IT'S POSSIBLE TO RESENT THE SAME IMAGE AFTER REMOVING IT
    e.target.value = "";
  }

  function handleLocalUpload(files: File[]): void {
    // VALIDATES UPLOADED FILES
    const invalidFiles = validateFilesType(files, ["image/"]);
    const hasDuplicates = hasDuplicateFiles(files, mediaDrafts);
    if (!files.length) {
      toast.error("Nenhum arquivo selecionado");
      return;
    }
    if (invalidFiles) {
      toast.error("Tipo de arquivo inválido");
      return;
    }
    if (hasDuplicates) {
      toast.error("Essa imagem já foi inserida");
      return;
    }

    // START POINT FOR CREATING IMAGES IDS
    const startId = countImageIdRef.current;

    const mappedImages: MediaDraft[] = files.map((file, i) => {
      return {
        tempId: startId + i, // IMAGE ID
        file: file, // FILE ITSELF
        preview: URL.createObjectURL(file), // FOR IMAGE PREVIEW
        order: mediaDrafts.length + 1 + i, // POSITION ON ARRAY
        uploadProgress: 0, // UPLOAD PROGRESS FOR USER FEEDBACK
        status: "local", // FILE STATE
      };
    });

    // GUARANTEES THAT THE ID OF THE NEXT IMAGES WILL NOT BE THE SAME AS THOSE OF PREVIOUSLY DELETED IMAGES
    countImageIdRef.current = startId + files.length;

    // ADDS NEW IMAGES TO THE PREVIOUS LIST
    setMediaDrafts((prev) => [...prev, ...mappedImages]);
  }

  // SENDS A IMAGE TO CLOUDINARY
  function uploadImageToCloud(file: File, onProgress: (n: number) => void) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "propertyImages");

    return axios.post(
      "https://api.cloudinary.com/v1_1/dktebbtcr/image/upload",
      formData,
      {
        onUploadProgress: (event) => {
          if (!event.total) return;
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        },
      }
    );
  }

  // ------------------------------ Sends images to a cloud storage and registers them on RHF -----------------------//
  async function handleCloudUpload() {
    // Only uploads images that are not already uploaded
    const inMemoryImages = mediaDrafts.filter(
      (img) => img.status === "local"
    );

    if (!inMemoryImages.length) {
      toast.success("Todas as imagens já estão na nuvem!");
      return;
    }

    // Sets all images to uploading status and resets progress
    setMediaDrafts((prev) =>
      prev.map((img) =>
        img.status === "local"
          ? { ...img, status: "uploading", uploadProgress: 0 }
          : img
      )
    );

    // Waits all uploads to finish
    const results = await Promise.allSettled(
      inMemoryImages.map((img) =>
        uploadImageToCloud(img.file, (progress) => {
          setMediaDrafts((prev) =>
            prev.map((i) =>
              i.tempId === img.tempId ? { ...i, uploadProgress: progress } : i
            )
          );
        })
          .then((res) => ({
            id: img.tempId,
            status: "success",
            data: res.data,
          }))
          .catch(() => ({
            id: img.tempId,
            status: "error",
          }))
      )
    );

    // updates final state of each image based on upload result
    setMediaDrafts((prev) =>
      prev.map((img) => {
        const result = results.find((r) =>
          r.status === "fulfilled"
            ? r.value.id === img.tempId
            : r.reason?.id === img.tempId
        );

        if (!result) return img;

        if (result.status === "fulfilled") return { ...img, status: "success" };

        return { ...img, status: "error" };
      })
    );

    console.log("FINAL:", results);
  }

  return {
    isDragging,
    mediaDrafts,
    setMediaDrafts,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFilesFromInput,
    validateFilesType,
    hasDuplicateFiles,
    handleLocalUpload,
    handleCloudUpload,
    removeImage,
    removeAllMediaDrafts,
    formattedOrder,
  };
}
