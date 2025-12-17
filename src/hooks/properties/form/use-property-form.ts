// React | Next
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// Form control
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PropertySchema,
  PropertyFormData,
  DefaultValuesPropertyForm,
} from "@/lib/schemas/property/property.schema";

export default function usePropertyForm(initialData?: PropertyFormData) {
  const router = useRouter();

  // Form manager
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
    defaultValues: initialData ?? DefaultValuesPropertyForm,
  });

  async function publish(data: PropertyFormData) {
    console.log(data);
  }

  async function saveDraft() {
    const data = form.getValues();
    const propertyId = data._id;

    const method = propertyId ? "PATCH" : "POST";
    const url = propertyId
      ? `/api/properties/${propertyId}`
      : `/api/properties/draft`;

    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
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
