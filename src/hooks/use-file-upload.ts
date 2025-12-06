import { LocalImage, UploadedImage } from "@/lib/schemas/uplodad-image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function useFileUpload() {
  // For onDragEnter and onDragLeave control
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [localImages, setLocalImages] = useState<LocalImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]); // Images with IDs from cloud storage

  const countRef = useRef(0); // To prevent flickering when dragging over child elements
  const countImageIdRef = useRef(1); // Used as images IDs

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

  // Allows the drop to work (without this the browser opens the file).
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
    oldFiles: LocalImage[]
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
    setLocalImages((prev) => {
      // Image to be removed
      const targetImage = prev.find((image) => image.id === id);

      // Kills any reference to temporary image URL
      if (targetImage) {
        URL.revokeObjectURL(targetImage.preview);
      }

      const filteredImages = prev.filter((img) => img.id !== targetImage?.id);

      // Return all images with their new order
      return filteredImages.map((img, i) => ({
        ...img,
        order: formattedOrder(i),
      }));
    });
  }

  function removeAllLocalImages() {
    setLocalImages((prev) => {
      prev?.map((img) => {
        URL.revokeObjectURL(img.preview);
      });

      return [];
    });
  }

  // ------------------------------ Local images to be manipulated before go to a cloud storage -----------------------//

  // Calls the upload handler when files are dropped into the drop area
  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();

    // Reset drag counter
    countRef.current = 0;
    setIsDragging(false);

    // Verifies if files were dropped
    const files = Array.from(e.dataTransfer.files);
    if (files.length) handleLocalUpload(files);
  }

  // Calls the upload handler when files are selected from the input
  function handleFilesFromInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const files = Array.from(e.target.files || []);
    if (files.length) handleLocalUpload(files);

    // Cleans file path in memory so it's possible to resent the same image after removing it
    e.target.value = "";
  }

  function handleLocalUpload(files: File[]): void {
    // Validates uploaded files
    const invalidFiles = validateFilesType(files, ["image/"]);
    const hasDuplicates = hasDuplicateFiles(files, localImages);
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

    // Starting point for creating images IDs
    const startId = countImageIdRef.current;

    const mappedImages: LocalImage[] = files.map((file, i) => {
      return {
        id: startId + i,
        file: file,
        preview: URL.createObjectURL(file),
        order: localImages.length + 1 + i,
        uploadProgress: 0,
        status: "editing",
      };
    });

    //Guarantees that the ID of the next images will not be the same as those of previously deleted images
    countImageIdRef.current = startId + files.length;

    // Adds new images to the previous list
    setLocalImages((prev) => [...prev, ...mappedImages]);
  }

  // Sends a image to Cloudinary
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
    setLocalImages((prev) =>
      prev.map((img) => ({
        ...img,
        status: "uploading",
        uploadProgress: 0,
      }))
    );

    const results = await Promise.allSettled(
      localImages.map((img) =>
        uploadImageToCloud(img.file, (progress) => {
          setLocalImages((prev) =>
            prev.map((i) =>
              i.id === img.id ? { ...i, uploadProgress: progress } : i
            )
          );
        })
          .then((res) => ({
            id: img.id,
            status: "success",
            data: res.data,
          }))
          .catch(() => ({
            id: img.id,
            status: "error",
          }))
      )
    );

    // atualiza estado final uma única vez
    setLocalImages((prev) =>
      prev.map((img) => {
        const result = results.find((r) =>
          r.status === "fulfilled"
            ? r.value.id === img.id
            : r.reason?.id === img.id
        );

        if (!result) return img;

        if (result.status === "fulfilled")
          return { ...img, status: "success" };

        return { ...img, status: "error" };
      })
    );

    console.log("FINAL:", results);
  }

  return {
    isDragging,
    localImages,
    setLocalImages,
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
    removeAllLocalImages,
    formattedOrder,
  };
}
