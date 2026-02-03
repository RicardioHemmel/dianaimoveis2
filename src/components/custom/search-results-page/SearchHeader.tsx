"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";

export function SearchHeader() {
  const { clearFilters, activeFiltersBadge, cleanSpecificFilter, pagination } =
    useSearchPropertyContext();

  return (
    <div className="bg-surface-muted border-b border-border">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="flex-col flex items-center gap-5 md:block">
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-text-title">
              Resultados da Busca
            </h1>
            <p className="text-muted-foreground mt-1">
              <span className="font-bold text-text-title">
                {pagination.totalItems} imóveis
              </span>{" "}
              encontrados
            </p>
          </div>

          {/* ACTIVE FILTERS */}
          <div className="flex flex-wrap items-center gap-2 max-w-[620px]">
            <span>Filtros ativos:</span>
            {activeFiltersBadge.length > 0 ? (
              <>
                <div className="flex">
                  <div>
                    {activeFiltersBadge.map((filter) => (
                      <Badge
                        key={filter.key}
                        className="pl-3 pr-2 py-1.5 m-1 bg-action-primary text-secondary-foreground"
                      >
                        {filter.label}
                        <button
                          onClick={() => cleanSpecificFilter(filter.key)}
                          className="ml-1 hover:text-destructive cursor-pointer"
                        >
                          <X className="size-4" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant={"outline"}
                    className="text-sm hover:underline font-medium rounded-2xl"
                    onClick={clearFilters}
                  >
                    Limpar todos
                  </Button>
                </div>
              </>
            ) : (
              <Badge className="py-1.5 bg-action-primary/90 text-secondary-foreground">
                Nenhum
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
