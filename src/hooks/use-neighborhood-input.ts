// REACT | NEXT
import { useEffect, useState } from "react";
// SCHEMAS
import {
  NeighborhoodSchema,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";
import { UseFormReturn } from "react-hook-form";
export function useNeighborhoodInput() {
  const [query, setQuery] = useState("");
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodSchema[]>([]);
  const [loading, setLoading] = useState(false);

  // SEARCH NEIGHBORHOODS
  useEffect(() => {
    if (!query) {
      setNeighborhoods([]);
      return;
    }

    // CONTROLS THE FETCH
    const controller = new AbortController();
    const signal = controller.signal;

    // TIMER FOR DEBOUNCE
    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/address/neighborhood-search?q=${query}`, {
          method: "GET",
          signal: signal,
        });

        if (!res.ok) {
          throw new Error(`Erro na API: ${res.status}`);
        }

        const result = await res.json();

        // CHECKS IF THE COMPONENT IS STILL MOUNTED/ACTIVE BEFORE UPDATING THE STATE
        if (!signal.aborted) {
          setNeighborhoods(result);
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Requisição cancelada (debounce)");
        } else {
          console.error("Erro inesperado:", err);
          setNeighborhoods([]);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    // CLEANUP FUNCTION
    return () => {
      clearTimeout(timer);
      controller.abort(); // CANCELS THE FETCH REQUEST IF IT IS ALREADY IN PROGRESS
    };
  }, [query]);

  // CREATES A NEW NEIGHBORHOOD
  async function handleSubmit(form: UseFormReturn<PropertyInputSchema>) {
    // Evita submissão vazia
    if (!query || query.trim().length === 0) return;

    try {
      const res = await fetch("/api/address/create-neighborhood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Garante que espaços extras não sejam enviados
        body: JSON.stringify({ name: query.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Erro ao criar:", errorData);
        // Aqui você poderia colocar um Toast de erro
        return;
      }

      const newNeighborhood = await res.json();

      // Atualiza o formulário do React Hook Form
      form.setValue("address.neighborhood", {
        _id: newNeighborhood._id,
        name: newNeighborhood.name,
      });

      // Feedback visual: Atualiza a query para o nome oficial retornado (ex: capitalização correta)
      setQuery(newNeighborhood.name);

      // Fecha a lista de sugestões
      setNeighborhoods([]);
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  }
  return {
    query,
    neighborhoods,
    loading,
    setQuery,
    setNeighborhoods,
    handleSubmit,
  };
}
