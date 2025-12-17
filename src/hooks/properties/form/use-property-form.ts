// REACT | NEXT
import { Path, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// FORM CONTROL
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PropertyBaseSchema,
  PropertyFormData,
  DefaultValuesPropertyForm,
} from "@/lib/schemas/property/zod/property-base.schema"; // BASE PROPERTY FORM SCHEMA
import { PropertySchema } from "@/lib/schemas/property/zod/property.schema"; // PROPERTY SCHEMA FOR PUBLISHING
import { PropertyDraftSchema } from "@/lib/schemas/property/zod/property-draft.schema"; // PROPERTY SCHEMA FOR SAVING AS DRAFT

// MESSAGE BOX
import { toast } from "sonner";

// FORM VALIDATION
import { z } from "zod";

export default function usePropertyForm(initialData?: PropertyFormData) {
  // REDIRECT USER TO EDIT PAGE AFTER SAVING PROPERTY
  const router = useRouter();

  // FORM MANAGER
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(PropertyBaseSchema),
    defaultValues: initialData ?? DefaultValuesPropertyForm,
  });

  //--------------------- AUXILIARY FUN ----------------------
  function parseForm<T>(data: PropertyFormData, schema: z.Schema<T>): T | null {
    // Clear previous errors state to set a new one
    form.clearErrors();

    // Use zod to parse data
    const parsedData = schema.safeParse(data);

    // Validates inputs and sets errors manually
    if (parsedData.error) {
      parsedData.error.issues.forEach((issue) => {
        form.setError(issue.path.join(".") as Path<PropertyFormData>, {
          type: "manual",
          message: issue.message,
        });
      });
      toast.error("Confira os campos pendentes");
      return null;
    } else {
      return parsedData.data;
    }
  }

  async function publish(data: PropertyFormData): Promise<void> {
    // Validates data with zod
    const parsedData = parseForm(data, PropertySchema);
    if (!parsedData) return;

    console.log(parsedData);
  }

  async function saveDraft(): Promise<void> {
    // Gets Form data
    const data = form.getValues();

    // Validates data with zod
    const parsedData = parseForm(data, PropertyDraftSchema);
    if (!parsedData) return;

    const propertyId = parsedData._id;

    const method = propertyId ? "PATCH" : "POST";
    const url = propertyId
      ? `/api/properties/${propertyId}`
      : `/api/properties/draft`;

    const response = await fetch(url, {
      method,
      body: JSON.stringify(parsedData),
    });

    const result = await response.json();

    if (!result.success) {
      console.error("Erro ao salvar draft:", result);
      throw new Error("Falha ao salvar rascunho");
    }

    //If you just created it, enter the ID in the URL
    if (!propertyId && result.draftProperty?._id) {
      router.replace(`/properties/${result.draftProperty._id}/edit`);
      return;
    }

    // Atualiza o form silenciosamente
    form.reset(result.draftProperty, {
      keepDirty: false,
      keepTouched: false,
    });
  }

  return {
    form,
    saveDraft,
    publish,
  };
}
