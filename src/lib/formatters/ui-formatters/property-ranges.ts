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

const numberFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
});

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatRangeField(
  field: FieldTypes,
  min?: number,
  max?: number,
  extendedLabel: boolean = true,
): string {
  if (min == null || max == null) return "";

  const isEqual = min === max;
  const minLabel = formatNumber(min);
  const maxLabel = formatNumber(max);

  // ONLY THE VALUES
  if (!extendedLabel) {
    return isEqual ? `${minLabel}` : `${minLabel} a ${maxLabel}`;
  }

  const isSingular = isEqual && min === 1;

  switch (field) {
    case "bedrooms":
      if (isEqual)
        return isSingular ? `${minLabel} quarto` : `${minLabel} quartos`;
      return `${minLabel} a ${maxLabel} quartos`;

    case "suites":
      if (isEqual)
        return isSingular ? `${minLabel} suíte` : `${minLabel} suítes`;
      return `${minLabel} a ${maxLabel} suítes`;

    case "bathrooms":
      if (isEqual)
        return isSingular ? `${minLabel} banheiro` : `${minLabel} banheiros`;
      return `${minLabel} a ${maxLabel} banheiros`;

    case "parkingSpaces":
      if (isEqual)
        return isSingular ? `${minLabel} vaga` : `${minLabel} vagas`;
      return `${minLabel} a ${maxLabel} vagas`;

    case "area":
      return isEqual
        ? `${minLabel} m²`
        : `${minLabel} a ${maxLabel} m²`;

    case "floors":
      return isEqual
        ? `${minLabel}º andar`
        : `${minLabel}º a ${maxLabel}º andar`;

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
