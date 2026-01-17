import { createContext, ReactNode, useContext } from "react";
import useFileUpload from "@/hooks/use-file-upload";

interface FileUploadContextProps {
  fileUploadHook: ReturnType<typeof useFileUpload>;
  uploaderId: "gallery" | "floorPlanGallery";
}

export const FileUploadContext = createContext<FileUploadContextProps | null>(
  null
);

interface ProviderProps extends FileUploadContextProps {
  children: ReactNode;
}

export function FileUploadProvider({
  children,
  fileUploadHook,
  uploaderId,
}: ProviderProps) {
  const value = {
    fileUploadHook,
    uploaderId,
  };
  return (
    <FileUploadContext.Provider value={value}>
      {children}
    </FileUploadContext.Provider>
  );
}

// VERIFIES IF THE CONTEXT VALUES IS INSIDE A PROVIDER WICH PROVIDE THE VALUES
export function useFileUploadContext() {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error(
      "useFileUploadContext deve ser usado dentro de um FileUploadProvider"
    );
  }

  return context;
}
