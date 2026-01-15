import { Plus, Pencil } from "lucide-react";

export const formModeConfig = {
  create: {
    badgeText: "Modo Criação",
    badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    Icon: Plus,
    defaultTitle: "Cadastrar imóvel",
    subTitle: "Cadastrar imóvel",
    loadingText: "Cadastrando...",
  },
  edit: {
    badgeText: "Modo Edição",
    badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    Icon: Pencil,
    defaultTitle: "",
    actionText: "Salvar",
    loadingText: "Salvando...",
  },
} as const;
