"use client";

// Shadcnui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";


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
            className="mt-1.5"
          />
        
        </div>

        <div>
          <Label htmlFor="bairro">Bairro *</Label>
          <Input
            variant={"gray"}
            id="bairro"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="cidade">Cidade *</Label>
          <Input
            variant={"gray"}
            id="cidade"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="estado">Estado *</Label>
          <Input
            variant={"gray"}
            id="estado"
            maxLength={2}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="cep">CEP *</Label>
          <Input
            variant={"gray"}
            id="cep"
            placeholder="00000-000"
            className="mt-1.5"
          />
        </div>
      </div>
    </TabsContent>
  );
}
