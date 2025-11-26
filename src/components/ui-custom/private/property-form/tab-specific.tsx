"use client";

//Next | React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Form control
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertySchema,
  PropertyFormData,
} from "@/lib/schemas/property/property.schema";

// Shadcnui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

// lucide-react
import { Building2, Home, Store, MapPin } from "lucide-react";

export default function TabSpecific() {
  const [propertyType, setPropertyType] = useState<string>("apartamento");

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      tipo: "apartamento",
      status: "disponivel",
    },
  });

  return (
    <TabsContent value="specific" className="space-y-4">
      {propertyType === "apartamento" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Características do Apartamento
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="andarInicial">Andar</Label>
              <Input
                variant={"gray"}
                id="andarInicial"
                placeholder="Ex: 5"
                {...register("andarInicial")}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="andarFinal">Andar Final (Duplex/Triplex)</Label>
              <Input
                variant={"gray"}
                id="andarFinal"
                placeholder="Ex: 6"
                {...register("andarFinal")}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="totalAndares">Total de Andares</Label>
              <Input
                variant={"gray"}
                id="totalAndares"
                placeholder="Ex: 20"
                {...register("totalAndares")}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="unidadesAndar">Unidades por Andar</Label>
              <Input
                variant={"gray"}
                id="unidadesAndar"
                placeholder="Ex: 4"
                {...register("unidadesAndar")}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
      )}

      {propertyType === "casa" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Características da Casa
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="terreno">Área do Terreno (m²)</Label>
              <Input
                variant={"gray"}
                id="terreno"
                placeholder="Ex: 500"
                {...register("terreno")}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="quintal">Área do Quintal (m²)</Label>
              <Input
                variant={"gray"}
                id="quintal"
                placeholder="Ex: 200"
                {...register("quintal")}
                className="mt-1.5"
              />
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

      {propertyType === "comercial" && (
        <div className="text-center py-12 text-muted-foreground">
          <Store className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Não há características específicas para imóveis comerciais.</p>
          <p className="text-sm mt-1">
            Use as outras abas para adicionar informações relevantes.
          </p>
        </div>
      )}
    </TabsContent>
  );
}
