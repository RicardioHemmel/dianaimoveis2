"use client";

import { MapPinHouse } from "lucide-react";
import { PropertyDetailList } from "@/components/custom/property-details/PropertyDetailList";
import { NeighborhoodWithLinkedProperties } from "@/lib/services/properties/property-details/property-neighborhoods.service";
import { deleteNeighborhoodAction } from "@/lib/server-actions/neighborhood/delete-neighborhood.action";

export function NeighborhoodsList({
  neighborhoods,
}: {
  neighborhoods: NeighborhoodWithLinkedProperties[];
}) {
  return (
    <PropertyDetailList
      items={neighborhoods}
      deleteAction={deleteNeighborhoodAction}
      emptyIcon={MapPinHouse}
      copy={{
        headerTitle: (count) => `Bairros Cadastrados: ${count}`,
        searchPlaceholder: "Buscar bairro...",
        filterAllLabel: "Todos",
        filterLinkedLabel: "Com vínculo",
        filterUnlinkedLabel: "Sem vínculo",
        emptyTitle: "Nenhum bairro encontrado",
        emptyHint: "Tente ajustar os termos da busca",
        deleteTitle: (name) => `Excluir "${name}"?`,
        deleteLinkedWarning: (count) =>
          `Atenção! Este bairro está vinculado a ${
            count !== 1 ? `${count} imóveis` : `${count} imóvel`
          }:`,
        deleteLinkedDescription:
          "Ao excluir, esse bairro será removido automaticamente de todos esses imóveis.",
        deleteSafeDescription:
          "Este bairro não está vinculado a nenhum imóvel e pode ser excluído com segurança.",
        deleteErrorMessage: "Não foi possível excluir o bairro.",
        deleteErrorFallback: "Ocorreu um erro ao excluir o bairro.",
      }}
    />
  );
}
