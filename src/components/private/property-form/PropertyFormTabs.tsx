// REACT | NEXT
import { UseFormReturn } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

// COMPONENTS
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabBasicInfo from "@/components/private/property-form/TabBasicInfo";
import TabLocation from "@/components/private/property-form/TabLocation";
import TabDetails from "@/components/private/property-form/TabDetails";
import TabSpecific from "@/components/private/property-form/TabSpecific";
import TabAmenities from "@/components/private/property-form/TabAmenities";
import TabCreative from "@/components/private/property-form/TabCreative";

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
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";
import { PropertyFormData } from "@/lib/schemas/property/zod/property-base.schema";

interface PropertyFormTabsProps {
  form: UseFormReturn<PropertyFormData>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  amenitiesList?: PropertySelectOption[];
  propertyPurposes?: PropertySelectOption[];
  propertyStatus?: PropertySelectOption[];
  propertyStandings?: PropertySelectOption[];
  propertyTypologies?: PropertySelectOption[];
}

export default function PropertyFormTabs({
  form,
  activeTab,
  setActiveTab,
  amenitiesList,
  propertyPurposes,
  propertyStatus,
  propertyStandings,
  propertyTypologies,
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
        propertyPurposes={propertyPurposes}
        propertyStatus={propertyStatus}
      />
      <TabLocation form={form} />
      <TabDetails form={form} />
      <TabSpecific
        form={form}
        propertyStandings={propertyStandings}
        propertyTypologies={propertyTypologies}
      />
      <TabAmenities form={form} amenitiesList={amenitiesList} />
      <TabCreative form={form} />
    </Tabs>
  );
}
