//-------------------------------------------------- FRIENDLY LABELS MAPPER ------------------------------------------------------

import { FieldErrors } from "react-hook-form";

export const fieldLabels: Record<string, string> = {
  title: "Título",
  price: "Preço",
  min: "Detalhes do Imóvel",
  max: "Detalhes do Imóvel",
  videoUrl: "Vídeo",
  isFurnished: "Mobiliado",
  isNearSubway: "Próximo ao metrô",
  isFeatured: "Destaque",
  isPetFriendly: "Pet friendly",
  showSquareMeterPrice: "Exibir preço por m²",
  gallery: "Galeria de imagens",
  floorPlanGallery: "Planta baixa",
  address: "Endereço",
  propertyType: "Tipo do imóvel",
  propertyPurpose: "Finalidade do imóvel",
  propertyStanding: "Padrão do imóvel",
  propertyTypologies: "Tipologia",
  propertyAmenities: "Comodidades",
};

// MAPS FIELD ERROS FROM "RHF" INTO PORTUGUESE NAMES
export function extractFieldLabels(
  errors: FieldErrors<any>,
  parentKey = ""
): string[] {
  let labels: string[] = [];

  for (const key in errors) {
    if (!errors.hasOwnProperty(key)) continue;
    const error = errors[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (error?.message || error?.type) {
      // erro de campo simples
      labels.push(fieldLabels[key] ?? key);
    } else if (
      typeof error === "object" &&
      error !== null &&
      !("message" in error)
    ) {
      // erro aninhado (ex: address)
      labels.push(...extractFieldLabels(error as FieldErrors<any>, fullKey));
    }
  }

  return labels;
}
