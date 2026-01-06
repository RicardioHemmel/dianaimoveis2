"use client";

// Next | React
import { UseFormReturn } from "react-hook-form";

// SCHEMAS
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";
import { PropertyDetail } from "@/lib/schemas/property/property.schema";

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
} from "lucide-react";

interface TabBasicInfoProps {
  form: UseFormReturn<PropertyInputSchema>;
  propertyTypes?: PropertyDetail[];
  propertyPurposes?: PropertyDetail[];
  propertyStatus?: PropertyDetail[];
}

export default function TabBasicInfo({
  form,
  propertyTypes,
  propertyPurposes,
  propertyStatus,
}: TabBasicInfoProps) {
  // List possible icons for property types
  const propertyTypeIcons: Record<string, LucideIcon> = {
    Apartamento: Building2,
    Casa: Home,
    Comercial: Store,
    Terreno: MapPin,
  } as const;

  const mappedPropertyTypes = propertyTypes?.map((type) => ({
    ...type,
    icon: propertyTypeIcons[type.name] ?? Building2,
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grid for Price, Purpose, Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  value={field.value ?? undefined}
                >
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

          {/* STATUS */}
          <FormField
            control={form.control}
            name="propertyStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger variant="gray" className="mt-1.5 w-full">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyStatus?.map((status) => (
                      <SelectItem key={status._id} value={status._id}>
                        {status.name}
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
    </TabsContent>
  );
}
