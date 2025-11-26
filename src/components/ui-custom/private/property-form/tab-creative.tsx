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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

// lucide-react
import { Upload, X, Youtube } from "lucide-react";

const DRAFT_STORAGE_KEY = "property_draft";

export default function TabCreative() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      tipo: "apartamento",
      status: "disponivel",
    },
  });

  const handleCoverImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    addGalleryImages(files);
  };

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addGalleryImages(files);
  };

  const addGalleryImages = (files: File[]) => {
    setGalleryImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <TabsContent value="creative" className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Imagem de Capa
        </h3>
        <div className="space-y-3">
          <input
            type="file"
            id="coverImageInput"
            accept="image/*"
            onChange={handleCoverImageSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("coverImageInput")?.click()}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Escolher Imagem de Capa
          </Button>

          {coverImagePreview && (
            <div className="relative rounded-lg overflow-hidden border-2 border-border">
              <img
                src={coverImagePreview}
                alt="Preview da capa"
                className="w-full h-48 object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  setCoverImage(null);
                  setCoverImagePreview("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Galeria de Imagens
        </h3>
        <div
          onDrop={handleGalleryDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("galleryInput")?.click()}
          className={`border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
          }`}
        >
          <input
            type="file"
            id="galleryInput"
            accept="image/*"
            multiple
            onChange={handleGallerySelect}
            className="hidden"
          />
          <div className="text-center">
            <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground mb-1">
              Clique ou arraste imagens aqui
            </p>
            <p className="text-xs text-muted-foreground">
              Suporta múltiplas imagens
            </p>
          </div>
        </div>

        {galleryPreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {galleryPreviews.map((preview, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden border-2 border-border group"
              >
                <img
                  src={preview}
                  alt={`Galeria ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeGalleryImage(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
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
              {...register("videoYoutube" as any)}
              className="pl-10"
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
