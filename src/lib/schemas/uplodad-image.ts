export interface LocalImage {
  id: number; // Unique identifier for drag n drop
  file: File; // Original file object
  preview: string; // Local preview URL
  order: number; // Order in the gallery
  uploadProgress?: number; // Upload progress percentage (0-100)
  status: "editing" | "uploading" | "success" | "error"; // Upload status
}

export interface UploadedImage {
  imageRef: string;
  order: number;
}
