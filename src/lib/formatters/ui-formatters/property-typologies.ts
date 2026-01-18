import { PropertyTypologiesListSchema } from "@/lib/constants/properties/property-typologies";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";
import {
  LucideIcon,
  Home,
  Building2,
  Layers,
  Sunset,
  Crown,
  Bed,
  Warehouse,
  TreePine,
  Layers2,
} from "lucide-react";

const propertyTypologyIcons: Record<
  PropertyTypologiesListSchema,
  { icon: LucideIcon; bgColor: string; textColor: string; description: string }
> = {
  Tipo: {
    icon: Building2,
    description: "Modelo tradicional e comum",
    bgColor: "bg-purple-500/20",
    textColor: "text-purple-600",
  },
  Studio: {
    description: "Ambiente integrado e funcional",
    icon: Bed,
    bgColor: "bg-cyan-500/20",
    textColor: "text-cyan-600",
  },
  Loft: {
    description: "Espaço amplo, moderno e com conceito aberto",
    icon: Warehouse,
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-600",
  },
  Cobertura: {
    description: "Vista panorâmica e terraço privativo",
    icon: Sunset,
    bgColor: "bg-amber-500/20",
    textColor: "text-amber-600",
  },
  Duplex: {
    description: "Dois pavimentos conectados",
    icon: Layers2,
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-600",
  },
  Garden: {
    description: "Área externa privativa",
    icon: TreePine,
    bgColor: "bg-emerald-200/80",
    textColor: "text-emerald-600",
  },
  Kitnet: {
    description: "Espaço compacto, prático e econômico",
    icon: Home,
    bgColor: "bg-teal-500/20",
    textColor: "text-teal-600",
  },
  Penthouse: {
    description: "Imóvel de alto padrão com luxo e privacidade",
    icon: Crown,
    bgColor: "bg-yellow-500/20",
    textColor: "text-yellow-600",
  },
  Triplex: {
    description: "Três pavimentos de exclusividade",
    icon: Layers,
    bgColor: "bg-red-500/20",
    textColor: "text-red-600",
  },
};

export const propertyTypologySelectMapper = (
  typologiesList?: PropertyDetailSchema[],
) => {
  return typologiesList?.map((typology) => {
    const config =
      propertyTypologyIcons[typology.name as PropertyTypologiesListSchema];

    return {
      ...typology,
      icon: config.icon,
      bgColor: config.bgColor,
      textColor: config.textColor,
      description: config.description,
    };
  });
};

export const propertyTypologyDisplayMapper = (
  typologiesList?: PropertyDetailSchema[],
) => {
  return typologiesList?.map((typology) => {
    const config =
      propertyTypologyIcons[typology.name as PropertyTypologiesListSchema];

    return {
      ...typology,
      icon: config.icon,
      description: config.description,
    };
  });
};
