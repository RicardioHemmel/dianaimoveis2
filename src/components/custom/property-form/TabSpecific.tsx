"use client";

// COMPONENTS
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NumericFormat } from "react-number-format";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

// ICONS
import {
  Check,
  HandCoins,
  MapPin,
  Sparkles,
  Layers,
  Maximize,
  Expand,
  Sprout,
  ArrowUp,
  Minimize2,
  Star,
  Building2,
  LucideIcon,
  Home,
  Building,
  Castle,
  CircleSlash2,
} from "lucide-react";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

import { cn } from "@/lib/utils";
import { useWatch } from "react-hook-form";
import { PropertyStandingsListSchema } from "@/lib/constants/properties/property-standings";

export default function TabSpecific() {
  const { form, propertyDetails } = usePropertyFormContext();
  const propertyStandings = propertyDetails?.standings;
  const propertyTypologies = propertyDetails?.typologies;

  // CURRENT FORM VALUES
  const propertyType = useWatch({
    control: form.control,
    name: "propertyType",
  });
  const currentStanding = useWatch({
    control: form.control,
    name: "propertyStanding",
  });
  const currentTypologies = useWatch({
    control: form.control,
    name: "propertyTypologies",
  });

  // PROPERTY TYPOLOGIES ICONS
  const propertyStandingIcons: Record<PropertyStandingsListSchema, LucideIcon> =
    {
      Popular: Home,
      "Médio Padrão": Building,
      "Alto Padrão": Building2,
      "Altíssimo Padrão": Castle,
    };

  const mappedPropertyStandings = propertyStandings?.map((standing) => ({
    ...standing,
    icon:
      propertyStandingIcons[standing.name as PropertyStandingsListSchema] ??
      CircleSlash2,
  }));

  // UPDATES SELECTED STANDING O RHF
  const handleStandingChange = (standingId: string) => {
    form.setValue("propertyStanding", standingId);
  };

  // UPDATES TYPOLOGIES LIST ON RHF
  const toggleTypology = (typologyId: string) => {
    // AMENITIES REGISTERED ON THE RHF
    const currentTypologies = form.getValues("propertyTypologies");

    if (!currentTypologies) return;

    const updatedTypologies = currentTypologies?.includes(typologyId)
      ? currentTypologies.filter((t) => t !== typologyId)
      : [...currentTypologies, typologyId];

    form.setValue("propertyTypologies", updatedTypologies);
  };

  return (
    <TabsContent value="specific" className="space-y-4">
      {propertyType?.name === "Apartamento" && (
        <>
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-admin-primary-hover" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Informações Gerais
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* CONDOMINIUM FEE */}
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

              {/* CONSTRUCTION COMPANY */}
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
          </div>

          <div className="flex flex-col gap-y-10 mt-10">
            {/* PROPERTY STANDING */}
            <div>
              {/* STANDING HEADING */}
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 rounded-lg bg-amber-500/10">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Porte do Imóvel
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Selecione o padrão do empreendimento
                  </p>
                </div>
              </div>

              {/* STANDING LIST */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mappedPropertyStandings &&
                  mappedPropertyStandings.map((standing) => {
                    const isSelected = currentStanding === standing._id;
                    const IconComponent = standing.icon;
                    return (
                      <button
                        key={standing._id}
                        type="button"
                        onClick={() => handleStandingChange(standing._id)}
                        className={cn(
                          "relative p-4 rounded-xl border-2 transition-all duration-200 text-left group cursor-pointer min-h-28",
                          isSelected
                            ? "border-admin-primary bg-admin-primary/5 shadow-md"
                            : "hover:border-admin-primary/50 hover:bg-admin-primary/10"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 p-1 rounded-full bg-admin-primary">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <span className="mb-2 ">
                          <IconComponent className="size-5" />
                        </span>
                        <p
                          className={cn(
                            "font-medium text-sm",
                            isSelected ? "text-primary" : "text-foreground"
                          )}
                        >
                          {standing.name}
                        </p>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* PROPERTY TYPOLOGIES */}
            <div>
              {/* TYPOLOGIES HEADING */}
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <Layers className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Tipologias
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Selecione uma ou mais tipologias disponíveis
                  </p>
                </div>
              </div>

              {/* TYPOLOGIES LIST */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {propertyTypologies &&
                  propertyTypologies?.map((typology) => {
                    const isSelected = currentTypologies.includes(typology._id);
                    return (
                      <button
                        key={typology._id}
                        type="button"
                        onClick={() => toggleTypology(typology._id)}
                        className={cn(
                          "relative p-4 rounded-xl border-2 transition-all duration-200 text-center group",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 p-1 rounded-full bg-primary">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                        <span className="text-2xl mb-2 block">
                          {"icone vem aqui"}
                        </span>
                        <p
                          className={cn(
                            "font-medium text-sm",
                            isSelected ? "text-primary" : "text-foreground"
                          )}
                        >
                          {typology.name}
                        </p>
                      </button>
                    );
                  })}

                {currentTypologies?.length > 0 && (
                  <div className="flex items-center gap-2 pt-2">
                    <Badge className="bg-primary/10 text-primary">
                      {`${currentTypologies.length} ${currentTypologies?.length > 1 ? "selecionadas" : "selecionada"}`}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => form.setValue("propertyTypologies", [])}
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                    >
                      Limpar seleção
                    </button>
                  </div>
                )}
              </div>
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
