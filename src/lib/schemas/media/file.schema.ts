export interface FileUpload {
  id: string; // Unique identifier for drag n drop
  file?: File; // Original file object
  previewURL: string; // Local preview URL
  order: number; // Order in the gallery
  uploadProgress?: number; // Upload progress percentage (0-100)
  status: "idle" | "uploading" | "success" | "error"; // Upload status
  key?: string; // the key returned by the cloud storage
  error?: boolean; // Flag to indicate if there was an error during upload
  isDeleting?: boolean; // Flag to indicate if the image is being deleted
}
