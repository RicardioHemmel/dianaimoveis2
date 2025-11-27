"use client";

//Next | React
import { useState } from "react";

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

export default function TabDetails() {
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
              />
            </div>
          </div>
        </>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Checkbox id="mobiliado" />
          <Sofa className="h-5 w-5 text-primary" />
          <Label htmlFor="mobiliado" className="cursor-pointer flex-1">
            Imóvel mobiliado
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Checkbox id="aceitaPet" />
          <PawPrint className="h-5 w-5 text-primary" />
          <Label htmlFor="aceitaPet" className="cursor-pointer flex-1">
            Aceita pets
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Checkbox id="pertoMetro" />
          <Train className="h-5 w-5 text-primary" />
          <Label htmlFor="pertoMetro" className="cursor-pointer flex-1">
            Perto do metrô
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Checkbox id="areaPrice" />
          <BadgeDollarSign className="h-5 w-5 text-primary" />
          <Label htmlFor="areaPrice" className="cursor-pointer flex-1">
            Mostrar preço do <b>m²</b>
          </Label>
        </div>

      </div>
    </TabsContent>
  );
}
