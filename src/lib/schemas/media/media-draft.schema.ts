export interface MediaDraft {
  tempId: number; // Unique identifier for drag n drop
  file: File; // Original file object
  preview: string; // Local preview URL
  order: number; // Order in the gallery
  uploadProgress?: number; // Upload progress percentage (0-100)
  status: "local" | "authorizing" | "uploading" | "success" | "error"; // Upload status
  mediaId?: string; // Exists after backend creates it
}
