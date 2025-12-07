"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "@/lib/schemas/property/property.schema";

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

//Brazilian State
import { brazilianStates } from "@/lib/constants/states/brazilian-states";

interface TabLocationProps {
  form: UseFormReturn<PropertyFormData>;
}

export default function TabLocation({ form }: TabLocationProps) {
  return (
    <TabsContent value="location" className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="street">Endereço</Label>
          <Input
            variant={"gray"}
            id="street"
            placeholder="Digite a rua, avenida, etc..."
            className="mt-1.5"
            {...form.register("address.street")}
          />
        </div>

        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            variant={"gray"}
            id="neighborhood"
            placeholder="Digite seu bairro"
            className="mt-1.5"
            {...form.register("address.neighborhood")}
          />
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            variant={"gray"}
            id="city"
            placeholder="Digite sua cidade"
            className="mt-1.5"
            {...form.register("address.city")}
          />
        </div>

        <div>
          <Label htmlFor="state">Estado</Label>
          <Controller
            name="address.state"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger variant={"gray"} className="mt-1.5 h-10 w-full">
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>

                <SelectContent>
                  {brazilianStates.map((state) => (
                    <SelectItem key={state.uf} value={state.nome}>
                      {state.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label htmlFor="zipCode">CEP</Label>
          <Input
            variant={"gray"}
            id="zipCode"
            placeholder="00000-000"
            className="mt-1.5"
            {...form.register("address.zipCode")}
          />
        </div>
      </div>
    </TabsContent>
  );
}
