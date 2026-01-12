"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  PropertyDetailsData,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";
import { UseFormReturn } from "react-hook-form";
import useFileUpload from "@/hooks/use-file-upload";
import usePropertyForm from "@/hooks/properties/use-property-form";
import { updatePropertyImageAction } from "@/lib/server-actions/properties/update-property-image.action";
import { toast } from "sonner";

// TABS LIST FOR NAVIGATION
const TABS = [
  "basic",
  "location",
  "details",
  "specific",
  "amenities",
  "creative",
];

// DEFINE THE FORMAT OF THE CONTEXT
interface PropertyFormContextType {
  // DATA
  form: UseFormReturn<PropertyInputSchema>;
  initialData?: PropertyInputSchema;
  status: "DRAFT" | "PUBLISHED";
  setStatus: (status: "DRAFT" | "PUBLISHED") => void;
  fileUploadHook: ReturnType<typeof useFileUpload>;
  propertyDetails?: PropertyDetailsData;
  handleClearGallery: () => Promise<void>;
  handleRemoveSingleImage: (key: string) => Promise<void>;

  //NAVIGATION
  activeTab: string;
  setActiveTab: (tab: string) => void;
  nextTab: () => void;
  prevTab: () => void;
  isFirstTab: boolean;
  isLastTab: boolean;
}

const PropertyFormContext = createContext<PropertyFormContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
  propertyDetails?: PropertyDetailsData;
  initialData?: PropertyInputSchema;
}

export function PropertyFormProvider({
  children,
  propertyDetails,
  initialData,
}: ProviderProps) {
  // FILES UPLOAD
  const fileUploadHook = useFileUpload();

  // PROPERTY FORM
  const { form } = usePropertyForm(propertyDetails?.types ?? [], initialData);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT"); // SET BY TWO BUTTONS ON "PROPERTY FORM"

  // MAPS IMAGES FROM DB INTO FILESUPLOAD STATE FOR EXHIBITION AND ALLOW USER TO CHANGER POSITION
  useEffect(() => {
    if (
      initialData?.propertyGallery &&
      initialData.propertyGallery.length > 0
    ) {
      fileUploadHook.mapRemoteFilesToFileUpload(initialData.propertyGallery);
    }
  }, [initialData]);

  // PROPERTY ID TO UPDATE PROPERTY WITH GALLERY FUNCTIONS
  const propertyId = form.watch("_id");

  // --- CONTEXT FUNCTION TO CLEAN GALLERY AND UPDATE PROPERTY ---
  async function handleClearGallery(): Promise<void> {
    try {
      // REMOVE LOCAL AND CLOUD FILES
      fileUploadHook.removeAllFiles();

      // IF PROPERTY EXISTS, UPDATES IT
      if (propertyId) {
        await updatePropertyImageAction(propertyId, []);
      }

      // SYNC THE FORM LOCALLY
      form.setValue("propertyGallery", []);

      toast.success("Galeria removida com sucesso");
    } catch (error) {
      console.error("Erro ao limpar galeria:", error);
      toast.error("Ocorreu um erro ao tentar remover as imagens.");
    }
  }

  // --- CONTEXT FUNCTION TO DELETE ONE IMAGE AND UPDATE PROPERTY ---
  async function handleRemoveSingleImage(key: string): Promise<void> {
    if (!key) return;

    try {
      // REMOVE CLOUD FILE
      await fileUploadHook.removeCloudFile(key);

      // CALCULATES THE NEW GALLERY ORDER
      const updatedGallery = fileUploadHook.filesUpload
        .filter((img) => img.key !== key)
        .map((img, i) => ({
          key: img.key as string,
          order: fileUploadHook.formattedOrder(i),
        }));

      // UPDATES PROPERTY
      if (propertyId) {
        await updatePropertyImageAction(propertyId, updatedGallery);
      }

      // SYNC FORM WITH THE NEW GALLERY
      form.setValue("propertyGallery", updatedGallery);

      toast.success("Imagem removida");
    } catch (error) {
      console.error("Falha ao remover imagem:", error);
      toast.error("Erro ao sincronizar exclusão com o servidor");
    }
  }

  // TABS NAVIGATION MANAGEMENT
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const currentIndex = TABS.indexOf(activeTab);
  const nextTab = () => {
    if (currentIndex < TABS.length - 1) setActiveTab(TABS[currentIndex + 1]);
  };
  const prevTab = () => {
    if (currentIndex > 0) setActiveTab(TABS[currentIndex - 1]);
  };

  // BRING EVERYTHING TOGETHER IN ONE OBJECT
  const value = {
    form,
    initialData,
    handleClearGallery,
    handleRemoveSingleImage,
    status,
    setStatus,
    fileUploadHook,
    propertyDetails,
    activeTab,
    setActiveTab,
    nextTab,
    prevTab,
    isFirstTab: currentIndex === 0,
    isLastTab: currentIndex === TABS.length - 1,
  };

  return (
    <PropertyFormContext.Provider value={value}>
      {children}
    </PropertyFormContext.Provider>
  );
}

export function usePropertyFormContext() {
  const context = useContext(PropertyFormContext);
  if (!context) {
    throw new Error(
      "usePropertyFormContext deve ser usado dentro de um PropertyFormProvider"
    );
  }
  return context;
}
