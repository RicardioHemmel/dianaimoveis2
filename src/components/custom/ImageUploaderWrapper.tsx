import { FileUploadProvider } from "@/context/FileUploadContext";
import { LucideIcon } from "lucide-react";
import useFileUpload from "@/hooks/use-file-upload";
import { ImageUploader } from "@/components/custom/ImageUploader";

interface ImageUploaderWrapperProps {
  fileUploadHook: ReturnType<typeof useFileUpload>;
  uploaderId: "gallery" | "floorPlanGallery";
  Icon: LucideIcon;
}

export function ImageUploaderWrapper({
  fileUploadHook,
  Icon,
  uploaderId,
}: ImageUploaderWrapperProps) {
  return (
    <FileUploadProvider fileUploadHook={fileUploadHook} uploaderId={uploaderId}>
      <ImageUploader Icon={Icon} />
    </FileUploadProvider>
  );
}
