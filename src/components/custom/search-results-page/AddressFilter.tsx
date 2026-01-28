"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";
import { useNeighborhoodInput } from "@/hooks/use-neighborhood-input";
import { ChevronUp, Loader2, MapPin, Search, X } from "lucide-react";

export function AddressFilter() {
  const { setSingleItem, draftFilters } = useSearchPropertyContext();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fonte da verdade para o input visual
  const [inputValue, setInputValue] = useState(draftFilters.address ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    setQuery,
    neighborhoods,
    loading: isFetchingApi,
    setNeighborhoods,
  } = useNeighborhoodInput(() => {
    // Não fazemos nada no callback do hook, pois controlaremos o debounce manualmente
    // igual ao SearchFilter para evitar que ele limpe a URL sozinho.
  });

  // SINCRONIZAÇÃO EXTERNA (URL -> INPUT)
  useEffect(() => {
    setInputValue(draftFilters.address ?? "");
    setQuery(draftFilters.address ?? "");
  }, [draftFilters.address, setQuery]);

  // FECHAR AO CLICAR FORA
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

  function handleInputChange(value: string) {
    setInputValue(value);
    setQuery(value); // Atualiza o hook de sugestões
    setIsOpen(value.length >= 1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    // DEBOUNCE MANUAL (IGUAL AO SEARCHFILTER)
    debounceRef.current = setTimeout(() => {
      // SÓ aplica o filtro se o valor mudou de fato para evitar loops
      if (value !== (draftFilters.address ?? "")) {
        setSingleItem("address", value);
      }
    }, 500);
  }

  function handleSelect(name: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setInputValue(name);
    setQuery(name);
    setSingleItem("address", name); // Aplica imediatamente
    setNeighborhoods([]);
    setIsOpen(false);
  }

  function handleClear() {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setInputValue("");
    setQuery("");
    setSingleItem("address", "");
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
          placeholder="Filtrar por rua, bairro..."
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-destructive p-0.5 cursor-pointer mr-1"
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
        <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-lg">
          <div className="p-1">
            <div className="flex justify-between items-center px-2 py-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Sugestões
              </p>
              <button type="button" onClick={() => setIsOpen(false)}>
                <ChevronUp className="size-4" />
              </button>
            </div>
            {neighborhoods.map((n) => (
              <button
                key={n._id}
                type="button"
                onClick={() => handleSelect(n.name)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent text-left transition-colors"
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
