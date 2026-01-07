// REACT | NEXT
import { useForm } from "react-hook-form";

// FORM CONTROL
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertyInputSchema,
  PropertyInputSchema,
  DefaultValuesPropertyForm,
  PropertyDetail,
} from "@/lib/schemas/property/property.schema";

// MESSAGE BOX
import { toast } from "sonner";

export default function usePropertyForm(
  propertyTypes: PropertyDetail[],
  initialData?: PropertyInputSchema
) {
  const defaultPropertyType = propertyTypes.find(
    (type) => type.name === "Apartamento"
  );

  // FORM MANAGER
  const form = useForm<PropertyInputSchema>({
    resolver: zodResolver(propertyInputSchema),
    mode: "onSubmit",
    defaultValues: {
      ...DefaultValuesPropertyForm,
      propertyType: defaultPropertyType,
      ...initialData,
    },
  });


  return {
    form,
  };
}
