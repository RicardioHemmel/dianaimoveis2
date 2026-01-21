"use client";

// REACT | NEXT
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

// ICONS
import { Heart, ArrowRight, Sparkles, Save } from "lucide-react";

// COMPONENT
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface FavoriteDialogModalProps {
  showEmptyModal: boolean;
  setShowEmptyModal: Dispatch<SetStateAction<boolean>>;
}

export function FavoriteDialogModal({
  showEmptyModal,
  setShowEmptyModal,
}: FavoriteDialogModalProps) {
  return (
    <AlertDialog open={showEmptyModal} onOpenChange={setShowEmptyModal}>
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-6 relative">
            <div className="w-20 h-20 bg-linear-to-br from-red-500/90 to-red-500/60 rounded-full flex items-center justify-center">
              <Heart className="h-10 w-10 text-secondary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center">
              <Sparkles className="size-10 text-action-primary" />
            </div>
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-center">
            Seus favoritos ficam aqui! ❤️
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base space-y-4 pt-4">
            Esta é a sua página pessoal de favoritos. Aqui você encontrará todos
            os imóveis que mais chamaram sua atenção.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-muted/50 rounded-2xl p-4 border border-border">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
              <Save className="size-5 text-black" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground text-sm">
                Salvamos no seu dispositivo
              </p>
              <p className="text-muted-foreground text-sm">
                Seus favoritos são salvos localmente no navegador. Isso
                significa que eles estarão aqui sempre que você voltar usando
                este mesmo dispositivo.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Link href="/properties" className="w-full">
            <Button
              size="lg"
              className="w-full bg-action-primary text-black hover:bg-action-primary-hover"
            >
              Explorar Imóveis
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowEmptyModal(false)}
            className="w-full"
          >
            Fechar
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
