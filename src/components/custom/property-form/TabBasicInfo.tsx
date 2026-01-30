"use client";

// COMPONENTS
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { TabsContent } from "@/components/ui/tabs";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { NumericFormat } from "react-number-format"; // MASKED INPUT

// ICONS
import {
  Building2,
  Home,
  Store,
  MapPin,
  DollarSign,
  LucideIcon,
  X,
  CircleSlash2,
} from "lucide-react";

// SCHEMA
import { PropertyTypesListSchema } from "@/lib/constants/properties/property-types";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

export default function TabBasicInfo() {
  const { form, propertyDetails } = usePropertyFormContext();
  const propertyTypes = propertyDetails?.types;
  const propertyPurposes = propertyDetails?.purposes;

  // PROPERTY TYPES ICONS
  const propertyTypeIcons: Record<PropertyTypesListSchema, LucideIcon> = {
    Apartamento: Building2,
    Casa: Home,
    Comercial: Store,
    Terreno: MapPin,
  };

  const mappedPropertyTypes = propertyTypes?.map((type) => ({
    ...type,
    icon:
      propertyTypeIcons[type.name as PropertyTypesListSchema] ?? CircleSlash2,
  }));

  return (
    <TabsContent value="basic" className="space-y-6">
      {/* Property Type Selector */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold text-foreground">
                Tipo de Imóvel
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-4 gap-3">
                  {mappedPropertyTypes?.map((type) => {
                    const Icon = type.icon;
                    const isSelected = field.value?._id === type._id;

                    return (
                      <button
                        key={type._id}
                        type="button"
                        onClick={() => field.onChange(type)}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer flex flex-col items-center justify-center bg-gray-50 ${
                          isSelected
                            ? "border-[var(--soft-primary-custom)] bg-[image:var(--gradient-primary)]"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 mb-1 ${
                            isSelected ? "text-white" : "text-muted-foreground"
                          }`}
                        />
                        <p
                          className={`text-sm font-medium ${
                            isSelected ? "text-white" : "text-foreground"
                          }`}
                        >
                          {type.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Apartamento Luxo Vista Mar"
                  variant="gray"
                  className="mt-1.5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o imóvel..."
                  className="mt-1.5"
                  variant="gray"
                  rows={4}
                  maxLength={1000}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grid for Price, Purpose, Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Preço</FormLabel>
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
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="R$ 0,00"
                        onValueChange={(values) => {
                          field.onChange(values.floatValue);
                        }}
                      />
                      <InputGroupAddon>
                        <DollarSign className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PURPOSE */}
          <FormField
            control={form.control}
            name="propertyPurpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finalidade</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger variant="gray" className="mt-1.5 w-full">
                      <SelectValue placeholder="Selecione uma finalidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyPurposes?.map((purpose) => (
                      <SelectItem key={purpose._id} value={purpose._id}>
                        {purpose.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Entrega</FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      type="date"
                      min="1900-01-01"
                      max="3000-12-31"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="mt-1.5"
                      variant="gray"
                    />

                    {field.value && (
                      <button
                        type="button"
                        onClick={() => field.onChange(undefined)}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="size-5" />
                      </button>
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </TabsContent>
  );
}
