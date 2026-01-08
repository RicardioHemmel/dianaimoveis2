"use client";

// REACT | NEXT
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FieldErrors } from "react-hook-form";

// COMPONENTS
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropertyFormTabs from "@/components/custom/property-form/PropertyFormTabs";
import { Badge } from "@/components/ui/badge";

// SCHEMA
import {
  PropertyInputSchema,
  extractFieldLabels,
} from "@/lib/schemas/property/property.schema";

// SERVER ACTION
import { createPropertyAction } from "@/lib/server-actions/properties/create-property.action";
import { updatePropertyAction } from "@/lib/server-actions/properties/update-property.action";

import { toast } from "sonner";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

// ICONS
import { Pencil, Plus } from "lucide-react";

// DEFINES WHETHER THE FORM IS TO CREATE OR UPDATE
type PropertyFormProps = {
  mode: "create" | "edit";
};

export default function PropertyForm({ mode }: PropertyFormProps) {
  // CONTEXT
  const { form, initialData, status, setStatus } = usePropertyFormContext();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // PROPERTY FORM CONTEXT
  const { fileUploadHook, nextTab, prevTab, isFirstTab, isLastTab } =
    usePropertyFormContext();

  async function onSubmit(data: PropertyInputSchema) {
    startTransition(async () => {
      const uploadedImages = await fileUploadHook.handleCloudUpload(
        fileUploadHook.filesUpload
      );
      form.setValue("propertyGallery", uploadedImages);

      const payload = {
        ...data,
        status: status,
      };

      let result;

      if (data._id) {
        result = await updatePropertyAction(data._id, payload);

        if (!result.success) {
          toast.error(result.message ?? "Erro ao atualizar imóvel");
          return;
        }

        form.reset(result.data);
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="px-4">
          {mode === "create" ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 px-3 py-1"
                >
                  <Plus className="h-3 w-3 mr-1.5" />
                  Modo Criação
                </Badge>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Cadastrar imóvel
              </h2>
              <p className="text-muted-foreground">
                Editando informações do imóvel
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 text-amber-600 border-amber-500/30 px-3 py-1"
                >
                  <Pencil className="h-3 w-3 mr-1.5" />
                  Modo Edição
                </Badge>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                {initialData?.title}
              </h2>
              <p className="text-muted-foreground">
                Editando informações do imóvel
              </p>
            </div>
          )}
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={prevTab} disabled={isFirstTab}>
            Anterior
          </Button>

          <Button variant="outline" onClick={nextTab} disabled={isLastTab}>
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
                {mode === "edit" ? "Salvar imóvel" : "Cadastrar imóvel"}
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
