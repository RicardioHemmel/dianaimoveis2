"use client";

import { TreePalm } from "lucide-react";
import { AmenityWithLinkedProperties } from "@/lib/services/properties/property-details/property-amenities.service";
import { deleteAmenityAction } from "@/lib/server-actions/amenities/delete-amenity.action";
import { PropertyDetailList } from "@/components/custom/property-details/PropertyDetailList";

export function AmenitiesList({
  amenities,
}: {
  amenities: AmenityWithLinkedProperties[];
}) {
  return (
    <PropertyDetailList
      items={amenities}
      deleteAction={deleteAmenityAction}
      emptyIcon={TreePalm}
      copy={{
        headerTitle: (count) => `Comodidades Cadastradas: ${count}`,
        searchPlaceholder: "Buscar comodidade...",
        filterAllLabel: "Todas",
        filterLinkedLabel: "Com vínculo",
        filterUnlinkedLabel: "Sem vínculo",
        emptyTitle: "Nenhuma comodidade encontrada",
        emptyHint: "Tente ajustar os termos da busca",
        deleteTitle: (name) => `Excluir "${name}"?`,
        deleteLinkedWarning: (count) =>
          `Atenção! Esta comodidade está vinculada a ${
            count !== 1 ? `${count} imóveis` : `${count} imóvel`
          }:`,
        deleteLinkedDescription:
          "Ao excluir, essa comodidade será removida automaticamente de todos esses imóveis.",
        deleteSafeDescription:
          "Esta comodidade não está vinculada a nenhum imóvel e pode ser excluída com segurança.",
        deleteErrorMessage: "Não foi possível excluir a comodidade.",
        deleteErrorFallback: "Ocorreu um erro ao excluir a comodidade.",
      }}
    />
  );
}
