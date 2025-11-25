import {
  User,
  Settings,
  LogOut,
  Home,
  Plus,
  Building2
} from "lucide-react";

export const SIDEBAR_LINKS = {
  dashboard: {
    title: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  propertyList: { title: "Imóveis", path: "/property-list", icon: Building2 },
  createProperty: { title: "Cadastrar", path: "/create-property", icon: Plus },
  profile: { title: "Perfil", path: "/profile", icon: User },
} as const;
