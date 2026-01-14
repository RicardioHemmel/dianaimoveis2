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
import { HandCoins, MapPin } from "lucide-react";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

import { NumericFormat } from "react-number-format";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

export default function TabSpecific() {
  const { form, propertyDetails } = usePropertyFormContext();
  const propertyType = form.getValues("propertyType");
  const propertyStandings = propertyDetails?.standings;
  const propertyTypologies = propertyDetails?.typologies;

  return (
    <TabsContent value="specific" className="space-y-4">
      {propertyType?.name === "Apartamento" && (
        <>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Informações Gerais
            </h3>

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
            <FormField
              control={form.control}
              name="constructionCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Construtora</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a construtora do empreendimento"
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Características do Apartamento
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* PROPERTY STANDING */}
              <FormField
                control={form.control}
                name="propertyStanding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Porte</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
        </>
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
