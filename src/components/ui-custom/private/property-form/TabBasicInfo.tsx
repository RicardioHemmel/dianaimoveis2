"use client";

// Next | React
import { UseFormReturn } from "react-hook-form";

// Types
import { PropertyFormData } from "@/lib/schemas/property/property.schema";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

// Shadcnui components
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

// lucide-react
import { Building2, Home, Store, MapPin, DollarSign } from "lucide-react";

// Masked Input
import { NumericFormat } from "react-number-format";

interface TabBasicInfoProps {
  form: UseFormReturn<PropertyFormData>;
  propertyPurposes?: PropertySelectOption[];
  propertyStatus?: PropertySelectOption[];
}

export default function TabBasicInfo({
  form,
  propertyPurposes,
  propertyStatus,
}: TabBasicInfoProps) {
  // Property Types Definition
  const propertyTypes = [
    { slug: "apartamento", label: "Apartamento", icon: Building2 },
    { slug: "casa", label: "Casa", icon: Home },
    { slug: "comercial", label: "Comercial", icon: Store },
    { slug: "terreno", label: "Terreno", icon: MapPin },
  ];

  return (
    <TabsContent value="basic" className="space-y-6">
      {/* Property Type Selector */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="propertyTypeSlug"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold text-foreground">
                Tipo de Imóvel
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-4 gap-3">
                  {propertyTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = field.value === type.slug;

                    return (
                      <button
                        key={type.slug}
                        type="button"
                        onClick={() => field.onChange(type.slug)}
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
                          {type.label}
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
                <FormLabel htmlFor={field.name}>Preço *</FormLabel>
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

          {/* Purpose */}
          <FormField
            control={form.control}
            name="propertyPurposeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finalidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
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

          {/* Status */}
          <FormField
            control={form.control}
            name="propertyStatusId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
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
