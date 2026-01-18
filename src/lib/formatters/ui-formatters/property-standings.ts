import { PropertyStandingsListSchema } from "@/lib/constants/properties/property-standings";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";
import { LucideIcon, Home, Building, Building2, Castle } from "lucide-react";

const propertyStandingIcons: Record<
  PropertyStandingsListSchema,
  { icon: LucideIcon; bgColor: string; textColor: string }
> = {
  Popular: {
    icon: Home,
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-200/80",
  },
  "Médio Padrão": {
    icon: Building,
    textColor: "text-blue-600",
    bgColor: "bg-blue-200/80",
  },
  "Alto Padrão": {
    icon: Building2,
    textColor: "text-purple-600",
    bgColor: "bg-purple-200/80",
  },
  "Altíssimo Padrão": {
    icon: Castle,
    textColor: "text-orange-600",
    bgColor: "bg-orange-200/80",
  },
};

export const propertyStandingMapper = (
  standingsList?: PropertyDetailSchema[],
) => {
  return standingsList?.map((standing) => ({
    ...standing,
    icon: propertyStandingIcons[standing.name as PropertyStandingsListSchema]
      .icon,
    bgColor:
      propertyStandingIcons[standing.name as PropertyStandingsListSchema]
        .bgColor,
    textColor:
      propertyStandingIcons[standing.name as PropertyStandingsListSchema]
        .textColor,
  }));
};
