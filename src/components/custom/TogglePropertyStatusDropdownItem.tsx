"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { togglePropertyStatusAction } from "@/lib/server-actions/properties/toggle-status.action";
import { HousePlus, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function TogglePropertyStatusDropdownItem({
  status,
  propertyId,
}: {
  status: PropertyViewSchema["status"];
  propertyId: string;
}) {
  const router = useRouter();

  // TOGGLE STATUS
  const handleToggleStatus = async () => {
    const res = await togglePropertyStatusAction(propertyId);

    if (!res.success) {
      toast.error(res.message ?? "Erro ao atualizar status");
      return;
    }
    router.push("/property-list");
  };

  return (
    <DropdownMenuItem onClick={handleToggleStatus}>
      <div className="flex items-center">
        {status === "DRAFT" ? (
          <>
            <HousePlus className="size-4 mr-2" />
            <p>Publicar Imóvel</p>
          </>
        ) : (
          <>
            <Pencil className="size-4 mr-2" />
            <p>Mudar para Rascunho</p>
          </>
        )}
      </div>
    </DropdownMenuItem>
  );
}
