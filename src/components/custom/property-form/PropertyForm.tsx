"use client";

// REACT | NEXT
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FieldErrors } from "react-hook-form";
import Link from "next/link";

// COMPONENTS
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropertyFormTabs from "@/components/custom/property-form/PropertyFormTabs";
import { Badge } from "@/components/ui/badge";

// SCHEMA
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";

// ZOD ERROR MESSAGES TREATMENT TO PT-BR
import { extractFieldLabels } from "@/lib/errors/property-form-error-mapper";

// SERVER ACTION
import { createPropertyAction } from "@/lib/server-actions/properties/create-property.action";
import { updatePropertyAction } from "@/lib/server-actions/properties/update-property.action";

import { toast } from "sonner";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

// ICONS
import { Eye } from "lucide-react";

// UI CONFIG
import { formModeConfig } from "@/components/custom/property-form/form-ui-config";

export default function PropertyForm() {
  useEffect(() => console.log("RENDER PROPERTY FORM"), []);
  useEffect(() => {
    return () => {
      console.log("UNMOUNT PROPERTY FORM");
    };
  }, []);

  const {
    form,
    status,
    setStatus,
    galleryUploadHook,
    floorPlanGalleryUploadHook,
    nextTab,
    prevTab,
    isFirstTab,
    isLastTab,
    formMode,
  } = usePropertyFormContext(); // CONTEXT

  const mode = formModeConfig[formMode];

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const title = form.watch("title");
  const propertyId = form.watch("_id");

  async function onSubmit(data: PropertyInputSchema) {
    if (
      formMode === "edit" &&
      galleryUploadHook.filesUpload.length === 0 &&
      data.gallery?.length > 0
    ) {
      toast.error("Aguarde o carregamento das imagens...");
      return;
    }

    if (
      formMode === "edit" &&
      floorPlanGalleryUploadHook.filesUpload.length === 0 &&
      data.gallery?.length > 0
    ) {
      toast.error("Aguarde o carregamento das imagens...");
      return;
    }
    startTransition(async () => {
      const finalGallery = (await galleryUploadHook.handleCloudUpload(
        galleryUploadHook.filesUpload
      )) as { key: string; order: number }[];

      const finalFloorPlanGallery =
        (await floorPlanGalleryUploadHook.handleCloudUpload(
          floorPlanGalleryUploadHook.filesUpload
        )) as { key: string; order: number; label: string }[];
      const payload = {
        ...data,
        gallery: finalGallery,
        floorPlanGallery: finalFloorPlanGallery,
        status: status,
      };

      let result;

      if (data._id) {
        result = await updatePropertyAction(data._id, payload);

        if (!result.success) {
          toast.error(result.message ?? "Erro ao atualizar imóvel");
          return;
        }

        toast.success("Imóvel atualizado com sucesso");
      } else {
        result = await createPropertyAction(payload);

        if (!result.success) {
          toast.error(result.message ?? "Erro ao criar imóvel");
          return;
        }

        router.push(`/properties/${result?.data?.id}/edit`);
        toast.success("Imóvel cadastrado com sucesso");
      }
    });
  }

  const onError = (errors: FieldErrors<PropertyInputSchema>) => {
    const fields = extractFieldLabels(errors);
    if (fields.length > 0) {
      toast.error(`Verifique: ${fields.join(", ")}`);
    }
  };

  // BUTTON TEXTS
  const actionText = formMode === "edit" ? "Salvar" : "Cadastrar";
  const loadingText = formMode === "edit" ? "Salvando..." : "Cadastrando...";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="px-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={`${mode.badgeClass} px-3 py-1`}
              >
                <mode.Icon className="h-3 w-3 mr-1.5" />
                {mode.badgeText}
              </Badge>
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {title || mode.defaultTitle}
            </h2>
            <p className="text-muted-foreground">
              Editando informações do imóvel
            </p>
          </div>
        </div>

        {/* GO SEE PROPERTY ON PREVIEW PAGE */}
        <div className="flex gap-3">
          {propertyId && (
            <Button type="button" asChild variant="outline">
              <Link href={`/preview/${propertyId}`} target="_blank">
                <Eye className="size-4" />
                Ver imóvel
              </Link>
            </Button>
          )}

          {/* NAVIGATION TABS */}
          <Button
            type="button"
            variant="outline"
            onClick={prevTab}
            disabled={isFirstTab}
          >
            Anterior
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={nextTab}
            disabled={isLastTab}
          >
            Próximo
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <Card className="p-6 shadow-card bg-white border-2 border-neutral-100">
            {/* ALL TABS CONTAINING PARTS OF THE FORM */}
            <PropertyFormTabs />

            {/* SAVES PROPERTY AS A DRAFT */}
            <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
              <Button
                type="submit"
                variant="outline"
                disabled={isPending}
                onClick={() => setStatus("DRAFT")}
              >
                Salvar rascunho
              </Button>

              {/* SAVES PROPERTY AS A PUBLISHED PROPERTY */}
              <Button
                className="bg-[image:var(--gradient-primary)] hover:brightness-90"
                type="submit"
                disabled={isPending}
                onClick={() => setStatus("PUBLISHED")}
              >
                {isPending ? loadingText : `${actionText} imóvel`}
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
