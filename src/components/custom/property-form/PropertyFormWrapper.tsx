import { PropertyFormProvider } from "@/context/PropertyFormContext";
import PropertyForm from "./PropertyForm";
import {
  PropertyDetailsData,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";

type PropertyFormWrapperProps = {
  mode: "create" | "edit";
  initialData?: PropertyInputSchema;
  propertyDetails: PropertyDetailsData;
};

export default function PropertyFormWrapper({
  mode,
  initialData,
  propertyDetails,
}: PropertyFormWrapperProps) {
  return (
    <PropertyFormProvider propertyDetails={propertyDetails} initialData={initialData}>
      <PropertyForm mode={mode}/>
    </PropertyFormProvider>
  );
}
