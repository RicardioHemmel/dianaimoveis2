"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNeighborhoodInput } from "@/hooks/use-neighborhood-input";

interface SearchLocationInputProps {
  onLocationChange?: (value: string) => void;
  defaultValue?: string;
}

export function SearchLocationInput({
  onLocationChange,
  defaultValue,
}: SearchLocationInputProps) {
  const { query, setQuery, neighborhoods, loading, setNeighborhoods } =
    useNeighborhoodInput();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Inicializa com valor se houver (útil para quando volta da página de resultados)
  useEffect(() => {
    if (defaultValue) setQuery(defaultValue);
  }, [defaultValue, setQuery]);

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

  const handleSelect = (name: string) => {
    setQuery(name);
    setNeighborhoods([]);
    setIsOpen(false);
    if (onLocationChange) onLocationChange(name); // Notifica o pai
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative flex items-center">
        <Input
          placeholder="Localização (Bairro)"
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            if (onLocationChange) onLocationChange(val); // Sincroniza enquanto digita
            setIsOpen(val.length >= 1);
          }}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="pr-10 h-10 border-border/50 rounded-lg text-sm bg-background"
        />
        <div className="absolute right-3">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <MapPin className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {isOpen && neighborhoods.length > 0 && (
        <div className="absolute top-full z-60 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg">
          <div className="max-h-[200px] overflow-y-auto p-1">
            {neighborhoods.map((n) => (
              <button
                key={n._id}
                type="button"
                onClick={() => handleSelect(n.name)}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent text-left transition-colors cursor-pointer"
              >
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="truncate">{n.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
