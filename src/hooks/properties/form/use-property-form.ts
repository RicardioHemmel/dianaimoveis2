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
    // CLEAR PREVIOUS ERRORS STATE TO SET A NEW ONE
    form.clearErrors();

    // USE ZOD TO PARSE DATA
    const parsedData = schema.safeParse(data);

    // VALIDATES INPUTS AND SETS ERRORS MANUALLY
    if (parsedData.error) {
      parsedData.error.issues.forEach((issue) => {
        form.setError(issue.path.join(".") as Path<PropertyFormData>, {
          type: "manual",
          message: issue.message,
        });
      });
      console.log(parsedData.error);
      toast.error("Confira os campos pendentes");
      return null;
    } else {
      return parsedData.data;
    }
  }

  // ------------------------------------------------ SAVES PROPERTY AS PUBLISHED  --------------------------------------
  async function publish(data: PropertyFormData): Promise<void> {
    // VALIDATES DATA WITH ZOD
    const parsedData = parseForm(data, PropertySchema);
    if (!parsedData) return;

    console.log(parsedData);
  }

  // ------------------------------------------------ SAVES PROPERTY AS A DRAFT --------------------------------------
  async function saveDraft(): Promise<void> {
    // GETS FORM DATA
    const data = form.getValues();

    // VALIDATES DATA WITH ZOD
    const parsedData = parseForm(data, PropertyDraftSchema);
    if (!parsedData) return;

    // VERIFIES IF A PROPERTY ID EXISTS TO DECIDE WHETER TO CREATE A DRAFT OR UPDATE IT
    const propertyId = parsedData?._id;
    const method = propertyId ? "PATCH" : "POST";
    const url = propertyId
      ? `/api/properties/${propertyId}/draft`
      : `/api/properties/draft`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData),
    });

    let result;
    try {
      result = await response.json();
    } catch (error) {
      console.error("Erro ao fazer parse do JSON:", error);
      toast.error("Erro interno do servidor.");
      return;
    }

    if (!response.ok || !result.success) {
      // Log mais detalhado para ajudar no debug
      console.error("Erro retornado pela API:", result);

      // Tentar mostrar o erro específico do Zod se existir
      const errorMessage =
        result.errors?.title?._errors?.[0] ||
        result.message ||
        "Falha ao salvar rascunho";

      toast.error(`Erro: ${errorMessage}`);
      return; // Não dê throw new Error aqui se quiser que o toast apareça e a UI não quebre
    }

    // IF YOU JUST CREATED IT, REDIRECTS USER TO EDIT PAGE USING THE RETURNED ID FROM DRAFT CREATION
    if (!propertyId && result.draftProperty?._id) {
      router.replace(`/properties/${result.draftProperty._id}/edit`);
      toast.success("Rascunho Salvo");
      return;
    }

    // UPDATES THE FORM SILENTLY
    form.reset(result.draftProperty, {
      keepDirty: false,
      keepTouched: false,
    });

    toast.success("Rascunho Atualizado");
  }

  return {
    form,
    saveDraft,
    publish,
  };
}
