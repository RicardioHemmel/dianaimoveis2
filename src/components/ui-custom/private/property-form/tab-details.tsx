"use client";

//Next | React
import { useState } from "react";
import { useForm } from "react-hook-form";

// Form control
import {
  propertySchema,
  PropertyFormData,
} from "@/lib/schemas/property/property.schema";

// Shadcnui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TabsContent } from "@/components/ui/tabs";

// lucide-react
import {
  Ruler,
  Bed,
  Bath,
  Car,
  PawPrint,
  Sofa,
  Train,
  BedDouble,
  BadgeDollarSign,
} from "lucide-react";

export default function TabDetails() {
  const [propertyType, setPropertyType] = useState<string>("apartamento");

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    defaultValues: {
      propertyType: "apartamento",
      status: "disponivel",
    },
  });

  return (
    <TabsContent value="details" className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="area">Área (m²) *</Label>
          <div className="relative mt-1.5">
            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              variant={"gray"}
              id="area"
              placeholder="0"
              {...register("area")}
              className="pl-10"
            />
          </div>
          {errors.area && (
            <p className="text-sm text-destructive mt-1">
              {errors.area.message}
            </p>
          )}
        </div>

        {propertyType !== "terreno" && (
          <>
            <div>
              <Label htmlFor="quartos">Quartos</Label>
              <div className="relative mt-1.5">
                <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  variant={"gray"}
                  id="quartos"
                  placeholder="0"
                  {...register("roomsQty")}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="banheiros">Banheiros</Label>
              <div className="relative mt-1.5">
                <Bath className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  variant={"gray"}
                  id="banheiros"
                  placeholder="0"
                  {...register("bathroomsQty")}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="vagas">Vagas</Label>
              <div className="relative mt-1.5">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  variant={"gray"}
                  id="vagas"
                  placeholder="0"
                  {...register("parkingSpacesQty")}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="suites">Suítes</Label>
              <div className="relative mt-1.5">
                <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  variant={"gray"}
                  id="suites"
                  placeholder="0"
                  {...register("suites")}
                  className="pl-10"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Checkbox
            id="mobiliado"
            onCheckedChange={(checked) =>
              setValue("isFurnished", checked as boolean)
            }
          />
          <Sofa className="h-5 w-5 text-primary" />
          <Label htmlFor="mobiliado" className="cursor-pointer flex-1">
            Imóvel mobiliado
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Checkbox
            id="aceitaPet"
            onCheckedChange={(checked) =>
              setValue("isPetFriendly", checked as boolean)
            }
          />
          <PawPrint className="h-5 w-5 text-primary" />
          <Label htmlFor="aceitaPet" className="cursor-pointer flex-1">
            Aceita pets
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Checkbox
            id="pertoMetro"
            onCheckedChange={(checked) =>
              setValue("pertoMetro" as any, checked as boolean)
            }
          />
          <Train className="h-5 w-5 text-primary" />
          <Label htmlFor="pertoMetro" className="cursor-pointer flex-1">
            Perto do metrô
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
          <Checkbox
            id="areaPrice"
            onCheckedChange={(checked) =>
              setValue("areaPrice" as any, checked as boolean)
            }
          />
          <BadgeDollarSign className="h-5 w-5 text-primary" />
          <Label htmlFor="areaPrice" className="cursor-pointer flex-1">
            Mostrar preço do <b>m²</b>
          </Label>
        </div>
      </div>
    </TabsContent>
  );
}
