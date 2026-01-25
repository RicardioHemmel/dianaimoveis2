// REACT | NEXT
import { useEffect, useState } from "react";

// COMPONENTS
import { Input } from "@/components/ui/input";

// SCHEMAS
import { NeighborhoodSchema } from "@/lib/schemas/property/property.schema";

// ACTIONS
import { searchNeighborhoods } from "@/lib/server-actions/neighborhood/search-neighborhoods.action";
import { createNeighborhood } from "@/lib/services/address/address.service";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export function NeighborhoodInput() {
  const { form } = usePropertyFormContext();
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<NeighborhoodSchema[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setOptions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/address/neighborhood-search?q=${query}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        console.error("Erro ao buscar bairros", res.status);
        setOptions([]);
        setLoading(false);
        return;
      }

      const text = await res.text();

      if (!text) {
        setOptions([]);
        setLoading(false);
        return;
      }

      const result = JSON.parse(text);
      setOptions(result);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <FormField
      control={form.control}
      name="address.neighborhood"
      render={() => (
        <FormItem className="relative">
          <FormLabel>Bairro</FormLabel>

          {/* Input visual (autocomplete) */}
          <FormControl>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite o bairro"
              variant="gray"
              className="mt-1.5"
            />
          </FormControl>

          {/* Lista de sugestões */}
          {options.length > 0 && (
            <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow">
              {options.map((n) => (
                <div
                  key={n._id}
                  className="cursor-pointer px-3 py-2 hover:bg-muted"
                  onClick={() => {
                    form.setValue("address.neighborhood", {
                      _id: n._id,
                      name: n.name,
                    });

                    setQuery(n.name);
                    setOptions([]);
                  }}
                >
                  {n.name}
                </div>
              ))}
            </div>
          )}

          {/* Criar novo bairro */}
          {query && options.length === 0 && !loading && (
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-dashed p-2 text-sm text-muted-foreground hover:bg-muted"
              onClick={async () => {
                const res = await fetch("/api/address/create-neighborhood", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: query }),
                });
                const newNeighborhood = await res.json();

                form.setValue("address.neighborhood", {
                  _id: newNeighborhood._id,
                  name: newNeighborhood.name,
                });

                setQuery(newNeighborhood.name);
                setOptions([]);
              }}
            >
              Criar bairro “{query}”
            </button>
          )}
        </FormItem>
      )}
    />
  );
}
