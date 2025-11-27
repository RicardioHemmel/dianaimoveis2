"use client";

//Next | React
import { useState, useEffect } from "react";

// Shadcnui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// lucide-react
import { MapPin } from "lucide-react";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

interface TabSpecificProps {
  propertyStandings?: PropertySelectOption[];
  propertyTypologies?: PropertySelectOption[];
}

export default function TabSpecific({
  propertyStandings,
  propertyTypologies,
}: TabSpecificProps) {
  const [propertyType, setPropertyType] = useState<string>("apartamento");

  return (
    <TabsContent value="specific" className="space-y-4">
      {propertyType === "apartamento" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Características do Apartamento
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="andarInicial">Andar Inicial</Label>
              <Input
                variant={"gray"}
                id="andarInicial"
                placeholder="Ex: 5"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="andarFinal">Andar Final</Label>
              <Input
                variant={"gray"}
                id="andarFinal"
                placeholder="Ex: 6"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="standings">Porte do Imóvel</Label>
              <Select>
                <SelectTrigger
                  id="standings"
                  variant={"gray"}
                  className="mt-1.5 h-10 w-full"
                >
                  <SelectValue placeholder="Selecione uma finalidade" />
                </SelectTrigger>

                <SelectContent>
                  {propertyStandings?.map((standing) => (
                    <SelectItem key={standing._id} value={standing._id}>
                      {standing.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="typologies">Tipologia</Label>
              <Select>
                <SelectTrigger
                  id="typologies"
                  variant={"gray"}
                  className="mt-1.5 h-10 w-full"
                >
                  <SelectValue placeholder="Selecione uma finalidade" />
                </SelectTrigger>

                <SelectContent>
                  {propertyTypologies?.map((tipology) => (
                    <SelectItem key={tipology._id} value={tipology._id}>
                      {tipology.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {propertyType === "terreno" && (
        <div className="text-center py-12 text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Não há características específicas para terrenos.</p>
          <p className="text-sm mt-1">
            Use a aba "Detalhes" para adicionar área e outras informações.
          </p>
        </div>
      )}
    </TabsContent>
  );
}
