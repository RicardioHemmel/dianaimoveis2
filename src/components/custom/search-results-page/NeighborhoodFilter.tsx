"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";
import { useNeighborhoodInput } from "@/hooks/use-neighborhood-input";
import { Loader2, MapPin, Search, X } from "lucide-react";

export function NeighborhoodFilter() {
  const { setSingleItem, selectedFilters } = useSearchPropertyContext();
  const {
    setQuery,
    neighborhoods,
    loading: isFetchingApi,
    setNeighborhoods,
  } = useNeighborhoodInput();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState(
    selectedFilters.neighborhood ?? "",
  );

  useEffect(() => {
    const val = selectedFilters.neighborhood ?? "";
    setInputValue(val);
    setQuery(val);
  }, [selectedFilters.neighborhood, setQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lógica de digitação
  function handleInputChange(value: string) {
    setInputValue(value);
    setQuery(value);
    setIsOpen(value.length >= 1);

    // CONDIÇÃO: Se o usuário apagar tudo manualmente, limpa o filtro global/URL
    if (value.trim() === "") {
      setSingleItem("neighborhood", "");
      setIsOpen(false);
    }
  }

  // Lógica de seleção (Dispara o filtro na URL/Contexto)
  function handleSelect(name: string) {
    setInputValue(name);
    setQuery(name);

    // Atualiza o contexto imediatamente ao selecionar
    setSingleItem("neighborhood", name);

    setNeighborhoods([]);
    setIsOpen(false);
  }

  // Lógica do botão X (Limpa o filtro global/URL)
  function handleClear() {
    setInputValue("");
    setQuery("");
    setSingleItem("neighborhood", ""); // Limpa a URL/Contexto
    setNeighborhoods([]);
    setIsOpen(false);
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative flex items-center">
        <Input
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() =>
            inputValue.length >= 1 &&
            neighborhoods.length > 0 &&
            setIsOpen(true)
          }
          variant="gray"
          placeholder="Filtrar por bairro..."
          className="pr-10"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-destructive transition-colors p-0.5 cursor-pointer mr-1"
            >
              <X className="size-3.5" />
            </button>
          )}

          {isFetchingApi ? (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          ) : (
            <MapPin className="size-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {isOpen && neighborhoods.length > 0 && (
        <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-lg animate-in fade-in zoom-in-95">
          <div className="p-1">
            <p className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Bairros sugeridos
            </p>
            {neighborhoods.map((n) => (
              <button
                key={n._id}
                type="button"
                onClick={() => handleSelect(n.name)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent text-left transition-colors cursor-pointer"
              >
                <Search className="size-3.5 text-muted-foreground" />
                <span className="truncate">{n.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
