"use client";

import { Building2, Plus } from "lucide-react";
import { PropertyDetailCreateCard } from "@/components/custom/property-details/PropertyDetailCreateCard";
import { createConstructionCompanyAction } from "@/lib/server-actions/construction-companies/create-construction-company.action";

export function CreateConstructionCompanyCard() {
  return (
    <PropertyDetailCreateCard
      title="Nova Construtora"
      description="Adicione uma nova construtora ao sistema"
      placeholder="Ex: Construtora Lavvi"
      buttonText="Cadastrar Construtora"
      pendingText="Salvando..."
      buttonIcon={Plus}
      icon={Building2}
      action={createConstructionCompanyAction}
      successMessage="Construtora cadastrada com sucesso!"
      errorMessage="Não foi possível cadastrar a construtora."
    />
  );
}
