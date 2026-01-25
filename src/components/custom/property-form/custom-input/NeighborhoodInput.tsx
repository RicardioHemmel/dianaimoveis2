"use client";

// REACT | NEXT
import { useEffect, useState, useRef } from "react";
// COMPONENTS
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";
// HOOK
import { useNeighborhoodInput } from "@/hooks/use-neighborhood-input";
// ICONS
import { Plus, Loader2, MapPin } from "lucide-react";

export function NeighborhoodInput() {
  const { form } = usePropertyFormContext(); // CONTEXT
  const {
    handleSubmit,
    neighborhoods,
    query,
    setQuery,
    loading, // NEIGHBORHOOD FETCH LOADING
    setNeighborhoods,
  } = useNeighborhoodInput();

  const [isOpen, setIsOpen] = useState(false); // CREATE AND NEIGHBORHOOD LIST DIV
  const [hasExactMatch, setHasExactMatch] = useState(false); // FOR CREATE OPTION DISPLAY
  const [delayedLoading, setDelayedLoading] = useState(false); // ONLY SETS SEARCHING ANIMATION AFTER 1 SEC
  const containerRef = useRef<HTMLDivElement>(null); // FOR BETTER EXPERIENCE ON CLOSING DIV

  // SYNC QUERY WITH FORM VALUE (Prevents losing data when switching tabs)
  useEffect(() => {
    const savedValue = form.getValues("address.neighborhood.name");
    if (savedValue && !query) {
      setQuery(savedValue);
    }
  }, [form, query, setQuery]);

  // WHEN FETCH LOADING CHANGES TO TRUE CREATES A TIMEOUT
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setTimeout(() => {
        setDelayedLoading(true);
      }, 1000);
    } else {
      setDelayedLoading(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  // CLOSES DIV WHEN CLICKING AWAY
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

  // UPDATES MATCH STATE ONLY (Doesn't force isOpen anymore)
  useEffect(() => {
    const match = neighborhoods.some(
      (n) => n.name.toLowerCase() === query.trim().toLowerCase(),
    );
    setHasExactMatch(match);
  }, [query, neighborhoods]);

  // SETS THE SELECTED NEIGHBORHOOD TO PROPETY FORM
  const handleSelect = (neighborhood: { _id: string; name: string }) => {
    form.setValue("address.neighborhood", neighborhood, {
      shouldValidate: true,
    });
    setQuery(neighborhood.name);
    setNeighborhoods([]);
    setIsOpen(false);
  };

  // HANDLES NEIGHBORHOOD CREATION
  const handleCreate = async () => {
    await handleSubmit(form);
    setIsOpen(false);
  };

  // IF KEYBOARD KEY IS "ENTER" CREATES OR INSERTS A NEIGHBORHOOD
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (hasExactMatch) {
        const exactMatch = neighborhoods.find(
          (n) => n.name.toLowerCase() === query.toLowerCase(),
        );
        if (exactMatch) handleSelect(exactMatch);
      } else if (!loading && query.length >= 3) {
        handleCreate();
      }
    }
  };

  return (
    <FormField
      control={form.control}
      name="address.neighborhood"
      render={({ field }) => (
        <FormItem className="relative w-full" ref={containerRef}>
          <FormLabel className="text-sm font-medium">Bairro</FormLabel>

          <div className="relative">
            <FormControl>
              <Input
                {...field}
                value={query}
                onChange={(e) => {
                  field.onChange(e);
                  setQuery(e.target.value);
                  // Abre ao digitar, se houver tamanho mínimo
                  if (e.target.value.length >= 3) setIsOpen(true);
                  else setIsOpen(false);
                }}
                onFocus={() => {
                  // Só abre no foco se houver algo digitado e não for um match perfeito já selecionado
                  if (query.length >= 3 && !hasExactMatch) {
                    setIsOpen(true);
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Digite o bairro"
                variant={"gray"}
                className="mt-1.5"
              />
            </FormControl>

            {delayedLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          <FormMessage />

          {isOpen && (
            <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-lg animate-in fade-in zoom-in-95">
              <div className="p-1">
                {neighborhoods.length > 0 && (
                  <div className={loading ? "opacity-50" : "opacity-100"}>
                    <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Bairros encontrados
                    </p>
                    {neighborhoods.map((n) => (
                      <button
                        key={n._id}
                        type="button"
                        className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => handleSelect(n)}
                      >
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="truncate">{n.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {!hasExactMatch && !loading && query.length >= 3 && (
                  <div
                    className={
                      neighborhoods.length > 0 ? "mt-1 border-t pt-1" : ""
                    }
                  >
                    <div className="p-1 animate-in fade-in duration-200">
                      {neighborhoods.length === 0 && (
                        <p className="px-2 py-2 text-sm text-muted-foreground italic">
                          Nenhum bairro encontrado.
                        </p>
                      )}
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 rounded-sm bg-primary/5 px-2 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-all cursor-pointer border border-primary/10"
                        onClick={handleCreate}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="truncate">Criar bairro "{query}"</span>
                      </button>
                    </div>
                  </div>
                )}

                {delayedLoading && neighborhoods.length === 0 && (
                  <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Buscando...
                  </div>
                )}
              </div>
            </div>
          )}
        </FormItem>
      )}
    />
  );
}
