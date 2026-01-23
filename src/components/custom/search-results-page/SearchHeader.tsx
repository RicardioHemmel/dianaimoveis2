"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";

const activeFilters = [
  { label: "Comprar", key: "finalidade" },
  { label: "Brooklin", key: "bairro" },
  { label: "2+ quartos", key: "quartos" },
];

export function SearchHeader() {
  const { properties } = useSearchPropertyContext();

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
            {activeFilters.map((filter) => (
              <Badge
                key={filter.key}
                className="pl-3 pr-2 py-1.5 bg-action-primary/30 text-secondary-foreground hover:bg-secondary/30 cursor-pointer"
              >
                {filter.label}
                <button className="ml-2 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant={"outline"}
              className="text-sm hover:underline font-medium rounded-2xl"
            >
              Limpar todos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
