"use client";

import { useForm } from "react-hook-form";

// Form control
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertySchema,
  PropertyFormData,
} from "@/lib/schemas/property/property.schema";

// Tabs
import TabBasicInfo from "@/components/ui-custom/private/property-form/tab-basic-info";
import TabLocation from "@/components/ui-custom/private/property-form/tab-location";
import TabDetails from "@/components/ui-custom/private/property-form/tab-details";
import TabSpecific from "@/components/ui-custom/private/property-form/tab-specific";
import TabAmenities from "@/components/ui-custom/private/property-form/tab-amenities";
import TabCreative from "@/components/ui-custom/private/property-form/tab-creative";

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

import usePropertyCreateForm from "@/hooks/properties/use-property-create-form";

export default function CreatePropertyPage() {
  const { form, amenities, propertyPurposes } = usePropertyCreateForm();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      propertyType: "apartamento",
      status: "disponivel",
    },
  });

  const onSubmit = (data: PropertyFormData) => {
    console.log("Formulário enviado", { ...data });
  };

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
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6 shadow-card">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6 gap-3 mb-12">
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
            <TabBasicInfo form={form} propertyPurposes={propertyPurposes} />
            {/* Location */}
            <TabLocation />
            {/* Details */}
            <TabDetails />
            {/* Specific Info */}
            <TabSpecific />
            {/* Amenities Selection */}
            <TabAmenities amenities={amenities} />
            {/* Creative */}
            <TabCreative />
          </Tabs>

          {/* Botões de Ação */}
          <div className="flex gap-3 justify-end mt-6 pt-6 border-t">
            <Button
              type="submit"
              className="bg-gradient-primary shadow-premium hover:shadow-card transition-shadow"
            >
              Cadastrar Imóvel
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
