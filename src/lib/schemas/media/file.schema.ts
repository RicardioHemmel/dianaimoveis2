import z from "zod";

export interface FileUpload {
  id: string; // Unique identifier for drag n drop
  file?: File; // Original file object
  previewURL?: string; // Local preview URL
  order: number; // Order in the gallery
  uploadProgress?: number; // Upload progress percentage (0-100)
  status: "idle" | "uploading" | "deleting" | "success" | "error"; // Upload status
  source?: "propertyGallery" | "floorPlanGallery"; // Source of the image
  key?: string; // the key returned by the cloud storage
  error?: boolean; // Flag to indicate if there was an error during upload
}

export const uploadRequestSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
});
