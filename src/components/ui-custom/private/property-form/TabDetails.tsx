"use client";

// Shadcnui
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TabsContent } from "@/components/ui/tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { NumericFormat } from "react-number-format";

interface TabDetailsProps {
  form: UseFormReturn<PropertyFormData>;
}

export default function TabDetails({ form }: TabDetailsProps) {
  return (
    <TabsContent value="details" className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Área</FormLabel>
              <FormControl>
                <div className="relative mt-1.5">
                  <InputGroup>
                    <NumericFormat
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      customInput={InputGroupInput}
                      thousandSeparator="."
                      decimalSeparator=","
                      fixedDecimalScale
                      allowNegative={false}
                      placeholder="0"
                      onValueChange={(values) => {
                        field.onChange(values.floatValue);
                      }}
                    />
                    <InputGroupAddon>
                      <Ruler className="h-4 w-4" />
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <>
          <FormField
            control={form.control}
            name="bedroomsQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Quartos</FormLabel>
                <FormControl>
                  <div className="relative mt-1.5">
                    <InputGroup>
                      <NumericFormat
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        customInput={InputGroupInput}
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="0"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue);
                        }}
                      />
                      <InputGroupAddon>
                        <Bed className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathbedroomsQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Banheiros</FormLabel>
                <FormControl>
                  <div className="relative mt-1.5">
                    <InputGroup>
                      <NumericFormat
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        customInput={InputGroupInput}
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="0"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue);
                        }}
                      />
                      <InputGroupAddon>
                        <Bath className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parkingSpacesQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Vagas</FormLabel>
                <FormControl>
                  <div className="relative mt-1.5">
                    <InputGroup>
                      <NumericFormat
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        customInput={InputGroupInput}
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="0"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue);
                        }}
                      />
                      <InputGroupAddon>
                        <Car className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="suitesQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Suítes</FormLabel>
                <FormControl>
                  <div className="relative mt-1.5">
                    <InputGroup>
                      <NumericFormat
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        customInput={InputGroupInput}
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="0"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue);
                        }}
                      />
                      <InputGroupAddon>
                        <BedDouble className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condominiumFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Condomínio</FormLabel>
                <FormControl>
                  <div className="relative mt-1.5">
                    <InputGroup>
                      <NumericFormat
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        customInput={InputGroupInput}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        fixedDecimalScale
                        allowNegative={false}
                        decimalScale={2}
                        placeholder="R$ 0,00"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue);
                        }}
                      />
                      <InputGroupAddon>
                        <HandCoins className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        <FormField
          control={form.control}
          name="isFurnished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <Sofa className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer text-base">
                  Imóvel mobiliado
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPetFriendly"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <PawPrint className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer text-base">
                  Aceita Pets
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isNearSubway"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1 "
                />
              </FormControl>
              <Train className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer text-base">
                  Perto do Metrô
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="showSquareMeterPrice"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50 cursor-pointer">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <BadgeDollarSign className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer text-base">
                  Mostrar preço do M²
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
}
