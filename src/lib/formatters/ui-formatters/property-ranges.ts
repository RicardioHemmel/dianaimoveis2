import { RangeSchema } from "@/lib/schemas/property/property.schema";

import {
  Bed,
  BedDouble,
  Bath,
  Car,
  Maximize,
  Building,
  LucideIcon,
} from "lucide-react";

type FieldTypes =
  | "bedrooms"
  | "suites"
  | "bathrooms"
  | "parkingSpaces"
  | "area"
  | "floors";

interface PropertyDetailItem {
  icon: LucideIcon;
  label: string;
}

const FIELD_CONFIG: Record<FieldTypes, { icon: LucideIcon }> = {
  bedrooms: { icon: Bed },
  suites: { icon: BedDouble },
  bathrooms: { icon: Bath },
  parkingSpaces: { icon: Car },
  area: { icon: Maximize },
  floors: { icon: Building },
};

export function formatRangeField(
  field: FieldTypes,
  min?: number,
  max?: number,
  extendedLabel: boolean = true,
): string {
  if (min == null || max == null) return "";

  const isEqual = min === max;

  // ONLY THE VALUES
  if (!extendedLabel) {
    return isEqual ? `${min}` : `${min} a ${max}`;
  }

  const isSingular = isEqual && min === 1;

  switch (field) {
    case "bedrooms":
      if (isEqual) return isSingular ? `${min} quarto` : `${min} quartos`;
      return `${min} a ${max} quartos`;

    case "suites":
      if (isEqual) return isSingular ? `${min} suíte` : `${min} suítes`;
      return `${min} a ${max} suítes`;

    case "bathrooms":
      if (isEqual) return isSingular ? `${min} banheiro` : `${min} banheiros`;
      return `${min} a ${max} banheiros`;

    case "parkingSpaces":
      if (isEqual) return isSingular ? `${min} vaga` : `${min} vagas`;
      return `${min} a ${max} vagas`;

    case "area":
      return isEqual ? `${min} m²` : `${min} a ${max} m²`;

    case "floors":
      return isEqual ? `${min}º andar` : `${min}º a ${max}º andar`;

    default:
      return "";
  }
}

export function buildPropertyRanges(
  data: Partial<Record<FieldTypes, RangeSchema | undefined>>,
  extendedLabel: boolean = true,
): PropertyDetailItem[] {
  return (Object.keys(data) as FieldTypes[])
    .map((field) => {
      const value = data[field];
      if (value?.min == null || value?.max == null) return null;

      const label = formatRangeField(
        field,
        value.min,
        value.max,
        extendedLabel,
      );
      if (!label) return null;

      return {
        icon: FIELD_CONFIG[field].icon,
        label,
      };
    })
    .filter(Boolean) as PropertyDetailItem[];
}
