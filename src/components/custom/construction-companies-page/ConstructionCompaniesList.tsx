"use client";

import { Building2 } from "lucide-react";
import { PropertyDetailList } from "@/components/custom/property-details/PropertyDetailList";
import { ConstructionCompanyWithLinkedProperties } from "@/lib/services/properties/property-details/property-construction-company.service";
import { deleteConstructionCompanyAction } from "@/lib/server-actions/construction-companies/delete-construction-company.action";

export function ConstructionCompaniesList({
  companies,
}: {
  companies: ConstructionCompanyWithLinkedProperties[];
}) {
  return (
    <PropertyDetailList
      items={companies}
      deleteAction={deleteConstructionCompanyAction}
      emptyIcon={Building2}
      copy={{
        headerTitle: (count) => `Construtoras Cadastradas: ${count}`,
        searchPlaceholder: "Buscar construtora...",
        filterAllLabel: "Todas",
        filterLinkedLabel: "Com vínculo",
        filterUnlinkedLabel: "Sem vínculo",
        emptyTitle: "Nenhuma construtora encontrada",
        emptyHint: "Tente ajustar os termos da busca",
        deleteTitle: (name) => `Excluir "${name}"?`,
        deleteLinkedWarning: (count) =>
          `Atenção! Esta construtora está vinculada a ${
            count !== 1 ? `${count} imóveis` : `${count} imóvel`
          }:`,
        deleteLinkedDescription:
          "Ao excluir, essa construtora será removida automaticamente de todos esses imóveis.",
        deleteSafeDescription:
          "Esta construtora não está vinculada a nenhum imóvel e pode ser excluída com segurança.",
        deleteErrorMessage: "Não foi possível excluir a construtora.",
        deleteErrorFallback: "Ocorreu um erro ao excluir a construtora.",
      }}
    />
  );
}
