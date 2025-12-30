"use client";

// REACT | NEXT
import { useState } from "react";

// COMPONENTS
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropertyFormTabs from "@/components/custom/property-form/PropertyFormTabs";

// HOOKS
import usePropertyForm from "@/hooks/properties/form/use-property-form";
import { useAmenities } from "@/hooks/properties/use-property-amenities";
import { useStatus } from "@/hooks/properties/use-property-status";
import { usePurposes } from "@/hooks/properties/use-property-purposes";
import { useStandings } from "@/hooks/properties/use-property-standings";
import { useTypologies } from "@/hooks/properties/use-property-typologies";

// PROPERTY SCHEMA
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";

// DEFINES WHETHER THE FORM IS TO CREATE OR UPDATE
type Props = {
  mode: "create" | "edit";
  initialData?: PropertyInputSchema;
};

export default function PropertyFormShell({ mode, initialData }: Props) {
  // INICIALIZE HOOK PASSING INITIALDATA TO POPULATE RHF
  const { form } = usePropertyForm(initialData);

  // FETCHES DATA FOR FORM SELECTS
  const amenitiesList = useAmenities().data;
  const propertyPurposes = usePurposes().data;
  const propertyStatus = useStatus().data;
  const propertyStandings = useStandings().data;
  const propertyTypologies = useTypologies().data;

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

        {/* TABS NAVIGATION */}
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
        <form action={""}>
          <Card className="p-6 shadow-card bg-white border-2 border-neutral-100">
            {/* ALL TABS CONTAINING PIECES OF THE FORM */}
            <PropertyFormTabs
              form={form}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              amenitiesList={amenitiesList}
              propertyPurposes={propertyPurposes}
              propertyStatus={propertyStatus}
              propertyStandings={propertyStandings}
              propertyTypologies={propertyTypologies}
            />

            {/* SAVES PROPERTY AS A DRAFT */}
            <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
              {/* <Button type="button" variant="outline" onClick={saveDraft}>
                Salvar rascunho
              </Button> */}

              {/* SAVES PROPERTY AS A PUBLISHED PROPERTY */}
              <Button
                className="bg-[image:var(--gradient-primary)] hover:brightness-90"
                type="submit"
              >
                {mode === "edit" ? "Publicar imóvel" : "Cadastrar imóvel"}
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
