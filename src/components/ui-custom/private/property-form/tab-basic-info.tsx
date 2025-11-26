"use client";

//Next | React
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

// Form control
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertySchema,
  PropertyFormData,
} from "@/lib/schemas/property/property.schema";

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
import { TabsContent } from "@/components/ui/tabs";

// lucide-react
import { Building2, Home, Store, MapPin, DollarSign } from "lucide-react";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

interface TabBasicInfoProps {
  form: UseFormReturn<PropertyFormData>;
  propertyPurposes?: PropertySelectOption[];
}

export default function TabBasicInfo({
  form,
  propertyPurposes,
}: TabBasicInfoProps) {
  const [propertyType, setPropertyType] = useState<string>("apartamento");

  const propertyTypes = [
    { value: "apartamento", label: "Apartamento", icon: Building2 },
    { value: "casa", label: "Casa", icon: Home },
    { value: "comercial", label: "Comercial", icon: Store },
    { value: "terreno", label: "Terreno", icon: MapPin },
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
                key={type.value}
                type="button"
                onClick={() => {
                  setPropertyType(type.value);
                }}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  propertyType === type.value
                    ? "border-[var(--soft-primary-custom)] bg-gradient-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Icon
                  className={`h-6 w-6 mx-auto mb-1 ${
                    propertyType === type.value
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    propertyType === type.value
                      ? "text-white"
                      : "text-foreground"
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
          <Label htmlFor="titulo">Título *</Label>
          <Input
            id="titulo"
            placeholder="Ex: Apartamento Luxo Vista Mar"
            variant={"gray"}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="descricao">Descrição *</Label>
          <Textarea
            id="descricao"
            placeholder="Descreva o imóvel..."
            className="mt-1.5"
            variant={"gray"}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div>
            <Label htmlFor="preco">Preço *</Label>
            <div className="relative mt-1.5">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="preco"
                variant={"gray"}
                placeholder="R$ 0,00"
                className="pl-10 mt-1.5 h-10 w-full"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="finalidade">Finalidade</Label>
            <Select>
              <SelectTrigger variant="gray" className="mt-1.5 h-10 w-full">
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
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="disponivel">
              <SelectTrigger variant={"gray"} className="mt-1.5 h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponivel">Disponível</SelectItem>
                <SelectItem value="reservado">Reservado</SelectItem>
                <SelectItem value="vendido">Vendido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
