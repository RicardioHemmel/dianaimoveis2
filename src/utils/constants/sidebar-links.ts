import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  LayoutTemplate,
  Home,
} from "lucide-react";

export const SIDEBAR_LINKS = {
  dashboard: {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  profile: { title: "Perfil", path: "/profile", icon: User },
  properties: {title: "Imóveis", path: "/properties-list", icon: Home},
  settings: { title: "Configurações", path: "/settings", icon: Settings },
  logout: { title: "Sair", path: "/sair", icon: LogOut },
} as const;
