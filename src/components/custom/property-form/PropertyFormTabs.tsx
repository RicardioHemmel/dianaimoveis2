"use client";

// REACT | NEXT
import { UseFormReturn } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

// COMPONENTS
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabBasicInfo from "@/components/custom/property-form/TabBasicInfo";
import TabLocation from "@/components/custom/property-form/TabLocation";
import TabDetails from "@/components/custom/property-form/TabDetails";
import TabSpecific from "@/components/custom/property-form/TabSpecific";
import TabAmenities from "@/components/custom/property-form/TabAmenities";
import TabCreative from "@/components/custom/property-form/TabCreative";

// ICONS
import {
  FileText,
  MapPin,
  Info,
  Building2,
  TreePalm,
  ImageUp,
} from "lucide-react";

// SCHEMAS
import {
  PropertyInputSchema,
  PropertyDetailsData,
} from "@/lib/schemas/property/property.schema";

interface PropertyFormTabsProps {
  form: UseFormReturn<PropertyInputSchema>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  propertyDetails?: PropertyDetailsData;
}

export default function PropertyFormTabs({
  form,
  activeTab,
  setActiveTab,
  propertyDetails,
}: PropertyFormTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      {/* TABS NAVIGATION */}
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        <TabsTrigger value="basic">
          <FileText className="w-4 h-4 mr-2" />
          Básico
        </TabsTrigger>
        <TabsTrigger value="location">
          <MapPin className="w-4 h-4 mr-2" />
          Localização
        </TabsTrigger>
        <TabsTrigger value="details">
          <Info className="w-4 h-4 mr-2" />
          Detalhes
        </TabsTrigger>
        <TabsTrigger value="specific">
          <Building2 className="w-4 h-4 mr-2" />
          Específico
        </TabsTrigger>
        <TabsTrigger value="amenities">
          <TreePalm className="w-4 h-4 mr-2" />
          Comodidades
        </TabsTrigger>
        <TabsTrigger value="creative">
          <ImageUp className="w-4 h-4 mr-2" />
          Criativo
        </TabsTrigger>
      </TabsList>

      {/* ----------------------------- FORM TABS -------------------------------- */}
      <TabBasicInfo
        form={form}
        propertyTypes={propertyDetails?.types}
        propertyPurposes={propertyDetails?.purposes}
        propertyStatus={propertyDetails?.status}
      />
      <TabLocation form={form} />
      <TabDetails form={form} />
      <TabSpecific
        form={form}
        propertyStandings={propertyDetails?.standings}
        propertyTypologies={propertyDetails?.typologies}
      />
      <TabAmenities form={form} amenitiesList={propertyDetails?.amenities} />
      <TabCreative form={form} />
    </Tabs>
  );
}
