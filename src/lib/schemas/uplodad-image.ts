export interface UploadedImage {
  id: number; // Unique identifier for drag n drop
  file: File; // Original file object
  preview: string; // Local preview URL
  order: number; // Order in the gallery
  uploadProgress?: number; // Upload progress percentage (0-100)
  status: "local" | "uploading" | "success" | "error"; // Upload status
}
