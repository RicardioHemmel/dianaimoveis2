import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertyInputSchema,
  PropertyInputSchema,
  DefaultValuesPropertyForm,
  PropertyDetailSchema,
} from "@/lib/schemas/property/property.schema";

export default function usePropertyForm(
  propertyTypes: PropertyDetailSchema[],
  initialData?: PropertyInputSchema,
) {
  const form = useForm<PropertyInputSchema>({
    resolver: zodResolver(propertyInputSchema),
    mode: "onSubmit",
    defaultValues: {
      ...DefaultValuesPropertyForm,
      propertyType: propertyTypes.find((t) => t.name === "Apartamento") ?? null,
      ...initialData,
    },
  });

  useEffect(() => {
    const currentId = form.getValues("_id");

    if (initialData && initialData._id !== currentId) {
      form.reset({
        ...DefaultValuesPropertyForm,
        ...initialData,
        propertyType:
          initialData.propertyType ??
          propertyTypes.find((t) => t.name === "Apartamento") ??
          null,
      });
    }
  }, [initialData?._id, propertyTypes, form]);

  return {
    form,
  };
}
