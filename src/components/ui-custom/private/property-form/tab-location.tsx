"use client";

//Next | React
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
import { TabsContent } from "@/components/ui/tabs";

const {
  register,
  formState: { errors },
} = useForm<PropertyFormData>({
  resolver: zodResolver(propertySchema),
  defaultValues: {
    tipo: "apartamento",
    status: "disponivel",
  },
});

export default function TabLocation() {
  return (
    <TabsContent value="location" className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="endereco">Endereço *</Label>
          <Input
            variant={"gray"}
            id="endereco"
            placeholder="Rua, Avenida, número"
            {...register("endereco")}
            className="mt-1.5"
          />
          {errors.endereco && (
            <p className="text-sm text-destructive mt-1">
              {errors.endereco.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="bairro">Bairro *</Label>
          <Input
            variant={"gray"}
            id="bairro"
            {...register("bairro")}
            className="mt-1.5"
          />
          {errors.bairro && (
            <p className="text-sm text-destructive mt-1">
              {errors.bairro.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="cidade">Cidade *</Label>
          <Input
            variant={"gray"}
            id="cidade"
            {...register("cidade")}
            className="mt-1.5"
          />
          {errors.cidade && (
            <p className="text-sm text-destructive mt-1">
              {errors.cidade.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="estado">Estado *</Label>
          <Input
            variant={"gray"}
            id="estado"
            maxLength={2}
            {...register("estado")}
            className="mt-1.5"
          />
          {errors.estado && (
            <p className="text-sm text-destructive mt-1">
              {errors.estado.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="cep">CEP *</Label>
          <Input
            variant={"gray"}
            id="cep"
            placeholder="00000-000"
            {...register("cep")}
            className="mt-1.5"
          />
          {errors.cep && (
            <p className="text-sm text-destructive mt-1">
              {errors.cep.message}
            </p>
          )}
        </div>
      </div>
    </TabsContent>
  );
}
