"use client";

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

import { Controller, UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "@/lib/schemas/property/property.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NumericFormat } from "react-number-format";

interface TabSpecificProps {
  form: UseFormReturn<PropertyFormData>;
  propertyStandings?: PropertySelectOption[];
  propertyTypologies?: PropertySelectOption[];
}

export default function TabSpecific({
  form,
  propertyStandings,
  propertyTypologies,
}: TabSpecificProps) {
  const { propertyTypeSlug } = form.watch();

  return (
    <TabsContent value="specific" className="space-y-4">
      {propertyTypeSlug === "apartamento" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Características do Apartamento
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name={"floorStart"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Andar Inicial</FormLabel>
                  <FormControl>
                    <NumericFormat
                      customInput={Input}
                      placeholder="Ex: 5"
                      className="mt-1.5"
                      variant={"gray"}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={"floorEnd"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Andar Final</FormLabel>
                  <FormControl>
                    <NumericFormat
                      customInput={Input}
                      placeholder="Ex: 10"
                      className="mt-1.5"
                      variant={"gray"}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Property Standing */}
            <FormField
              control={form.control}
              name="propertyStandingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Porte</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger variant="gray" className="mt-1.5 w-full">
                        <SelectValue placeholder="Selecione um porte" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyStandings?.map((standing) => (
                        <SelectItem key={standing._id} value={standing._id}>
                          {standing.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Property Typology */}
            <FormField
              control={form.control}
              name="propertyTypologyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipologia</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger variant="gray" className="mt-1.5 w-full">
                        <SelectValue placeholder="Selecione uma tipologia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyStandings?.map((standing) => (
                        <SelectItem key={standing._id} value={standing._id}>
                          {standing.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}

      {propertyTypeSlug === "terreno" && (
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
