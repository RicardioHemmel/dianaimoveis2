"use client";

import { TreePalm, Plus } from "lucide-react";
import { createAmenityAction } from "@/lib/server-actions/amenities/create-amenity.action";
import { PropertyDetailCreateCard } from "@/components/custom/property-details/PropertyDetailCreateCard";

export function CreateAmenityCard() {
  return (
    <PropertyDetailCreateCard
      title="Nova Comodidade"
      description="Adicione uma nova comodidade ao sistema"
      placeholder="Ex: Piscina aquecida"
      buttonText="Cadastrar Comodidade"
      pendingText="Salvando..."
      buttonIcon={Plus}
      icon={TreePalm}
      action={createAmenityAction}
      successMessage="Comodidade cadastrada com sucesso!"
      errorMessage="Não foi possível cadastrar a comodidade."
    />
  );
}
