"use client";

// REACT | NEXT
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { usePropertyFormContext } from "@/context/PropertyFormContext";
import { useNeighborhoodInput } from "@/hooks/use-neighborhood-input";
import { Plus, Loader2, MapPin } from "lucide-react";

export function NeighborhoodInput() {
  const { form } = usePropertyFormContext();
  const {
    handleSubmit,
    neighborhoods,
    query,
    setQuery,
    loading, // Loading real vindo do hook
    setNeighborhoods,
  } = useNeighborhoodInput();

  const [isOpen, setIsOpen] = useState(false);
  const [delayedLoading, setDelayedLoading] = useState(false); // Novo estado para o feedback visual
  const containerRef = useRef<HTMLDivElement>(null);

  // LOGICA PARA EVITAR PISCAGEM: Só mostra loading se passar de 1s
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      // Se começou a carregar, espera 1s para ativar o visual de loading
      timer = setTimeout(() => {
        setDelayedLoading(true);
      }, 1000);
    } else {
      // Se parou de carregar, remove o visual imediatamente
      setDelayedLoading(false);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  // Fecha a lista ao clicar fora
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

  useEffect(() => {
    setIsOpen(query.length > 2);
  }, [query]);

  const handleSelect = (n: { _id: string; name: string }) => {
    form.setValue("address.neighborhood", { _id: n._id, name: n.name });
    setQuery(n.name);
    setNeighborhoods([]);
    setIsOpen(false);
  };

  const handleCreate = async () => {
    await handleSubmit(form);
    setIsOpen(false);
  };

  return (
    <FormItem className="relative w-full" ref={containerRef}>
      <FormLabel className="text-sm font-medium">Bairro</FormLabel>

      <div className="relative">
        <FormControl>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 2 && setIsOpen(true)}
            placeholder="Digite o bairro"
            variant={"gray"}
            className="mt-1.5 pr-10"
          />
        </FormControl>

        {/* Ícone usa o delayedLoading para não piscar no input */}
        {delayedLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-lg animate-in fade-in zoom-in-95">
          <div className="p-1">
            {neighborhoods.length > 0 ? (
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
            ) : (
              // Só mostra "Criar" ou "Nenhum" se o loading REAL parou
              !loading &&
              query.length > 2 && (
                <div className="p-1 animate-in fade-in duration-200">
                  <p className="px-2 py-2 text-sm text-muted-foreground italic">
                    Nenhum bairro encontrado.
                  </p>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-sm bg-primary/5 px-2 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-all cursor-pointer border border-primary/10"
                    onClick={handleCreate}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="truncate">Criar bairro "{query}"</span>
                  </button>
                </div>
              )
            )}

            {/* Texto de busca só aparece após 1s de espera */}
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
  );
}
