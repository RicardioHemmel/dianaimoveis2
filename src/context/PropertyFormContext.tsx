"use client";

// REACT | NEXT
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

// SCHEMAS
import {
  PropertyDetailsData,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";

// HOOKS
import useFileUpload from "@/hooks/use-file-upload";
import usePropertyForm from "@/hooks/properties/use-property-form";

// SERVER ACTION
import { updatePropertyImageAction } from "@/lib/server-actions/properties/update-property-image.action";

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
  formMode: "create" | "edit";
  initialData?: PropertyInputSchema;
  status: "DRAFT" | "PUBLISHED";
  setStatus: (status: "DRAFT" | "PUBLISHED") => void;
  galleryUploadHook: ReturnType<typeof useFileUpload>;
  floorPlanGalleryUploadHook: ReturnType<typeof useFileUpload>;
  propertyDetails?: PropertyDetailsData;

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
  formMode: "create" | "edit";
}

export function PropertyFormProvider({
  children,
  propertyDetails,
  initialData,
  formMode,
}: ProviderProps) {
  // FILES UPLOAD
  const galleryUploadHook = useFileUpload("gallery");
  const floorPlanGalleryUploadHook = useFileUpload("floorPlanGallery");

  // PROPERTY FORM
  const { form } = usePropertyForm(propertyDetails?.types ?? [], initialData);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT"); // SET BY TWO BUTTONS ON "PROPERTY FORM"

  // MAPS IMAGES FROM DB INTO FILESUPLOAD STATE FOR EXHIBITION AND ALLOW USER TO CHANGER POSITION
  useEffect(() => {
    if (initialData?.gallery && initialData.gallery.length > 0) {
      galleryUploadHook.mapRemoteFilesToFileUpload(initialData.gallery);
    }

    if (
      initialData?.floorPlanGallery &&
      initialData.floorPlanGallery.length > 0
    ) {
      floorPlanGalleryUploadHook.mapRemoteFilesToFileUpload(
        initialData.floorPlanGallery
      );
    }
  }, [initialData]);

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
    formMode,
    initialData,
    propertyDetails,
    status,
    setStatus,
    galleryUploadHook,
    floorPlanGalleryUploadHook,
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
