"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";
import { ListFilter } from "lucide-react";

export function SortOptionsFilter() {
  const { selectedFilters, setSingleItem } = useSearchPropertyContext();

  return (
    <div className="flex items-center gap-2">
      {/* LABEL DESKTOP */}
      <span className="text-sm font-medium hidden xl:inline text-muted-foreground whitespace-nowrap">
        Ordenar por:
      </span>

      <Select
        defaultValue={selectedFilters.sortOption || "date_desc"}
        onValueChange={(value) => setSingleItem("sortOption", value)}
      >
        <SelectTrigger
          className="
            /* Mobile: Estilo de Ícone */
            size-10 p-0 flex items-center justify-center rounded-xl bg-gray-100 xl:bg-white border-border
            /* Desktop: Estilo de Dropdown */
            md:w-44 md:h-9 md:px-3 md:rounded-lg
            /* Remove a setinha padrão do shadcn se quiser um visual mais limpo no mobile */
            [&>svg:last-child]:hidden xl:[&>svg:last-child]:block
          "
        >
          {/* ICON ONLY VISIBLE ON MOBILE */}
          <ListFilter className="size-5  xl:hidden" />

          {/* Valor visível apenas no Desktop */}
          <div className="hidden xl:block truncate">
            <SelectValue placeholder="Ordenar" />
          </div>
        </SelectTrigger>

        <SelectContent
          align="end"
          className="bg-card border-border z-50 min-w-[180px]"
        >
          <SelectItem value="date_desc">Mais recentes</SelectItem>
          <SelectItem value="date_asc">Mais antigos</SelectItem>
          <SelectItem value="price_asc">Menor preço</SelectItem>
          <SelectItem value="price_desc">Maior preço</SelectItem>
          <SelectItem value="area_asc">Menor área</SelectItem>
          <SelectItem value="area_desc">Maior área</SelectItem>
          <SelectItem value="launch">Lançamento</SelectItem>
          <SelectItem value="ready">Pronto</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
