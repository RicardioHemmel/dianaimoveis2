import { useRef, useState } from "react";
import { toast } from "sonner";
import { FileUpload } from "@/lib/schemas/media/file.schema";
import {
  GalleryItemSchema,
} from "@/lib/schemas/property/property.schema";

export default function useFileUpload() {
  // FOR ONDRAGENTER AND ONDRAGLEAVE CONTROL
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [filesUpload, setFilesUpload] = useState<FileUpload[]>([]);

  const countRef = useRef(0); // TO PREVENT FLICKERING WHEN DRAGGING OVER CHILD ELEMENTS

  // ---------------------------------------------------- DRAG N DROP  ------------------------------------------ //

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

  // CALLS THE UPLOAD HANDLER WHEN FILES ARE DROPPED INTO THE DROP AREA
  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();

    // RESET DRAG COUNTER
    countRef.current = 0;
    setIsDragging(false);

    // VERIFIES IF FILES WERE DROPPED
    const files = Array.from(e.dataTransfer.files);
    if (files.length) handleFileUpload(files);
  }

  // CALLS THE UPLOAD HANDLER WHEN FILES ARE SELECTED FROM THE INPUT
  function handleFilesFromInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const files = Array.from(e.target.files || []);
    if (files.length) handleFileUpload(files);

    // CLEANS FILE PATH IN MEMORY SO IT'S POSSIBLE TO RESENT THE SAME IMAGE AFTER REMOVING IT
    e.target.value = "";
  }

  // MAPS IMAGES TO SHOW ON EDIT PROPERTY MODE
  function mapRemoteFiles(images: GalleryItemSchema[]): FileUpload[] {
    return images.map((image, i) => ({
      id: window.crypto.randomUUID(),
      key: image.key,
      previewURL: image.url,
      order: image.order ?? i,
      status: "success",
    }));
  }

  async function handleFileUpload(files: File[]): Promise<void> {
    // VALIDATES UPLOADED FILES
    const invalidFiles = validateFilesType(files, ["image/"]);
    const hasDuplicates = hasDuplicateFiles(files, filesUpload);
    const hasOversizedFiles = validateFilesSize(files);

    if (hasOversizedFiles) {
      toast.error("Arquivo(s) excedem o tamanho máximo permitido (8MB)");
      return;
    }

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

    const mappedImages: FileUpload[] = files.map((file, i) => {
      return {
        id: window.crypto.randomUUID(), // UNIQUE ID FOR DND KIT
        file: file, // FILE ITSELF
        previewURL: URL.createObjectURL(file), // FOR IMAGE PREVIEW
        order: filesUpload.length + 1 + i, // POSITION ON ARRAY
        uploadProgress: 0, // UPLOAD PROGRESS FOR USER FEEDBACK
        status: "idle",
      };
    });

    // ADDS NEW IMAGES TO THE PREVIOUS LIST
    setFilesUpload((prev) => [...prev, ...mappedImages]);

    await handleCloudUpload(mappedImages);
  }

  // ---------------------------------------------------- VALIDATIONS ------------------------------------------ //

  function validateFilesType(files: File[], acceptedTypes: string[]): boolean {
    return files.some((file) =>
      acceptedTypes.some((type) => !file.type.startsWith(type))
    );
  }

  function validateFilesSize(files: File[]) {
    const maxSizeInBytes = 8 * 1024 * 1024; // 8MB
    return files.some((file) => file.size > maxSizeInBytes);
  }

  function hasDuplicateFiles(
    newFiles: File[],
    oldFiles: FileUpload[]
  ): boolean {
    return newFiles.some((newFile) =>
      oldFiles.some(
        (oldFile) =>
          oldFile.file &&
          newFile.name === oldFile.file.name &&
          newFile.size === oldFile.file.size
      )
    );
  }

  // ---------------------------------------------------- CLOUD ACTIONS ------------------------------------------ //

  // SENDS A IMAGE TO CLOUD STORAGE WITH UPLOAD PROGRESS
  async function uploadSingleImage(file: File) {
    try {
      const presignedUrlResponse = await fetch("/api/s3/upload/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!presignedUrlResponse.ok) {
        toast.error("Erro ao obter URL de upload");
        setFilesUpload((prev) =>
          prev.map((img) =>
            img.file === file ? { ...img, uploadProgress: 0, error: true } : img
          )
        );
        return;
      }

      const { presignedUrl, key } = await presignedUrlResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const porcentageCompleted = (event.loaded / event.total) * 100;
            setFilesUpload((prev) =>
              prev.map((img) =>
                img.file === file
                  ? {
                      ...img,
                      uploadProgress: Math.round(porcentageCompleted),
                      key: key,
                    }
                  : img
              )
            );
          }
        };
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFilesUpload((prev) =>
              prev.map((img) =>
                img.file === file
                  ? {
                      ...img,
                      uploadProgress: 100,
                      status: "success",
                    }
                  : img
              )
            );

            resolve();
          } else {
            reject(new Error("Falha ao enviar imagem"));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Erro na requisição de upload"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (e) {
      toast.error("Erro ao enviar imagem");
      setFilesUpload((prev) =>
        prev.map((img) =>
          img.status === "uploading"
            ? { ...img, status: "idle", uploadProgress: 0, error: true }
            : img
        )
      );
    }
  }

  async function handleCloudUpload(images: FileUpload[]) {
    setFilesUpload((prev) =>
      prev.map((img) =>
        img.status === "idle"
          ? { ...img, status: "uploading", uploadProgress: 0, error: false }
          : img
      )
    );

    for (const img of images) {
      if (img.file) {
        try {
          await uploadSingleImage(img.file);
        } catch {
          return toast.error("Erro ao enviar imagem");
        }
      }
    }

    toast.success(`Imagens enviadas com sucesso!`);
  }

  async function removeOneCloudFile(key: string) {
    try {
      const fileToRemove = filesUpload.find((img) => img.key === key);

      if (!fileToRemove) {
        return;
      } else {
        if (fileToRemove.previewURL) {
          URL.revokeObjectURL(fileToRemove.previewURL);
        }
      }

      setFilesUpload((prev) =>
        prev.map((img) =>
          img.key === key ? { ...img, isDeleting: true } : img
        )
      );

      const deleteFileResponse = await fetch("/api/s3/delete/", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ key: fileToRemove.key }),
      });

      if (!deleteFileResponse.ok) {
        toast.error("Erro ao remover imagem da nuvem");

        setFilesUpload((prev) =>
          prev.map((img) =>
            img.key === key ? { ...img, isDeleting: false, error: true } : img
          )
        );

        return;
      }
      toast.success("Imagem apagada com sucesso");

      setFilesUpload((prev) => prev.filter((img) => img.key !== key));
    } catch {
      toast.error("Erro ao remover imagem da nuvem");
      setFilesUpload((prev) =>
        prev.map((img) =>
          img.key === key ? { ...img, isDeleting: false, error: true } : img
        )
      );
    }
  }

  // REMOVES ALL IMAGES FROM MEMORY AND KILLS THEIR OBJECT URLS
  async function removeAllCloudFiles() {
    const filesToRemove = filesUpload.map((file) => file?.key);

    for (const key of filesToRemove) {
      if (key) {
        await removeOneCloudFile(key);
      }
    }
  }

  return {
    isDragging,
    filesUpload,
    removeOneCloudFile,
    removeAllCloudFiles,
    setFilesUpload,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFilesFromInput,
    validateFilesType,
    hasDuplicateFiles,
    handleFileUpload,
    handleCloudUpload,
    formattedOrder,
    mapRemoteFiles,
  };
}
