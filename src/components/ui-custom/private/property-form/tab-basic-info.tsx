"use client";

//Next | React
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import {
  Building2,
  Home,
  Store,
  MapPin,
  DollarSign,
} from "lucide-react";

export default function TabBasicInfo() {
  const [propertyType, setPropertyType] = useState<string>("apartamento");

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      tipo: "apartamento",
      status: "disponivel",
    },
  });

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
                  setValue("tipo", type.value as any);
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
            {...register("titulo")}
            variant={"gray"}
            className="mt-1.5"
          />
          {errors.titulo && (
            <p className="text-sm text-destructive mt-1">
              {errors.titulo.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="descricao">Descrição *</Label>
          <Textarea
            id="descricao"
            placeholder="Descreva o imóvel..."
            {...register("descricao")}
            className="mt-1.5"
            variant={"gray"}
            rows={4}
          />
          {errors.descricao && (
            <p className="text-sm text-destructive mt-1">
              {errors.descricao.message}
            </p>
          )}
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
                {...register("preco")}
                className="pl-10 mt-1.5 h-10 w-full"
              />
            </div>
            {errors.preco && (
              <p className="text-sm text-destructive mt-1">
                {errors.preco.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="finalidade">Finalidade</Label>
            <Select defaultValue="venda">
              <SelectTrigger variant={"gray"} className="mt-1.5 h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponivel">Venda</SelectItem>
                <SelectItem value="reservado">Locação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue="disponivel"
              onValueChange={(value) => setValue("status", value as any)}
            >
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
