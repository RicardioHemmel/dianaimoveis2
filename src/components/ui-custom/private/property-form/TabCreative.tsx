"use client";

// Shadcnui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

// lucide-react
import { Layers, Images, Youtube } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "@/lib/schemas/property/property.schema";

import FileUploader from "../FileUploader";
import ImageUploader from "../ImageUploader";

interface TabCreativeProps {
  form: UseFormReturn<PropertyFormData>;
}

export default function TabCreative({ form }: TabCreativeProps) {
  return (
    <TabsContent value="creative" className="space-y-6">
      {/* Gallery Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Galeria de Imagens
        </h3>
        <ImageUploader />
      </div>

      {/* Floor Plan Gallery Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Planta Baixa</h3>
        <ImageUploader />
      </div>

      {/* Technical Specifications Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Ficha Técnica</h3>
        <div className="flex">
          <FileUploader />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Vídeo do YouTube
        </h3>
        <div>
          <Label htmlFor="videoYoutube">URL do Vídeo</Label>
          <div className="relative mt-1.5">
            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="videoYoutube"
              placeholder="https://youtube.com/watch?v=..."
              className="pl-10"
              {...form.register("youtubeURL")}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Cole o link completo do vídeo do YouTube
          </p>
        </div>
      </div>
    </TabsContent>
  );
}
