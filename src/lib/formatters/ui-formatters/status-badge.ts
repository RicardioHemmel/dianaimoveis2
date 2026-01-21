import { LucideIcon, Pencil, CircleCheck } from "lucide-react";

type StatusOptions = "DRAFT" | "PUBLISHED";

const formattedStatus: Record<
  StatusOptions,
  { label: string; badgeColor: string; icon: LucideIcon }
> = {
  DRAFT: {
    label: "Rascunho",
    badgeColor: "bg-amber-200",
    icon: Pencil,
  },
  PUBLISHED: {
    label: "Publicado",
    badgeColor: "bg-emerald-300",
    icon: CircleCheck,
  },
};

export function statusFormatter(status: StatusOptions) {
  return formattedStatus[status];
}
