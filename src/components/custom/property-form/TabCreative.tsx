"use client";

// COMPONENTS
import { TabsContent } from "@/components/ui/tabs";
import FileUploader from "../FileUploader";
import ImageUploader from "../ImageUploader";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

// ICONS
import { Youtube, Images, Layers } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";

interface TabCreativeProps {
  form: UseFormReturn<PropertyInputSchema>;
}

export default function TabCreative({ form }: TabCreativeProps) {
  return (
    <TabsContent value="creative" className="space-y-6">
      {/* GALLERY INPUT */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Galeria de Imagens
        </h3>
        <ImageUploader Icon={Images} fileInputId="galleryInput" form={form} />
      </div>

      {/* FLOOR PLAN GALLERY INPUT */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Planta Baixa</h3>
        <ImageUploader Icon={Layers} fileInputId="floorPlanGalleryInput" form={form} />
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

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>URL do Vídeo</FormLabel>
              <FormControl>
                <div className="relative mt-1.5">
                  <InputGroup>
                    <InputGroupInput
                      placeholder="https://youtube.com/watch?v=..."
                      {...field}
                    />
                    <InputGroupAddon>
                      <Youtube className="h-4 w-4" />
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Cole o link completo do vídeo do YouTube
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
}
