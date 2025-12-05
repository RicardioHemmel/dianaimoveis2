"use client";

//Next | React
import { Controller, UseFormReturn } from "react-hook-form";

// Types
import { PropertyFormData } from "@/lib/schemas/property/property.schema";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

// Shadcnui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

// lucide-react
import { Building2, Home, Store, MapPin, DollarSign } from "lucide-react";

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
  // Default value set o UsePropertyCreateForm hook as "apartamento"
  const selectedType = form.watch("propertyType");

  // _id gotta be the same from DB
  const propertyTypes = [
    { _id: "apartamento", label: "Apartamento", icon: Building2 },
    { _id: "casa", label: "Casa", icon: Home },
    { _id: "comercial", label: "Comercial", icon: Store },
    { _id: "terreno", label: "Terreno", icon: MapPin },
  ];

  return (
    <TabsContent value="basic" className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Tipo de Imóvel
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type._id}
                type="button"
                onClick={() => {
                  form.setValue("propertyType", type._id);
                }}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedType === type._id
                    ? "border-[var(--soft-primary-custom)] bg-[image:var(--gradient-primary)]"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Icon
                  className={`h-6 w-6 mx-auto mb-1 ${
                    selectedType === type._id
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    selectedType === type._id ? "text-white" : "text-foreground"
                  }`}
                >
                  {type.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            placeholder="Ex: Apartamento Luxo Vista Mar"
            variant={"gray"}
            {...form.register("title")}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição *</Label>
          <Textarea
            id="description"
            placeholder="Descreva o imóvel..."
            className="mt-1.5"
            variant={"gray"}
            {...form.register("description")}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div>
            <Label htmlFor="price">Preço *</Label>
            <div className="relative mt-1.5">
              <InputGroup>
                <InputGroupInput
                  id="price"
                  placeholder="R$ 0,00"
                  {...form.register("price")}
                />
                <InputGroupAddon>
                  <DollarSign />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          <div>
            <Label htmlFor="propertyPurpose">Finalidade</Label>
            <Controller
              control={form.control}
              name="propertyPurpose"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="propertyPurpose"
                    variant="gray"
                    className="mt-1.5 h-10 w-full"
                  >
                    <SelectValue placeholder="Selecione uma finalidade" />
                  </SelectTrigger>

                  <SelectContent>
                    {propertyPurposes?.map((purpose) => (
                      <SelectItem key={purpose._id} value={purpose._id}>
                        {purpose.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="propertyStatus">Status</Label>
            <Controller
              control={form.control}
              name="propertyStatus"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="propertyStatus"
                    variant={"gray"}
                    className="mt-1.5 h-10 w-full"
                  >
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyStatus?.map((status) => (
                      <SelectItem key={status._id} value={status._id}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
