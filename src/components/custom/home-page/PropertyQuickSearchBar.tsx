"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, BedDouble, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PropertyQuickSearchBar() {
  const router = useRouter();
  const [operationType, setOperationType] = useState<string>("comprar");
  const [location, setLocation] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (operationType) params.set("operacao", operationType);
    if (location) params.set("localizacao", location);
    if (bedrooms) params.set("quartos", bedrooms);

    router.push(`/busca?${params.toString()}`);
  };

  return (
    <section className="relative -mt-12 z-20 pb-6">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-xl border border-border/30 p-5 md:p-6">
          {/* Single row layout */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Operation Type Toggle */}
            <div className="flex bg-muted rounded-lg p-1 shrink-0">
              <button
                onClick={() => setOperationType("comprar")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  operationType === "comprar"
                    ? "bg-hero-bg text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Comprar
              </button>
              <button
                onClick={() => setOperationType("alugar")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  operationType === "alugar"
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Alugar
              </button>
            </div>

            {/* FILTERS */}
            <div className="flex flex-1 flex-col sm:flex-row gap-3">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="flex-1 h-10 bg-background border-border/50 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Localização" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="zona-sul">Zona Sul</SelectItem>
                  <SelectItem value="zona-norte">Zona Norte</SelectItem>
                  <SelectItem value="zona-oeste">Zona Oeste</SelectItem>
                  <SelectItem value="zona-leste">Zona Leste</SelectItem>
                  <SelectItem value="litoral">Litoral</SelectItem>
                </SelectContent>
              </Select>

              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="w-full sm:w-36 h-10 bg-background border-border/50 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Quartos" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 quarto</SelectItem>
                  <SelectItem value="2">2 quartos</SelectItem>
                  <SelectItem value="3">3 quartos</SelectItem>
                  <SelectItem value="4">4 quartos</SelectItem>
                  <SelectItem value="5">5+ quartos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <Button
                onClick={handleSearch}
                className="rounded-lg font-medium bg-hero-bg"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/busca")}
                className="px-4 rounded-lg border-action-primary text-action-primary hover:bg-action-primary hover:text-white font-medium"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Mais filtros
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
