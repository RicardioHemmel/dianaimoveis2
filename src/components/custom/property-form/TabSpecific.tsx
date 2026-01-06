"use client";

// COMPONENTS
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// ICONS
import { MapPin } from "lucide-react";

// SCHEMAS
import { PropertyDetail } from "@/lib/schemas/property/property.schema";
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";

import { UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface TabSpecificProps {
  form: UseFormReturn<PropertyInputSchema>;
  propertyStandings?: PropertyDetail[];
  propertyTypologies?: PropertyDetail[];
}

export default function TabSpecific({
  form,
  propertyStandings,
  propertyTypologies,
}: TabSpecificProps) {

  const { propertyType } = form.watch();

  return (
    <TabsContent value="specific" className="space-y-4">
      {propertyType?.name === "Apartamento" && (
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
                      value={field.value}
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
                      value={field.value}
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

            {/* PROPERTY STANDING */}
            <FormField
              control={form.control}
              name="propertyStanding"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Porte</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    value={field.value ?? undefined}
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

            {/* PROPERTY TYPOLOGY */}
            <FormField
              control={form.control}
              name="propertyTypology"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipologia</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    value={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger variant="gray" className="mt-1.5 w-full">
                        <SelectValue placeholder="Selecione uma tipologia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyTypologies?.map((typology) => (
                        <SelectItem key={typology._id} value={typology._id}>
                          {typology.name}
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

      {propertyType?.name === "Terreno" && (
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
