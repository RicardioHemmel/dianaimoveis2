"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deletePropertyAction } from "@/lib/server-actions/properties/delete-property.action";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteDialogModal({
  showDeleteDialog,
  setShowDeleteDialog,
  propertyId,
}: {
  showDeleteDialog: boolean;
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>;
  propertyId?: string;
}) {
  const router = useRouter();
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir imóvel?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O imóvel será permanentemente
            removido do sistema, incluindo todas as imagens e informações
            associadas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              try {
                if (!propertyId) return;

                await deletePropertyAction(propertyId);
                setShowDeleteDialog(false);
                toast.success("Imóvel deletado com sucesso");
                router.replace("/property-list", { scroll: false });
              } catch (e) {
                console.log("Erro ao excluir imóvel: ", e);
              }
            }}
            className="bg-destructive hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
