import {
  User,
  ChartNoAxesColumnIncreasing,
  Plus,
  Building2
} from "lucide-react";

export const SIDEBAR_LINKS = {
  dashboard: {
    title: "Dashboard",
    path: "/dashboard",
    icon: ChartNoAxesColumnIncreasing,
  },
  propertyList: { title: "Imóveis", path: "/property-list", icon: Building2 },
  newProperty: { title: "Cadastrar Imóvel", path: "/properties/new", icon: Plus },
  profile: { title: "Perfil", path: "/profile", icon: User },
} as const;
