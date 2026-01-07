"use client";

// REACT | NEXT
import { use, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// COMPONENTS
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropertyFormTabs from "@/components/custom/property-form/PropertyFormTabs";

// HOOKS
import usePropertyForm from "@/hooks/properties/use-property-form";

// SCHEMA
import {
  PropertyDetailsData,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";

// SERVER ACTION
import { createPropertyAction } from "@/lib/server-actions/properties/create-property.action";
import { updatePropertyAction } from "@/lib/server-actions/properties/update-property.action";

import { toast } from "sonner";

// DEFINES WHETHER THE FORM IS TO CREATE OR UPDATE
type PropertyFormProps = {
  mode: "create" | "edit";
  initialData?: PropertyInputSchema;
  propertyDetails?: PropertyDetailsData;
};

export default function PropertyForm({
  mode,
  initialData,
  propertyDetails,
}: PropertyFormProps) {
  // INICIALIZE HOOK PASSING INITIALDATA TO POPULATE RHF
  const { form } = usePropertyForm(propertyDetails?.types ?? [], initialData);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

  function onSubmit(data: PropertyInputSchema) {
    startTransition(async () => {
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

  // TABS LIST FOR NAVIGATION
  const tabs = [
    "basic",
    "location",
    "details",
    "specific",
    "amenities",
    "creative",
  ];

  const [activeTab, setActiveTab] = useState("basic");
  const isFirstTab = activeTab === tabs[0];
  const isLastTab = activeTab === tabs[tabs.length - 1];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="px-4">
          <h2 className="text-3xl font-bold">Cadastrar Imóvel</h2>
          <p className="text-muted-foreground mt-1">
            Preencha as informações abaixo
          </p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setActiveTab(tabs[tabs.indexOf(activeTab) - 1])}
            disabled={isFirstTab}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            onClick={() => setActiveTab(tabs[tabs.indexOf(activeTab) + 1])}
            disabled={isLastTab}
          >
            Próximo
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-6 shadow-card bg-white border-2 border-neutral-100">
            {/* ALL TABS CONTAINING PARTS OF THE FORM */}
            <PropertyFormTabs
              form={form}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              propertyDetails={propertyDetails}
            />

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
