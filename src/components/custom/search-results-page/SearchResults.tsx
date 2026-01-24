"use client";

import { useEffect, useState } from "react";
import { Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MorphingCardListing } from "../property-cards/listing/MorphingCardListing";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";

export function SearchResults() {
  // CONTEXT
  const { properties, toggleSingleItem, selectedFilters } =
    useSearchPropertyContext();

  // CHANGES CARDS BASED ON WIDTH
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const width = useBreakpoint();
  const isMobile = width < 768;
  useEffect(() => {
    if (isMobile === true) {
      setViewMode("grid");
    }
  }, [isMobile]);

  return (
    <div>
      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-6">
        <div className="hidden md:flex items-center gap-4 px-4">
          <span className="text-sm">Trocar visualização dos imóveis</span>
          <div className="flex items-center gap-2">
            {/* CHANGE TO GRID CARDS */}
            <Button
              variant={viewMode === "grid" ? "gold" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-lg size-9"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>

            {/* CHANGE TO LISTING CARDS */}
            <Button
              variant={viewMode === "list" ? "gold" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-lg size-9"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm">Ordenar por:</span>
          <Select
            defaultValue={selectedFilters.sortOption}
            onValueChange={(value) => toggleSingleItem("sortOption", value)}
          >
            <SelectTrigger className="w-44 h-9 bg-card border-border rounded-lg text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
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
      </div>

      {/* MORPHING CARD LISTING - (GRID OR LIST) */}
      <MorphingCardListing properties={properties} viewMode={viewMode} />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <Button variant="outline" size="sm" className="rounded-lg">
          Anterior
        </Button>
        <Button variant="secondary" size="sm" className="rounded-lg w-10">
          1
        </Button>
        <Button variant="ghost" size="sm" className="rounded-lg w-10">
          2
        </Button>
        <Button variant="ghost" size="sm" className="rounded-lg w-10">
          3
        </Button>
        <span className="text-muted-foreground">...</span>
        <Button variant="ghost" size="sm" className="rounded-lg w-10">
          8
        </Button>
        <Button variant="outline" size="sm" className="rounded-lg">
          Próximo
        </Button>
      </div>
    </div>
  );
}
