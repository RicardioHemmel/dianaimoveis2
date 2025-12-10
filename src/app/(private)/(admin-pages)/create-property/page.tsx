"use client";

import { useEffect, useState } from "react";

// Tabs
import TabBasicInfo from "@/components/ui-custom/private/property-form/TabBasicInfo";
import TabLocation from "@/components/ui-custom/private/property-form/TabLocation";
import TabDetails from "@/components/ui-custom/private/property-form/TabDetails";
import TabSpecific from "@/components/ui-custom/private/property-form/TabSpecific";
import TabAmenities from "@/components/ui-custom/private/property-form/TabAmenities";
import TabCreative from "@/components/ui-custom/private/property-form/TabCreative";

// Shadcnui
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// lucide-react
import {
  Building2,
  MapPin,
  FileText,
  Info,
  TreePalm,
  ImageUp,
} from "lucide-react";

// Hooks
import usePropertyCreateForm from "@/hooks/properties/use-property-create-form";
import { Form } from "@/components/ui/form";

export default function CreatePropertyPage() {
  // Gets data from the custom hook to populate each tab
  const {
    form,
    onSubmit,
    saveDraft,
    amenitiesList,
    propertyPurposes,
    propertyStatus,
    propertyStandings,
    propertyTypologies,
  } = usePropertyCreateForm();

  // Manage the tabs change
  const tabs = [
    "basic",
    "location",
    "details",
    "specific",
    "amenities",
    "creative",
  ];

  const [activeTab, setActiveTab] = useState<string>("basic");

  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  // For disabling navigation buttons
  const isFirstTab = activeTab === tabs[0];
  const isLastTab = activeTab === tabs[tabs.length - 1];

  // Register a property draft
  const { title, propertyTypeSlug, price } = form.watch();
  const watchedValues = form.watch();

  useEffect(() => {
    if (!title || !propertyTypeSlug || !price) return;
    const timer = setTimeout(() => {
      saveDraft();
    }, 1500);

    return () => clearTimeout(timer);
  }, [watchedValues]);

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Cadastrar Imóvel
          </h2>
          <p className="text-muted-foreground mt-1">
            Preencha as informações abaixo
          </p>
        </div>

        <div className="flex gap-3 mt-6 pt-6">
          <Button
            onClick={goToPreviousTab}
            disabled={isFirstTab}
            variant={"outline"}
          >
            Anterior
          </Button>
          <Button
            onClick={goToNextTab}
            disabled={isLastTab}
            variant={"outline"}
          >
            Próximo
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6 shadow-card bg-white border-2 border-neutral-100">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
                <TabsTrigger value="basic">
                  <FileText className="h-4 w-4 mr-2" />
                  Básico
                </TabsTrigger>
                <TabsTrigger value="location">
                  <MapPin className="h-4 w-4 mr-2" />
                  Localização
                </TabsTrigger>
                <TabsTrigger value="details">
                  <Info className="h-4 w-4 mr-2" />
                  Detalhes
                </TabsTrigger>
                <TabsTrigger value="specific">
                  <Building2 className="h-4 w-4 mr-2" />
                  Específico
                </TabsTrigger>
                <TabsTrigger value="amenities">
                  <TreePalm className="h-4 w-4 mr-2" />
                  Comodidades
                </TabsTrigger>
                <TabsTrigger value="creative">
                  <ImageUp className="h-4 w-4 mr-2" />
                  Criativo
                </TabsTrigger>
              </TabsList>

              {/* Basic Info */}
              <TabBasicInfo
                form={form}
                propertyPurposes={propertyPurposes}
                propertyStatus={propertyStatus}
              />

              {/* Location */}
              <TabLocation form={form} />

              {/* Details */}
              <TabDetails form={form} />

              {/* Specific Info */}
              <TabSpecific
                form={form}
                propertyStandings={propertyStandings}
                propertyTypologies={propertyTypologies}
              />

              {/* Amenities Selection */}
              <TabAmenities form={form} amenitiesList={amenitiesList} />

              {/* Creative */}
              <TabCreative form={form} />
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6 pt-6 border-t">
              <Button
                className="bg-[image:var(--gradient-primary)] hover:brightness-90"
                type="submit"
              >
                Cadastrar Imóvel
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
