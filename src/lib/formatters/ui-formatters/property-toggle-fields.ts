import { ToggleFieldSchema } from "@/lib/schemas/property/property.schema";
import { LucideIcon, Sofa, Train, PawPrint } from "lucide-react";

type FieldTypes = "isPetFriendly" | "isNearSubway" | "isFurnished";

// FIELDS TO MAP ICONS
const FIELD_CONFIG: Record<FieldTypes, { icon: LucideIcon }> = {
  isFurnished: { icon: Sofa },
  isPetFriendly: { icon: PawPrint },
  isNearSubway: { icon: Train },
};

// RESOLVED FIELDS WITH ICONS LIST
interface PropertyDetailItem {
  icon: LucideIcon;
  label: string;
}

// DECIDES WITH TEXT TO SHOW
export function formatToggleFieldLabel(
  type: FieldTypes,
  value: boolean
): string {
  switch (type) {
    case "isPetFriendly":
      return value ? "Aceita pets" : "Não aceita pets";

    case "isNearSubway":
      return value ? "Próx. do metrô" : "Sem metrô próx.";

    case "isFurnished":
      return value ? "Mobiliado" : "Não mobiliado";

    default:
      return "";
  }
}

// MOUNTS A LIST WITH ALL FORMATTED TOGGLE FIELDS
export function buildToggleFieldLabels(
  data: Record<FieldTypes, ToggleFieldSchema>
): PropertyDetailItem[] {
  return (Object.keys(data) as FieldTypes[])
    .map((field) => {
      const value = data[field];
      if (value.show === false) return null;

      const label = formatToggleFieldLabel(field, value.value);
      if (!label) return null;

      return {
        icon: FIELD_CONFIG[field].icon,
        label,
      };
    })
    .filter(Boolean) as PropertyDetailItem[];
}
