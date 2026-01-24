import { Input } from "@/components/ui/input";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";
import { useEffect, useRef, useState } from "react";
import { Loader2, Search, X } from "lucide-react";

export function SearchFilter() {
  const { setSingleItem, selectedFilters } = useSearchPropertyContext();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [inputValue, setInputValue] = useState(selectedFilters.search ?? "");
  const [isSearching, setIsSearching] = useState(false);

  // IF INPUT HAD IT'S VALUE UPDATED OUTSIDE THE COMPONENT, UPDATES IT
  useEffect(() => {
    setInputValue(selectedFilters.search ?? "");
  }, [selectedFilters.search]);

  function handleInputValue(value: string) {
    setInputValue(value); // UPDATES INSTANTANEOSLY
    setIsSearching(true); // FOR SPIN ANIMATION

    // CLEANS TIMEOUT
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // CREATES A NEW TIMEOUT
    debounceRef.current = setTimeout(() => {
      setSingleItem("search", value);
      setIsSearching(false);
    }, 500);
  }

  return (
    <div className="relative w-full">
      <Input
        value={inputValue}
        onChange={(e) => handleInputValue(e.target.value)}
        variant="gray"
        placeholder="Buscar imóveis..."
        className="pr-10"
      />

      {inputValue && (
        <button
          onClick={() => setInputValue("")}
          className="absolute right-7 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer"
        >
          <X className="size-4" />
        </button>
      )}

      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        {isSearching ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Search className="size-4" />
        )}
      </div>
    </div>
  );
}
