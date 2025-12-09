"use client";

import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "@/lib/schemas/property/property.schema";

// Shadcnui
import { Input } from "@/components/ui/input";
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
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PatternFormat } from "react-number-format";

interface TabLocationProps {
  form: UseFormReturn<PropertyFormData>;
}

export default function TabLocation({ form }: TabLocationProps) {
  return (
    <TabsContent value="location" className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a rua, avenida, etc..."
                    variant="gray"
                    className="mt-1.5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address.neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o bairro"
                  variant="gray"
                  className="mt-1.5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite a cidade"
                  variant="gray"
                  className="mt-1.5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger variant="gray" className="mt-1.5 w-full">
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brazilianStates?.map((state) => (
                    <SelectItem key={state.uf} value={state.nome}>
                      {state.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name={"address.zipCode"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <PatternFormat
                  format="#####-###"
                  valueIsNumericString
                  customInput={Input}
                  placeholder="00000-000"
                  className="mt-1.5"
                  variant={"gray"}
                  onValueChange={(values) => {
                    field.onChange(values.formattedValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
}
