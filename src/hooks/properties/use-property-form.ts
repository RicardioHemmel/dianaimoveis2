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
import { useMemo } from "react";

export default function usePropertyForm(
  propertyTypes: PropertyDetail[],
  initialData?: PropertyInputSchema
) {
  // MEMORIZES DATA TO PREVENT RERENDER BRING BACK DATA THAT WERE ALREADY DELETED FROM THE FORM
  const memoizedDefaultValues = useMemo(
    () => ({
      ...DefaultValuesPropertyForm,
      propertyType: propertyTypes.find((t) => t.name === "Apartamento"),
      ...initialData,
    }),
    []
  );

  // FORM MANAGER
  const form = useForm<PropertyInputSchema>({
    resolver: zodResolver(propertyInputSchema),
    mode: "onSubmit",
    defaultValues: memoizedDefaultValues,
  });

  return {
    form,
  };
}
