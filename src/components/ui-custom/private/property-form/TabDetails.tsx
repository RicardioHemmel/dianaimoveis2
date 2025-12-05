"use client";

// Shadcnui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TabsContent } from "@/components/ui/tabs";

// lucide-react
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
} from "lucide-react";

import { Controller, UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "@/lib/schemas/property/property.schema";

interface TabDetailsProps {
  form: UseFormReturn<PropertyFormData>;
}

export default function TabDetails({ form }: TabDetailsProps) {
  return (
    <TabsContent value="details" className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="area">Área (m²)</Label>
          <div className="relative mt-1.5">
            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              variant={"gray"}
              id="area"
              placeholder="0"
              className="pl-10"
              {...form.register("area")}
            />
          </div>
        </div>

        <>
          <div>
            <Label htmlFor="bedroomsQty">Quartos</Label>
            <div className="relative mt-1.5">
              <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                variant={"gray"}
                id="bedroomsQty"
                placeholder="0"
                className="pl-10"
                {...form.register("roomsQty")}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bathroomsQty">Banheiros</Label>
            <div className="relative mt-1.5">
              <Bath className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                variant={"gray"}
                id="bathroomsQty"
                placeholder="0"
                className="pl-10"
                {...form.register("bathroomsQty")}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="parkingSpacesQty">Vagas</Label>
            <div className="relative mt-1.5">
              <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                variant={"gray"}
                id="parkingSpacesQty"
                placeholder="0"
                className="pl-10"
                {...form.register("parkingSpacesQty")}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="suitesQty">Suítes</Label>
            <div className="relative mt-1.5">
              <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                variant={"gray"}
                id="suitesQty"
                placeholder="0"
                className="pl-10"
                {...form.register("suitesQty")}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="condominiumFee">Valor do Condomínio</Label>
            <div className="relative mt-1.5">
              <HandCoins className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                variant={"gray"}
                id="condominiumFee"
                placeholder="R$ 0,00"
                className="pl-10"
                {...form.register("condominiumFee")}
              />
            </div>
          </div>
        </>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Controller
            name="isFurnished"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="isFurnished"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Sofa className="h-5 w-5 text-primary" />
          <Label htmlFor="isFurnished" className="cursor-pointer flex-1">
            Imóvel mobiliado
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Controller
            name="isPetFriendly"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="isPetFriendly"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <PawPrint className="h-5 w-5 text-primary" />
          <Label htmlFor="isPetFriendly" className="cursor-pointer flex-1">
            Aceita pets
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Controller
            name="isNearSubway"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="isNearSubway"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Train className="h-5 w-5 text-primary" />
          <Label htmlFor="isNearSubway" className="cursor-pointer flex-1">
            Perto do metrô
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Controller
            name="showSquareMeterPrice"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="showSquareMeterPrice"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <BadgeDollarSign className="h-5 w-5 text-primary" />
          <Label
            htmlFor="showSquareMeterPrice"
            className="cursor-pointer flex-1"
          >
            Mostrar preço do M²
          </Label>
        </div>
      </div>
    </TabsContent>
  );
}
