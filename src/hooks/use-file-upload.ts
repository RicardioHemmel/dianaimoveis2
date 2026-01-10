import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FileUpload } from "@/lib/schemas/media/file.schema";
import { GalleryItemSchema } from "@/lib/schemas/property/property.schema";

export default function useFileUpload() {
  // FOR ONDRAGENTER AND ONDRAGLEAVE CONTROL
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [filesUpload, setFilesUpload] = useState<FileUpload[]>([]);
  const countRef = useRef(0); // TO PREVENT FLICKERING WHEN DRAGGING OVER CHILD ELEMENTS

  const prevFilesRef = useRef<FileUpload[]>([]);

  // MEMORY MANAGEMENT (BLOBS)
  useEffect(() => {
    const prev = prevFilesRef.current; // KEEPS DATA BETWEEN RENDERS

    // CLEANUP OF REMOVED ITEMS
    prev.forEach((prevImg) => {
      const stillExists = filesUpload.some((img) => img.id === prevImg.id);
      if (!stillExists && prevImg.previewURL?.startsWith("blob")) {
        URL.revokeObjectURL(prevImg.previewURL);
      }
    });

    prevFilesRef.current = filesUpload;
  }, [filesUpload]);

  // TOTAL CLEANING WHEN UNMOUNTING THE HOOK (WHEN LEAVING THE FORM)
  useEffect(() => {
    return () => {
      prevFilesRef.current.forEach((img) => {
        if (img.previewURL?.startsWith("blob")) {
          URL.revokeObjectURL(img.previewURL);
        }
      });
    };
  }, []);

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
  function handleFilesDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();

    // RESET DRAG COUNTER
    countRef.current = 0;
    setIsDragging(false);

    // VERIFIES IF FILES WERE DROPPED
    const files = Array.from(e.dataTransfer.files);
    if (files.length) handleLocalFilesUpload(files);
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

  // ---------------------------------------------------- LOCAL ACTIONS -------------------------------------------------- //

  // CALLS THE UPLOAD HANDLER WHEN FILES ARE SELECTED FROM THE INPUT
  function handleFilesFromInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const files = Array.from(e.target.files || []);
    if (files.length) handleLocalFilesUpload(files);

    // CLEANS FILE PATH IN MEMORY SO IT'S POSSIBLE TO RESENT THE SAME IMAGE AFTER REMOVING IT
    e.target.value = "";
  }

  // MAPS IMAGES TO SHOW ON EDIT PROPERTY MODE
  function mapRemoteFilesToFileUpload(images: GalleryItemSchema[]) {
    const fileUploadFromDB = images.map((image, i) => ({
      id: window.crypto.randomUUID(),
      key: image.key,
      previewURL: image.url,
      order: image.order ?? formattedOrder(i),
      status: "success" as const,
    }));

    setFilesUpload(fileUploadFromDB);
  }

  async function handleLocalFilesUpload(files: File[]): Promise<void> {
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
        order: filesUpload.length + formattedOrder(i), // POSITION ON ARRAY
        uploadProgress: 0, // UPLOAD PROGRESS FOR USER FEEDBACK
        status: "idle",
      };
    });

    // ADDS NEW IMAGES TO THE PREVIOUS LIST
    setFilesUpload((prev) => [...prev, ...mappedImages]);
  }

  function removeLocalFile(id: string): void {
    setFilesUpload((prev) => {
      // IMAGE TO BE REMOVED
      const targetImage = prev.find((image) => image.id === id);

      // KILLS ANY REFERENCE TO TEMPORARY IMAGE URL
      if (targetImage) {
        URL.revokeObjectURL(targetImage.previewURL ?? "");
      }

      const filteredImages = prev.filter((img) => img.id !== targetImage?.id);

      // RETURN ALL IMAGES WITH THEIR NEW ORDER
      return filteredImages.map((img, i) => ({
        ...img,
        order: formattedOrder(i),
      }));
    });
  }

  function removeAllLocalFiles() {
    setFilesUpload((prev) => {
      const localFiles = prev.filter((file) => file.status === "idle");

      localFiles.forEach((file) => {
        URL.revokeObjectURL(file.previewURL ?? "");
      });

      const remainingFiles = prev.filter((file) => file.status !== "idle");

      return remainingFiles.map((img, i) => ({
        ...img,
        order: formattedOrder(i),
      }));
    });
  }

  // ---------------------------------------------------- CLOUD ACTIONS -------------------------------------------------- //

  //--------- SENDS ONE IMAGE TO CLOUD WITH UPLOAD PROGRESS ---------
  async function uploadSingleImage(file: File): Promise<string | null> {
    try {
      // TRY TO GET THE PRESIGNED_URL FROM CLOUD
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

      // SETS ERROR STATE ON THE IMAGE IF COULDNT GET THE PRESIGNED_URL
      if (!presignedUrlResponse.ok) {
        toast.error("Erro ao obter URL de upload");
        setFilesUpload((prev) =>
          prev.map((img) =>
            img.file === file ? { ...img, uploadProgress: 0, error: true } : img
          )
        );
        return null;
      }

      // GETS THE PRESIGNED URL AND THE KEY
      const { presignedUrl, key } = await presignedUrlResponse.json();

      // START THE FILE UPLOAD TRACKING PROGRESS
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
          // SETS PROGRESS AS IT GOES
          if (event.lengthComputable) {
            const porcentageCompleted = (event.loaded / event.total) * 100;
            setFilesUpload((prev) =>
              prev.map((img) =>
                img.file === file
                  ? {
                      ...img,
                      status: "uploading",
                      uploadProgress: Math.round(porcentageCompleted),
                      key: key,
                    }
                  : img
              )
            );
          }
        };
        // IF SUCCESSED SETS IMAGES AS SUCCESS STATE
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

      return key;
    } catch (e) {
      toast.error("Erro ao enviar imagem");
      // ON ERROR SETS IMAGE TO "IDLE" STATE
      setFilesUpload((prev) =>
        prev.map((img) =>
          img.status === "uploading"
            ? { ...img, status: "idle", uploadProgress: 0, error: true }
            : img
        )
      );

      return null;
    }
  }

  // ------------- UPLOADS TO CLOUD ALL "IDLE" IMAGES ---------------
  async function handleCloudUpload(currentFiles: FileUpload[]) {
    const uploadedFiles: { key: string; order: number }[] = [];

    for (const img of currentFiles) {
      // IF THE IMG WAS ALREADY SAVED ON CLOUD GETS IT'S DATA
      if (img.status === "success" && img.key) {
        uploadedFiles.push({ key: img.key, order: img.order });
        continue;
      }

      // UPLOAD IMAGE
      if (img.status === "idle" && img.file) {
        try {
          const key = await uploadSingleImage(img.file);

          if (key) {
            uploadedFiles.push({ key, order: img.order });
          }
        } catch {
          toast.error("Erro ao enviar imagem");
        }
      }
    }

    return uploadedFiles;
  }

  //---------------- REMOVE ONE CLOUD FILE AND UPDATES FORM ----------------------
  async function removeCloudFile(key: string) {
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
          img.key === key ? { ...img, status: "deleting" } : img
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
            img.key === key ? { ...img, status: "success", error: true } : img
          )
        );

        return;
      }

      // SETS THE NEW ORDER TO THE IMAGES
      setFilesUpload((prev) =>
        prev
          .filter((img) => img.key !== key)
          .map((img, i) => ({
            ...img,
            order: formattedOrder(i),
          }))
      );
    } catch {
      toast.error("Erro ao remover imagem da nuvem");
      setFilesUpload((prev) =>
        prev.map((img) =>
          img.key === key ? { ...img, status: "success", error: true } : img
        )
      );
    }
  }

  //------- REMOVE LOCAL AND CLOUD IMAGES --------
  function removeAllFiles() {
    removeAllLocalFiles();
    removeAllCloudFiles();
  }

  //------- REMOVES ALL IMAGES FROM MEMORY AND KILLS THEIR OBJECT URLS --------
  async function removeAllCloudFiles() {
    const filesToRemove = filesUpload.map((file) => file?.key);

    for (const key of filesToRemove) {
      if (key) {
        await removeCloudFile(key);
      }
    }
  }

  return {
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
    validateFilesType,
    hasDuplicateFiles,
    handleCloudUpload,
    formattedOrder,
    mapRemoteFilesToFileUpload,
  };
}
