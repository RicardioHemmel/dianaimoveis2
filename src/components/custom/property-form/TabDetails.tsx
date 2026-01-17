"use client";

// COMPONENTS
import { TabsContent } from "@/components/ui/tabs";
import { RangeFilter } from "@/components/custom/RangeFilter";
import { ToggleInput } from "@/components/custom/ToggleInput";

// ICONS
import {
  Ruler,
  Bed,
  Bath,
  Car,
  PawPrint,
  Sofa,
  Train,
  BedDouble,
  BadgeDollarSign,
  HandCoins,
  Building,
} from "lucide-react";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

export default function TabDetails() {
  const { form } = usePropertyFormContext();
  return (
    <TabsContent value="details" className="space-y-4">
      <div className="grid grid-cols-2 gap-6">
        {/* AREA */}
        <RangeFilter
          form={form}
          Icon={Ruler}
          name="area"
          title="Área (m²)"
          color="blue"
        />

        {/* BEDROOMS */}
        <RangeFilter
          form={form}
          Icon={Bed}
          name="bedrooms"
          title="Quartos"
          color="purple"
        />

        {/* BATHROOMS */}
        <RangeFilter
          form={form}
          Icon={Bath}
          name="bathrooms"
          title="Banheiros"
          color="cyan"
        />

        {/* PARKING SPACES */}
        <RangeFilter
          form={form}
          Icon={Car}
          name="parkingSpaces"
          title="Vagas"
          color="amber"
        />

        {/* SUITES */}
        <RangeFilter
          form={form}
          Icon={BedDouble}
          name="suites"
          title="Suítes"
          color="emerald"
        />

        <RangeFilter
          form={form}
          Icon={Building}
          name="floors"
          title="Andares"
          color="indigo"
        />
      </div>

      {/* Opções com Toggle de Visibilidade */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Opções do Imóvel
        </h3>
        <p className="text-sm text-muted-foreground">
          Marque a opção e ative a chave para exibir no imóvel final
        </p>

        <div className="grid grid-cols-1 gap-3">
          {/* IS FURNISHED */}
          <ToggleInput
            name="isFurnished"
            form={form}
            label="Imóvel mobiliado"
            Icon={Sofa}
          />
          {/* IS PET FRIENDLY */}
          <ToggleInput
            name="isPetFriendly"
            form={form}
            label="Aceita Pets"
            Icon={PawPrint}
          />
          {/* IS NEAR SUBWAY */}
          <ToggleInput
            name="isNearSubway"
            form={form}
            label="Perto do Metrô"
            Icon={Train}
          />
        </div>
      </div>
    </TabsContent>
  );
}
