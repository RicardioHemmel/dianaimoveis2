"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";

export function SearchHeader() {
  const { properties, clearFilters, activeFiltersBadge, cleanSpecificFilter } =
    useSearchPropertyContext();

  return (
    <div className="bg-surface-muted border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-text-title">
              Resultados da Busca
            </h1>
            <p className="text-muted-foreground mt-1">
              <span className="font-bold text-text-title">
                {properties.length} imóveis
              </span>{" "}
              encontrados
            </p>
          </div>

          {/* ACTIVE FILTERS */}
          <div className="flex flex-wrap items-center gap-2">
            <span>Filtros ativos:</span>
            {activeFiltersBadge.length ? (
              activeFiltersBadge.map((filter) => (
                <Badge
                  key={filter.key}
                  className="pl-3 pr-2 py-1.5 bg-action-primary text-secondary-foreground"
                >
                  {filter.label}
                  <button
                    onClick={() => cleanSpecificFilter(filter.key)}
                    className="ml-1 hover:text-destructive cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </Badge>
              ))
            ) : (
              <Badge className="py-1.5 bg-action-primary/90 text-secondary-foreground">
                Nenhum
              </Badge>
            )}
            <Button
              variant={"outline"}
              className="text-sm hover:underline font-medium rounded-2xl"
              onClick={clearFilters}
            >
              Limpar todos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
