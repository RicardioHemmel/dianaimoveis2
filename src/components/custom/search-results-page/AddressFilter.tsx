"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";
import { useNeighborhoodInput } from "@/hooks/use-neighborhood-input";
import { ChevronUp, Loader2, MapPin, Search, X } from "lucide-react";

export function AddressFilter() {
  const { setSingleItem, selectedFilters } = useSearchPropertyContext();

  //REF TO CONTROL THE ORIGIN OF THE CHANGE
  //IF TRUE, IT MEANS THE USER CLICKED OR THE VALUE CAME FROM THE URL,
  //THEN WE SHOULDN'T RUN DEBOUNCE AGAIN.
  const skipDebounceRef = useRef(false);

  const {
    setQuery,
    neighborhoods,
    loading: isFetchingApi,
    setNeighborhoods,
  } = useNeighborhoodInput((debouncedValue) => {
    //CALLBACK CHECK
    //IF THE FLAG IS ACTIVE, WE IGNORE THIS DEBOUNCE CYCLE AND RESET THE FLAG.
    if (skipDebounceRef.current) {
      skipDebounceRef.current = false;
      return;
    }

    // MANUAL TYPING BY THE USER, SO APPLY THE FILTER
    setSingleItem("address", debouncedValue);
  });

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(selectedFilters.address ?? "");

  // SYNCS VIA URL/CONTEXT
  useEffect(() => {
    const val = selectedFilters.address ?? "";
    if (val !== inputValue) {
      // WE MARKED IT TO SKIP THE DEBOUNCE AS WE ARE ONLY SYNCING VISUALLY
      skipDebounceRef.current = true;
      setInputValue(val);
      setQuery(val);
    }
  }, [selectedFilters.address]);

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
    // ENSURES THAT THE FLAG IS FALSE, AS THE USER IS TYPING
    skipDebounceRef.current = false;

    setInputValue(value);
    setQuery(value);
    setIsOpen(value.length >= 1);

    if (value.trim() === "") {
      setSingleItem("address", "");
      setIsOpen(false);
    }
  }

  function handleSelect(name: string) {
    //THIS PREVENTS THE SET_QUERY BELOW FROM TRIGGERING A NEW FILTER 500MS FROM NOW
    skipDebounceRef.current = true;

    setInputValue(name);
    setQuery(name); //UPDATE THE HOOK JUST TO MAINTAIN INTERNAL CONSISTENCY

    // APPLY THE FILTER IMMEDIATELY
    setSingleItem("address", name);

    setNeighborhoods([]);
    setIsOpen(false);
  }

  function handleClear() {
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

      {/* SUGESTIONS CONTAINER */}
      {isOpen && neighborhoods.length > 0 && (
        <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-lg animate-in fade-in zoom-in-95">
          <div className="p-1">
            <div className="flex justify-between">
              <p className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Sugestões
              </p>
              <button onClick={() => setIsOpen(false)}>
                <ChevronUp className="size-5 cursor-pointer" />
              </button>
            </div>
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
