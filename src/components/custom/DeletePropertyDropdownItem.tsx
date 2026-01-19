"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DeleteDialogModal } from "@/components/custom/DeleteDialogModal";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeletePropertyDropdownItem({
  propertyId,
}: {
  propertyId: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setShowDeleteDialog(true);
        }}
        className="text-destructive"
      >
        <Trash2 className="h-4 w-4 mr-2 text-destructive" />
        Excluir Imóvel
      </DropdownMenuItem>

      <DeleteDialogModal
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        propertyId={propertyId}
      />
    </>
  );
}
