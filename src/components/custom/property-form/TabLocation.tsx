"use client";

// REACT | NEXT
import { useState, useRef } from "react";

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
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PatternFormat } from "react-number-format";

//BRAZILIAN STATE
import { brazilianStates } from "@/lib/constants/states/brazilian-states";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

// ICONS
import { Plus, MapPin, X, Navigation } from "lucide-react";

export default function TabLocation() {
  const { form } = usePropertyFormContext();
  const referencePoints = form.watch("address.referencePoint");
  const referenceInputRef = useRef<HTMLInputElement | null>(null);
  const [canAdd, setCanAdd] = useState(false);

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
          name="address.stateUf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger variant="gray" className="mt-1.5 w-full">
                    <SelectValue placeholder="Selecione um estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brazilianStates?.map((state) => (
                    <SelectItem key={state.uf} value={state.uf}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"address.zipCode"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <PatternFormat
                  format="#####-###"
                  value={field.value}
                  valueIsNumericString
                  customInput={Input}
                  placeholder="00000-000"
                  className="mt-1.5"
                  variant={"gray"}
                  onValueChange={(values) => {
                    field.onChange(values.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-2 mt-4">
        <FormField
          control={form.control}
          name={"address.referencePoint"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adicione Pontos de Referência</FormLabel>
              <FormControl>
                <div className="flex gap-2 mb-3">
                  <InputGroup>
                    <Input
                      className="border-0"
                      placeholder="Ex: Próximo ao Shopping, Perto da praia..."
                      ref={referenceInputRef}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();

                          const value =
                            referenceInputRef.current?.value?.trim();
                          if (value) {
                            const current =
                              form.getValues("address.referencePoint") ?? [];
                            form.setValue("address.referencePoint", [
                              ...current,
                              value,
                            ]);

                            if (referenceInputRef.current)
                              referenceInputRef.current.value = "";
                            setCanAdd(false);
                          }
                        }
                      }}
                      onInput={(e) => {
                        const value = (e.target as HTMLInputElement).value;
                        setCanAdd(!!value.trim());
                      }}
                    />
                    <Button
                      type="button"
                      variant={"outline"}
                      className={`${canAdd && "animate-infinity-glow"}`}
                      disabled={!canAdd}
                      onClick={() => {
                        const value = referenceInputRef.current?.value?.trim();
                        if (!value) return;

                        const current = field.value ?? [];

                        form.setValue("address.referencePoint", [
                          ...current,
                          value,
                        ]);

                        // CLEANS INPUT WITHOUT RE-RENDER
                        if (referenceInputRef.current)
                          referenceInputRef.current.value = "";

                        setCanAdd(false);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>

                    <InputGroupAddon>
                      <Navigation className="h-4 w-4" />
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {referencePoints && referencePoints?.length > 0 && (
          <ul>
            {referencePoints.map((rp, i) => (
              <div
                className="flex items-center mt-3 border-2 border-black/10 rounded-2xl p-3 bg-admin-primary/10 relative"
                key={i}
              >
                <MapPin className="size-4 me-3 text-admin-primary" />
                <li>{rp}</li>
                <button
                  type="button"
                  className="absolute right-3 cursor-pointer"
                  onClick={() => {
                    const currentPoints =
                      form.getValues("address.referencePoint") || [];

                    const updatedPoints = currentPoints.filter(
                      (_, index) => index !== i
                    );

                    form.setValue("address.referencePoint", updatedPoints, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </TabsContent>
  );
}
