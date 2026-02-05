"use client";

import { MapPinHouse, Plus } from "lucide-react";
import { PropertyDetailCreateCard } from "@/components/custom/property-details/PropertyDetailCreateCard";
import { createNeighborhoodAction } from "@/lib/server-actions/neighborhood/create-neighborhood.action";

export function CreateNeighborhoodCard() {
  return (
    <PropertyDetailCreateCard
      title="Novo Bairro"
      description="Adicione um novo bairro ao sistema"
      placeholder="Ex: Moema"
      buttonText="Cadastrar Bairro"
      pendingText="Salvando..."
      buttonIcon={Plus}
      icon={MapPinHouse}
      action={createNeighborhoodAction}
      successMessage="Bairro cadastrado com sucesso!"
      errorMessage="Não foi possível cadastrar o bairro."
    />
  );
}
