import { PropertyFormProvider } from "@/context/PropertyFormContext";
import PropertyForm from "./PropertyForm";
import {
  PropertyDetailsData,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";

type PropertyFormWrapperProps = {
  formMode: "create" | "edit";
  propertyDetails: PropertyDetailsData;
  initialData?: PropertyInputSchema;
};

export default function PropertyFormWrapper({
  formMode,
  initialData,
  propertyDetails,
}: PropertyFormWrapperProps) {
  return (
    <PropertyFormProvider
      propertyDetails={propertyDetails}
      initialData={initialData}
      formMode={formMode}
    >
      <PropertyForm />
    </PropertyFormProvider>
  );
}
