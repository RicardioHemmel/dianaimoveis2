"use client";

// REACT | NEXT
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FieldErrors, useWatch } from "react-hook-form";
import Link from "next/link";

// COMPONENTS
import PropertyFormTabs from "@/components/custom/property-form/PropertyFormTabs";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeletePropertyDropdownItem } from "@/components/custom/DeletePropertyDropdownItem";

// SCHEMA
import {
  PropertyInputSchema,
  PropertyViewSchema,
} from "@/lib/schemas/property/property.schema";

// ZOD ERROR MESSAGES TREATMENT TO PT-BR
import { extractFieldLabels } from "@/lib/errors/property-form-error-mapper";

// SERVER ACTION
import { createPropertyAction } from "@/lib/server-actions/properties/create-property.action";
import { updatePropertyAction } from "@/lib/server-actions/properties/update-property.action";

import { toast } from "sonner";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

// ICONS
import { Eye, MoreVertical, Star } from "lucide-react";

// UI CONFIG
import { formModeConfig } from "@/components/custom/property-form/form-ui-config";
import { getCoordinates } from "@/lib/services/maps/maps.service";

// FORMATTER
import { statusFormatter } from "@/lib/formatters/ui-formatters/status-badge";

export default function PropertyForm() {
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
    initialData,
  } = usePropertyFormContext(); // CONTEXT

  const mode = formModeConfig[formMode];

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const title = form.watch("title");
  const propertyId = useWatch({
    control: form.control,
    name: "_id",
  });
  const isFeatured = useWatch({
    control: form.control,
    name: "isFeatured",
  });

  const badgeStatus = useWatch({
    control: form.control,
    name: "status",
  });

  const formattedStatus = useMemo(() => {
    return statusFormatter(badgeStatus);
  }, [badgeStatus]);

  // FORM SUBMIT FUNCTION
  async function onSubmit(data: PropertyInputSchema) {
    const isGalleryLoading =
      formMode === "edit" &&
      initialData?.gallery?.length! > 0 &&
      galleryUploadHook.filesUpload.length === 0;

    const isFloorPlanLoading =
      formMode === "edit" &&
      initialData?.floorPlanGallery?.length! > 0 &&
      floorPlanGalleryUploadHook.filesUpload.length === 0;

    if (isGalleryLoading || isFloorPlanLoading) {
      toast.error(
        "Os dados da galeria ainda estão sendo processados. Tente novamente em um segundo.",
      );
      return;
    }

    startTransition(async () => {
      const finalGallery = (await galleryUploadHook.handleCloudUpload(
        galleryUploadHook.filesUpload,
      )) as { key: string; order: number }[];

      const finalFloorPlanGallery =
        (await floorPlanGalleryUploadHook.handleCloudUpload(
          floorPlanGalleryUploadHook.filesUpload,
        )) as { key: string; order: number; label: string }[];

      // 2. GEOCODING
      let lat = data.address?.lat;
      let lng = data.address?.lng;

      if (
        data.address?.street &&
        data.address?.neighborhood?.name &&
        data.address?.city
      ) {
        // MOUNT ADDRESS USING THE CURRENT DATA
        const fullAddress = `${data.address?.street}, ${data.address?.neighborhood.name} - ${data.address?.city}`;

        try {
          const coords = await getCoordinates(fullAddress);
          lat = coords.lat;
          lng = coords.lng;

          form.setValue("address.lat", lat);
          form.setValue("address.lng", lng);
        } catch (error) {
          console.error("Erro ao obter geolocalização:", error);
        }
      } else {
        lat = undefined;
        lng = undefined;
      }

      const payload = {
        ...data,
        gallery: finalGallery,
        floorPlanGallery: finalFloorPlanGallery,
        status: status,
        address: {
          ...data.address,
          lat: lat,
          lng: lng,
        },
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
              {/* MODE BADGE */}
              <Badge
                variant="outline"
                className={`${mode.badgeClass} px-3 py-1`}
              >
                <mode.icon className="h-3 w-3 mr-1.5" />
                {mode.badgeText}
              </Badge>

              {/* STATUS BADGE */}
              {formattedStatus && (
                <Badge
                  className={`${formattedStatus.badgeColor} text-black px-3 py-1`}
                >
                  {formattedStatus.label}
                </Badge>
              )}
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {title || mode.defaultTitle}
            </h2>
            <p className="text-muted-foreground">
              Editando informações do imóvel
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant={"outline"}
            className={`
    ${
      isFeatured
        ? "bg-white border-2 border-yellow-600/60 text-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.45)] transition ease-in-out duration-200 hover:text-yellow-600"
        : ""
    }
  `}
            onClick={() => form.setValue("isFeatured", !isFeatured)}
          >
            <Star
              className={`${isFeatured ? "fill-yellow-600/60 text-yellow-600/60" : ""}`}
            />
            {isFeatured ? "Destacado" : "Destacar"}
          </Button>

          {/* GO TO PROPERTY PREVIEW PAGE */}
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

          {propertyId && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DeletePropertyDropdownItem propertyId={propertyId} />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
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
                onClick={() => {
                  setStatus("DRAFT");
                  form.setValue("status", "DRAFT", { shouldDirty: true });
                }}
              >
                Salvar rascunho
              </Button>

              {/* SAVES PROPERTY AS A PUBLISHED PROPERTY */}
              <Button
                className="bg-[image:var(--gradient-primary)] hover:brightness-90"
                type="submit"
                disabled={isPending}
                onClick={() => {
                  setStatus("PUBLISHED");
                  form.setValue("status", "PUBLISHED", { shouldDirty: true });
                }}
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
