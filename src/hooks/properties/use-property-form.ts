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
import createProperty from "@/lib/server-actions/properties/create-property";

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

  const handleCreateProperty = async (data: PropertyInputSchema) => {
    const result = await createProperty(data);

    if (result.success) {
      toast.success(result.message);
      return;
    }

    if (result.message) {
      toast.error(result.message);
    }

    if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, messages]) => {
        if (!messages?.length) return;

        form.setError(field as keyof PropertyInputSchema, {
          type: "server",
          message: messages[0],
        });
      });
    }
  };

  return {
    form,
    handleCreateProperty,
  };
}
