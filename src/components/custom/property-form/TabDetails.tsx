"use client";

// COMPONENTS
import { Checkbox } from "@/components/ui/checkbox";
import { TabsContent } from "@/components/ui/tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { NumericFormat } from "react-number-format";
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
        <RangeFilter form={form} Icon={Ruler} name="area" title="Área (m²)" />

        {/* BEDROOMS */}
        <RangeFilter form={form} Icon={Bed} name="bedrooms" title="Quartos" />

        {/* BATHROOMS */}
        <RangeFilter
          form={form}
          Icon={Bath}
          name="bathrooms"
          title="Banheiros"
        />

        {/* PARKING SPACES */}
        <RangeFilter
          form={form}
          Icon={Car}
          name="parkingSpaces"
          title="Vagas"
        />

        {/* SUITES */}
        <RangeFilter
          form={form}
          Icon={BedDouble}
          name="suites"
          title="Suítes"
        />

        <RangeFilter
          form={form}
          Icon={Building}
          name="floors"
          title="Andares"
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
