import { useEffect, useState } from "react";
// SCHEMAS
import {
  NeighborhoodSchema,
  PropertyInputSchema,
} from "@/lib/schemas/property/property.schema";
import { UseFormReturn } from "react-hook-form";

export function useNeighborhoodInput(
  onDebounceTrigger?: (value: string) => void,
) {
  const [query, setQuery] = useState("");
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodSchema[]>([]);
  const [loading, setLoading] = useState(false);

  // SEARCH NEIGHBORHOODS
  useEffect(() => {
    //IF THE QUERY IS EMPTY, CLEAR EVERYTHING AND TELL THE GLOBAL FILTER TO CLEAR IT TOO
    if (!query) {
      setNeighborhoods([]);
      if (onDebounceTrigger) onDebounceTrigger("");
      return;
    }

    // CONTROLS THE FETCH
    const controller = new AbortController();
    const signal = controller.signal;

    // TIMER FOR DEBOUNCE 0.5s
    const timer = setTimeout(async () => {
      // TRIGGERS GLOBAL SEARCH (CONTEXT) AFTER TIMEOUT
      if (onDebounceTrigger) {
        onDebounceTrigger(query);
      }

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
        } else {
          console.error(err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }, 500);

    // CLEANUP FUNCTION
    return () => {
      clearTimeout(timer);
      controller.abort(); // CANCELS THE FETCH REQUEST
    };
  }, [query]);

  // CREATES A NEW NEIGHBORHOOD
  async function handleSubmit(form: UseFormReturn<PropertyInputSchema>) {
    if (!query || query.trim().length === 0) return;

    try {
      const res = await fetch("/api/address/create-neighborhood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: query.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Erro ao criar:", errorData);
        return;
      }

      const newNeighborhood = await res.json();

      form.setValue("address.neighborhood", {
        _id: newNeighborhood._id,
        name: newNeighborhood.name,
      });

      setQuery(newNeighborhood.name);
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
