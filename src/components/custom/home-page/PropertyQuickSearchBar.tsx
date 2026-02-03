"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  BedDouble,
  SlidersHorizontal,
  Bath,
  Car,
  Building2,
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
import { SearchLocationInput } from "@/components/custom/home-page/SearchLocationInput";

// PROPERTY DETAILS QTY FILTER
export type DetailsQty = "1" | "2" | "3" | "4" | "5+";

export function PropertyQuickSearchBar() {
  // REDIRECT
  const router = useRouter();

  // FILTER STATES
  const [bedrooms, setBedrooms] = useState<DetailsQty | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [bathrooms, setBathrooms] = useState<DetailsQty | undefined>(undefined);
  const [parkingSpaces, setParkingSpaces] = useState<DetailsQty | undefined>(
    undefined,
  );

  // HANDLE FILTER SEARCH
  const handleSearch = () => {
    const params = new URLSearchParams();
    // ADD FILTERS TO SEARCHPARAMS
    if (address) params.set("address", address);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (bathrooms) params.set("bathrooms", bathrooms);
    if (parkingSpaces) params.set("parkingSpaces", parkingSpaces);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative mt-6 lg:-mt-12 z-20 px-2 sm:px-4">
      <div className="container mx-auto xl:px-6">
        <div className="bg-card rounded-2xl shadow-xl border border-border/30 p-4 xl:p-4">
          {/* SINGLE ROW LAYOUT */}
          <div className="flex items-center flex-col xl:flex-row gap-4">
            {/* ICON - Hidden on mobile, visible on lg+ */}
            <div className="hidden xl:flex items-center p-4 bg-hero-bg rounded-full">
              <Building2 className="size-6 text-white" />
            </div>

            <div className="sm:hidden">
              <h1 className="text-text-title text-2xl font-semibold">
                O que está buscando?
              </h1>
            </div>

            {/* FILTERS CONTAINER */}
            <div className="flex-1 w-full">
              <div className="flex flex-col lg:flex-row gap-3 w-full">
                {/* LOCATION INPUT - Full width on mobile, takes priority */}
                <div className="w-full shrink-0 lg:flex-initial">
                  <SearchLocationInput
                    onLocationChange={(val) => setAddress(val)}
                  />
                </div>

                {/* FILTER SELECTS */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full xl:w-auto">
                  {/* BEDROOMS */}
                  <div className="w-full lg:w-48 flex-initial">
                    <Select
                      value={bedrooms}
                      onValueChange={(value) =>
                        setBedrooms(value as DetailsQty)
                      }
                    >
                      <SelectTrigger
                        className="w-full h-10 sm:h-11 border-border/50 rounded-lg text-sm"
                        variant={"gray"}
                      >
                        <div className="flex items-center gap-2">
                          <BedDouble className="size-4 text-text-title" />
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
                  </div>

                  {/* BATHROOMS */}
                  <div className="w-full lg:w-48 flex-initial">
                    <Select
                      value={bathrooms}
                      onValueChange={(value) =>
                        setBathrooms(value as DetailsQty)
                      }
                    >
                      <SelectTrigger
                        className="w-full h-10 sm:h-11 border-border/50 rounded-lg text-sm"
                        variant={"gray"}
                      >
                        <div className="flex items-center gap-2">
                          <Bath className="size-4 text-text-title" />
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
                  </div>

                  {/* PARKING SPACES */}
                  <div className="w-full lg:w-48 flex-initial">
                    <Select
                      value={parkingSpaces}
                      onValueChange={(value) =>
                        setParkingSpaces(value as DetailsQty)
                      }
                    >
                      <SelectTrigger
                        className="w-full h-10 sm:h-11 border-border/50 rounded-lg text-sm"
                        variant={"gray"}
                      >
                        <div className="flex items-center gap-2">
                          <Car className="size-4 text-text-title" />
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
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                onClick={handleSearch}
                className="w-full sm:w-auto h-10 sm:h-11 rounded-lg font-medium bg-hero-bg hover:bg-hero-bg-hover text-sm"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>

              {/* ADVANCED SEARCH BUTTON */}
              <Button
                variant="outline"
                className="w-full sm:w-auto h-10 sm:h-11 px-4 rounded-lg border-action-primary text-action-primary hover:bg-action-primary hover:text-white font-medium text-sm"
                asChild
              >
                <Link href={"/properties"}>
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Mais filtros</span>
                  <span className="sm:hidden">Filtros</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
