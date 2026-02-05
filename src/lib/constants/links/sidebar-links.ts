import {
  User,
  ChartNoAxesColumnIncreasing,
  Building2,
  MapPinHouse,
  TreePalm,
  PlusCircle,
} from "lucide-react";

export const SIDEBAR_LINKS = {
  dashboard: {
    title: "Dashboard",
    path: "/dashboard",
    icon: ChartNoAxesColumnIncreasing,
  },
  propertyList: { title: "Imóveis", path: "/property-list", icon: Building2 },
  newProperty: {
    title: "Cadastrar Imóvel",
    path: "/properties/new",
    icon: PlusCircle,
  },
  profile: { title: "Perfil", path: "/profile", icon: User },
  amenities: { title: "Lazeres", path: "/amenities", icon: TreePalm },
  neighborhoods: {
    title: "Bairros",
    path: "/neighborhoods",
    icon: MapPinHouse,
  },
  constructionCompanies: {
    title: "Construtoras",
    path: "/construction-companies",
    icon: Building2,
  },
} as const;
