"use client";

import { useState } from "react";
import {
  ChevronDown,
  Home,
  MapPin,
  Bed,
  DollarSign,
  Maximize,
  Sparkles,
  X,
  Building2,
  Car,
  Bath,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([500000, 3000000]);
  const [areaRange, setAreaRange] = useState([30, 200]);
  const [selectedFinalidade, setSelectedFinalidade] = useState<string[]>([]);
  const [selectedTipoImovel, setSelectedTipoImovel] = useState<string[]>([]);
  const [selectedLocalizacao, setSelectedLocalizacao] = useState<string[]>([]);
  const [selectedQuartos, setSelectedQuartos] = useState<string | null>(null);
  const [selectedBanheiros, setSelectedBanheiros] = useState<string | null>(
    null,
  );
  const [selectedVagas, setSelectedVagas] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState<
    string[]
  >([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "busca",
    "imovel",
    "valores",
  ]);

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    }
    return `R$ ${(value / 1000).toFixed(0)}K`;
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
    );
  };

  const toggleFinalidade = (item: string) => {
    setSelectedFinalidade((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const toggleTipoImovel = (item: string) => {
    setSelectedTipoImovel((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const toggleLocalizacao = (item: string) => {
    setSelectedLocalizacao((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const toggleStatus = (item: string) => {
    setSelectedStatus((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const toggleCaracteristicas = (item: string) => {
    setSelectedCaracteristicas((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const clearAllFilters = () => {
    setSelectedFinalidade([]);
    setSelectedTipoImovel([]);
    setSelectedLocalizacao([]);
    setSelectedQuartos(null);
    setSelectedBanheiros(null);
    setSelectedVagas(null);
    setSelectedStatus([]);
    setSelectedCaracteristicas([]);
    setPriceRange([500000, 3000000]);
    setAreaRange([30, 200]);
  };

  const hasActiveFilters =
    selectedFinalidade.length > 0 ||
    selectedTipoImovel.length > 0 ||
    selectedLocalizacao.length > 0 ||
    selectedQuartos !== null ||
    selectedBanheiros !== null ||
    selectedVagas !== null ||
    selectedStatus.length > 0 ||
    selectedCaracteristicas.length > 0;

  const FilterGroup = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedGroups.includes(id);

    return (
      <div className="border-b border-border/30 last:border-b-0">
        <button
          onClick={() => toggleGroup(id)}
          className="flex items-center justify-between w-full py-4 text-left transition-colors hover:text-secondary"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180",
            )}
          />
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isExpanded ? "max-h-[800px] opacity-100 pb-5" : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-5">{children}</div>
        </div>
      </div>
    );
  };

  const FilterItem = ({
    icon: Icon,
    label,
    children,
  }: {
    icon: React.ElementType;
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-secondary" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {children}
    </div>
  );

  const Chip = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
        "border hover:scale-105 active:scale-95",
        selected
          ? "bg-secondary text-secondary-foreground border-secondary shadow-gold"
          : "bg-background border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );

  const NumberChip = ({
    value,
    selected,
    onClick,
  }: {
    value: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "w-10 h-10 rounded-lg text-xs font-semibold transition-all duration-200",
        "border hover:scale-105 active:scale-95 flex items-center justify-center",
        selected
          ? "bg-secondary text-secondary-foreground border-secondary shadow-gold"
          : "bg-background border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground",
      )}
    >
      {value}
    </button>
  );

  return (
    <div className="rounded-2xl border border-border/30 shadow-lg sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="bg-linear-to-r from-hero-bg to-hero-to px-5 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="size-9 rounded-xl bg-action-primary/20 flex items-center justify-center">
              <SlidersHorizontal className="h-4 w-4 text-action-primary" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-primary-foreground">
                Filtros
              </h3>
              <p className="text-primary-foreground/70 text-xs">
                Encontre seu imóvel ideal
              </p>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs text-white rounded-2xl bg-action-primary pl-2 px-3 py-1"
            >
              <X className="size-3" />
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Filters Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {/* Grupo: Busca Principal */}
        <FilterGroup id="busca" title="O que você procura?">
          <FilterItem icon={Home} label="Finalidade">
            <div className="flex flex-wrap gap-2">
              {["Comprar", "Alugar", "Temporada"].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  selected={selectedFinalidade.includes(item)}
                  onClick={() => toggleFinalidade(item)}
                />
              ))}
            </div>
          </FilterItem>

          <FilterItem icon={Building2} label="Tipo de Imóvel">
            <div className="flex flex-wrap gap-2">
              {[
                "Apartamento",
                "Casa",
                "Cobertura",
                "Studio",
                "Terreno",
                "Comercial",
              ].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  selected={selectedTipoImovel.includes(item)}
                  onClick={() => toggleTipoImovel(item)}
                />
              ))}
            </div>
          </FilterItem>

          <FilterItem icon={MapPin} label="Localização">
            <div className="flex flex-wrap gap-2">
              {[
                "Brooklin",
                "Moema",
                "Itaim Bibi",
                "Pinheiros",
                "Vila Olímpia",
                "Santana",
                "Jabaquara",
                "Vila Mariana",
              ].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  selected={selectedLocalizacao.includes(item)}
                  onClick={() => toggleLocalizacao(item)}
                />
              ))}
            </div>
          </FilterItem>
        </FilterGroup>

        {/* Grupo: Características do Imóvel */}
        <FilterGroup id="imovel" title="Características do Imóvel">
          <FilterItem icon={Bed} label="Quartos">
            <div className="flex gap-2">
              {["1", "2", "3", "4", "5+"].map((num) => (
                <NumberChip
                  key={num}
                  value={num}
                  selected={selectedQuartos === num}
                  onClick={() =>
                    setSelectedQuartos(selectedQuartos === num ? null : num)
                  }
                />
              ))}
            </div>
          </FilterItem>

          <FilterItem icon={Bath} label="Banheiros">
            <div className="flex gap-2">
              {["1", "2", "3", "4", "5+"].map((num) => (
                <NumberChip
                  key={num}
                  value={num}
                  selected={selectedBanheiros === num}
                  onClick={() =>
                    setSelectedBanheiros(selectedBanheiros === num ? null : num)
                  }
                />
              ))}
            </div>
          </FilterItem>

          <FilterItem icon={Car} label="Vagas">
            <div className="flex gap-2">
              {["1", "2", "3", "4+"].map((num) => (
                <NumberChip
                  key={num}
                  value={num}
                  selected={selectedVagas === num}
                  onClick={() =>
                    setSelectedVagas(selectedVagas === num ? null : num)
                  }
                />
              ))}
            </div>
          </FilterItem>

          <FilterItem icon={Maximize} label="Área (m²)">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="bg-muted rounded-lg px-2.5 py-1.5">
                  <span className="text-[10px] text-muted-foreground block">
                    Min
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {areaRange[0]}m²
                  </span>
                </div>
                <div className="flex-1 mx-2 border-t border-dashed border-border" />
                <div className="bg-muted rounded-lg px-2.5 py-1.5 text-right">
                  <span className="text-[10px] text-muted-foreground block">
                    Max
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {areaRange[1]}m²
                  </span>
                </div>
              </div>
              <Slider
                value={areaRange}
                onValueChange={setAreaRange}
                min={20}
                max={500}
                step={10}
                className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-2 [&_[role=slider]]:border-secondary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:shadow-lg [&_.relative]:bg-muted [&_.absolute]:bg-secondary"
              />
            </div>
          </FilterItem>
        </FilterGroup>

        {/* Grupo: Valores e Status */}
        <FilterGroup id="valores" title="Valores e Status">
          <FilterItem icon={DollarSign} label="Faixa de Preço">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="bg-muted rounded-lg px-2.5 py-1.5">
                  <span className="text-[10px] text-muted-foreground block">
                    Min
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {formatPrice(priceRange[0])}
                  </span>
                </div>
                <div className="flex-1 mx-2 border-t border-dashed border-border" />
                <div className="bg-muted rounded-lg px-2.5 py-1.5 text-right">
                  <span className="text-[10px] text-muted-foreground block">
                    Max
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {formatPrice(priceRange[1])}
                  </span>
                </div>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={100000}
                max={10000000}
                step={50000}
                className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-2 [&_[role=slider]]:border-secondary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:shadow-lg [&_.relative]:bg-muted [&_.absolute]:bg-secondary"
              />
            </div>
          </FilterItem>

          <FilterItem icon={Calendar} label="Status do Imóvel">
            <div className="flex flex-wrap gap-2">
              {["Pronto", "Em obras", "Lançamento", "Na planta"].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  selected={selectedStatus.includes(item)}
                  onClick={() => toggleStatus(item)}
                />
              ))}
            </div>
          </FilterItem>
        </FilterGroup>

        {/* Grupo: Comodidades */}
        <FilterGroup id="comodidades" title="Comodidades">
          <FilterItem icon={Sparkles} label="Características">
            <div className="flex flex-wrap gap-2">
              {[
                "Piscina",
                "Academia",
                "Churrasqueira",
                "Playground",
                "Salão de festas",
                "Pet friendly",
                "Portaria 24h",
                "Varanda gourmet",
                "Vista panorâmica",
                "Elevador",
              ].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  selected={selectedCaracteristicas.includes(item)}
                  onClick={() => toggleCaracteristicas(item)}
                />
              ))}
            </div>
          </FilterItem>
        </FilterGroup>
      </div>

      {/* Fixed Apply Button */}
      <div className="p-4 bg-gradient-to-t from-card via-card to-transparent border-t border-border/30 flex-shrink-0">
        <Button
          variant="gold"
          className="w-full h-12 rounded-xl font-semibold text-sm shadow-gold hover:shadow-lg transition-all duration-300"
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}
