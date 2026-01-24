"use client";

// REACT | NEXT
import { useEffect, useState } from "react";

// ICONS
import { Grid3X3, List } from "lucide-react";

// COMPONENTS
import { Pagination } from "@/components/custom/search-results-page/Pagination";
import { MorphingCardListing } from "../property-cards/listing/MorphingCardListing";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// HOOKS
import { useBreakpoint } from "@/hooks/useBreakpoint";

// CONTEXT
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";

export function SearchResults() {
  // CONTEXT
  const { properties, setSingleItem, selectedFilters, pagination } =
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
    <>
      {properties.length > 0 ? (
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

            {/* SORT OPTIONS */}
            <div className="flex items-center gap-3">
              <span className="text-sm">Ordenar por:</span>
              <Select
                defaultValue={selectedFilters.sortOption || "date_desc"}
                onValueChange={(value) => setSingleItem("sortOption", value)}
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

          {/* PAGINATION */}
          <Pagination />
        </div>
      ) : (
        <div> Nenhum imóvel encontrado</div>
      )}
    </>
  );
}
