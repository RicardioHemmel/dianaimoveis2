"use client";

import { useState } from "react"; // Adicionado
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SortOptionsFilter } from "@/components/custom/search-results-page/SortOptionsFilter";
import { FiltersContent } from "@/components/custom/search-results-page/FilterContent";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";

export function MobileSearchFilters() {
  // Controle manual do estado do Sheet
  const [isOpen, setIsOpen] = useState(false);

  const {
    clearFilters,
    hasActiveFilters,
    activeFiltersBadge,
    applyFilters,
    draftFilters,
  } = useSearchPropertyContext();

  const activeFiltersCount = activeFiltersBadge.length;

  // Função para aplicar e fechar
  const handleApplyResults = () => {
    applyFilters(draftFilters);
    setIsOpen(false); // Fecha o sheet após aplicar
  };

  const handleClearFilters = () => {
    clearFilters();
    setIsOpen(false); // Opcional: fecha ao limpar também
  };

  return (
    <div className="xl:hidden">
      <div className="container flex items-center mx-auto px-9 md:px-4 py-3 gap-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl border-border/50 bg-gray-100 hover:bg-background justify-between px-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-primary">Filtros</span>
                {hasActiveFilters && (
                  <span className="bg-action-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <SlidersHorizontal className="size-5 text-gray-500" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-full sm:max-w-md flex flex-col p-0 h-dvh z-10000"
          >
            <SheetHeader className="px-5 py-4 border-b shrink-0">
              <SheetTitle className="text-left font-display font-semibold">
                Filtrar Imóveis
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <FiltersContent />
            </div>

            {/* FOOTER FIXO */}
            <div className="p-4 border-t bg-background shrink-0 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 cursor-pointer"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
              >
                Limpar
              </Button>

              <Button
                className="flex-1 bg-action-primary text-white cursor-pointer"
                onClick={handleApplyResults}
              >
                Ver Resultados
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="shrink-0 md:hidden">
          <SortOptionsFilter />
        </div>
      </div>
    </div>
  );
}
