"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  BedDouble,
  SlidersHorizontal,
  Bath,
  Car,
  Pin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";

// PROPERTY DETAILS QTY FILTER
export type DetailsQty = "1" | "2" | "3" | "4" | "5+";

export function PropertyQuickSearchBar() {
  // REDIRECT
  const router = useRouter();

  // FILTER STATES
  const [deliveryStatus, setDeliveryStatus] = useState<"Lançamento" | "Pronto">(
    "Lançamento",
  );
  const [bedrooms, setBedrooms] = useState<DetailsQty | undefined>(undefined);
  const [bathrooms, setBathrooms] = useState<DetailsQty | undefined>(undefined);
  const [parkingSpaces, setParkingSpaces] = useState<DetailsQty | undefined>(
    undefined,
  );

  // HANDLE FILTER SEARCH
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (bathrooms) params.set("bathrooms", bathrooms);
    if (parkingSpaces) params.set("parkingSpaces", parkingSpaces);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative -mt-12 z-20">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl shadow-xl border border-border/30 p-10 md:p-6 ">
          {/* SINGLE ROW LAYOUT */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex bg-muted rounded-lg p-1 shrink-0">
              <button
                onClick={() => setDeliveryStatus("Pronto")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  deliveryStatus === "Lançamento"
                    ? "bg-hero-bg text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pronto
              </button>

              <button
                onClick={() => setDeliveryStatus("Lançamento")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  deliveryStatus === "Pronto"
                    ? "bg-hero-bg text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Lançamento
              </button>
            </div>

            {/* FILTERS */}
            <div className="flex flex-1 flex-col sm:flex-row gap-3">
              {/* LOCATION */}
              <span className="w-full px-2">
                <InputGroup className="rounded-lg">
                  <Input placeholder="Localização" className="border-none" />
                  <InputGroupAddon>
                    <MapPin />
                  </InputGroupAddon>
                </InputGroup>
              </span>

              {/* BEDROOMS */}
              <Select
                value={bedrooms}
                onValueChange={(value) => setBedrooms(value as DetailsQty)}
              >
                <SelectTrigger
                  variant={"gray"}
                  className="w-full sm:w-36 h-10 border-border/50 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2">
                    <BedDouble className="size-4 text-muted-foreground" />
                    <SelectValue placeholder="Quartos" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 quarto</SelectItem>
                  <SelectItem value="2">2 quartos</SelectItem>
                  <SelectItem value="3">3 quartos</SelectItem>
                  <SelectItem value="4">4 quartos</SelectItem>
                  <SelectItem value="5+">5+ quartos</SelectItem>
                </SelectContent>
              </Select>

              {/* BATHROOMS */}
              <Select
                value={bathrooms}
                onValueChange={(value) => setBathrooms(value as DetailsQty)}
              >
                <SelectTrigger
                  variant={"gray"}
                  className="w-full sm:w-36 h-10 bg-background border-border/50 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Banheiros" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 banheiro</SelectItem>
                  <SelectItem value="2">2 banheiros</SelectItem>
                  <SelectItem value="3">3 banheiros</SelectItem>
                  <SelectItem value="4">4 banheiros</SelectItem>
                  <SelectItem value="5+">5+ banheiros</SelectItem>
                </SelectContent>
              </Select>

              {/* PARKING SPACES */}
              <Select
                value={parkingSpaces}
                onValueChange={(value) => setParkingSpaces(value as DetailsQty)}
              >
                <SelectTrigger
                  variant={"gray"}
                  className="w-full sm:w-36 h-10 bg-background border-border/50 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Vagas" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 vaga</SelectItem>
                  <SelectItem value="2">2 vagas</SelectItem>
                  <SelectItem value="3">3 vagas</SelectItem>
                  <SelectItem value="4">4 vagas</SelectItem>
                  <SelectItem value="5+">5+ vagas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <Button
                onClick={handleSearch}
                className="rounded-lg font-medium bg-hero-bg hover:bg-hero-bg-hover"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>

              {/* ADVANCED SEARCH BUTTON */}
              <Button
                variant="outline"
                className="px-4 rounded-lg border-action-primary text-action-primary hover:bg-action-primary hover:text-white font-medium"
                asChild
              >
                <Link href={"/properties"}>
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Mais filtros
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
