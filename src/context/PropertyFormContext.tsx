"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import {
  PropertyDetailsData,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";
import { UseFormReturn } from "react-hook-form";
import useFileUpload from "@/hooks/use-file-upload";
import usePropertyForm from "@/hooks/properties/use-property-form";

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
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

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
