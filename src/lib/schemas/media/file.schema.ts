import z from "zod";

export interface FileUpload {
  id: string; // Unique identifier for drag n drop
  file?: File; // Original file object
  previewURL?: string; // Local preview URL
  order: number; // Order in the gallery
  uploadProgress?: number; // Upload progress percentage (0-100)
  status: "idle" | "uploading" | "deleting" | "success" | "error"; // Upload status
  key?: string; //Tthe key returned by the cloud storage
  label?: string; // Lable for floor plan gallery display
  error?: boolean; // Flag to indicate if there was an error during upload
}

// SCHEMA FOR CLOUD UPLOAD
export const uploadRequestSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
});
