"use client";

//Next | React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Form control
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertySchema,
  PropertyFormData,
} from "@/lib/schemas/property/property.schema";

// Lists
import { amenitiesList } from "@/lib/constants/properties/amenities-list";

// Shadcnui
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// lucide-react
import {
  Building2,
  Home,
  Store,
  MapPin,
  DollarSign,
  Ruler,
  Bed,
  Bath,
  Car,
  Sparkles,
  FileText,
  Info,
  TreePalm,
  SearchIcon,
  Upload,
  X,
  Youtube,
  PawPrint,
  Sofa,
  Train,
  ImageUp,
} from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { isDragging } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const DRAFT_STORAGE_KEY = "property_draft";

const CadastroImovel = () => {
  const [propertyType, setPropertyType] = useState<string>("apartamento");
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

  // Watch all form values for auto-save
  const formValues = watch();

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        Object.keys(draft).forEach((key) => {
          setValue(key as any, draft[key]);
        });
        if (draft.tipo) setPropertyType(draft.tipo);
        if (draft.amenities) setSelectedAmenities(draft.amenities);
      } catch (e) {
        console.error("Error loading draft:", e);
      }
    }
  }, [setValue]);

  // Auto-save draft every 3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const draft = {
        ...formValues,
        amenities: selectedAmenities,
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [formValues, selectedAmenities]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const onSubmit = (data: PropertyFormData) => {
    console.log({ ...data, lazeres: selectedAmenities });
    toast("Imóvel cadastrado com sucesso! 🎉");
    // Clear draft after successful submission
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    window.location.reload();
  };

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

  const propertyTypes = [
    { value: "apartamento", label: "Apartamento", icon: Building2 },
    { value: "casa", label: "Casa", icon: Home },
    { value: "comercial", label: "Comercial", icon: Store },
    { value: "terreno", label: "Terreno", icon: MapPin },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Cadastrar Imóvel
          </h2>
          <p className="text-muted-foreground mt-1">
            Preencha as informações abaixo
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6 shadow-card">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6 gap-3 mb-12">
              <TabsTrigger value="basic">
                <FileText className="h-4 w-4 mr-2" />
                Básico
              </TabsTrigger>
              <TabsTrigger value="location">
                <MapPin className="h-4 w-4 mr-2" />
                Localização
              </TabsTrigger>
              <TabsTrigger value="details">
                <Info className="h-4 w-4 mr-2" />
                Detalhes
              </TabsTrigger>
              <TabsTrigger value="specific">
                <Building2 className="h-4 w-4 mr-2" />
                Específico
              </TabsTrigger>
              <TabsTrigger value="amenities">
                <TreePalm className="h-4 w-4 mr-2" />
                Comodidades
              </TabsTrigger>
              <TabsTrigger value="creative">
                <ImageUp className="h-4 w-4 mr-2" />
                Criativo
              </TabsTrigger>
            </TabsList>

            {/* Informações Básicas */}
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
                      <SelectTrigger
                        variant={"gray"}
                        className="mt-1.5 h-10 w-full"
                      >
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
                      onValueChange={(value) =>
                        setValue("status", value as any)
                      }
                    >
                      <SelectTrigger
                        variant={"gray"}
                        className="mt-1.5 h-10 w-full"
                      >
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

            {/* Localização */}
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

            {/* Detalhes */}
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
                          {...register("quartos")}
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
                          {...register("banheiros")}
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
                          {...register("vagas")}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="iptu">IPTU (anual)</Label>
                  <Input
                    variant={"gray"}
                    id="iptu"
                    placeholder="R$ 0,00"
                    {...register("iptu")}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="condominio">Condomínio (mensal)</Label>
                  <Input
                    variant={"gray"}
                    id="condominio"
                    placeholder="R$ 0,00"
                    {...register("condominio")}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary/50 transition-colors bg-gray-50">
                  <Checkbox
                    id="mobiliado"
                    onCheckedChange={(checked) =>
                      setValue("mobiliado", checked as boolean)
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
                      setValue("aceitaPet", checked as boolean)
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
              </div>
            </TabsContent>

            {/* Características Específicas */}
            <TabsContent value="specific" className="space-y-4">
              {propertyType === "apartamento" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Características do Apartamento
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="andarInicial">Andar</Label>
                      <Input
                        variant={"gray"}
                        id="andarInicial"
                        placeholder="Ex: 5"
                        {...register("andarInicial")}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="andarFinal">
                        Andar Final (Duplex/Triplex)
                      </Label>
                      <Input
                        variant={"gray"}
                        id="andarFinal"
                        placeholder="Ex: 6"
                        {...register("andarFinal")}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="totalAndares">Total de Andares</Label>
                      <Input
                        variant={"gray"}
                        id="totalAndares"
                        placeholder="Ex: 20"
                        {...register("totalAndares")}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="unidadesAndar">Unidades por Andar</Label>
                      <Input
                        variant={"gray"}
                        id="unidadesAndar"
                        placeholder="Ex: 4"
                        {...register("unidadesAndar")}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {propertyType === "casa" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Características da Casa
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="terreno">Área do Terreno (m²)</Label>
                      <Input
                        variant={"gray"}
                        id="terreno"
                        placeholder="Ex: 500"
                        {...register("terreno")}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="quintal">Área do Quintal (m²)</Label>
                      <Input
                        variant={"gray"}
                        id="quintal"
                        placeholder="Ex: 200"
                        {...register("quintal")}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {propertyType === "terreno" && (
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Não há características específicas para terrenos.</p>
                  <p className="text-sm mt-1">
                    Use a aba "Detalhes" para adicionar área e outras
                    informações.
                  </p>
                </div>
              )}

              {propertyType === "comercial" && (
                <div className="text-center py-12 text-muted-foreground">
                  <Store className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>
                    Não há características específicas para imóveis comerciais.
                  </p>
                  <p className="text-sm mt-1">
                    Use as outras abas para adicionar informações relevantes.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Lazeres e Comodidades */}
            <TabsContent value="amenities" className="space-y-4">
              {propertyType === "apartamento" || propertyType === "casa" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 items-center my-5">
                    <h3 className="text-lg font-semibold text-foreground">
                      Selecione as Comodidades
                    </h3>
                    <Button variant={"outline"}>Limpar</Button>
                    <InputGroup>
                      <InputGroupInput placeholder="Buscar comodidade..." />
                      <InputGroupAddon>
                        <SearchIcon className="h-4 w-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {amenitiesList.map((amenity) => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all cursor-pointer ${
                          selectedAmenities.includes(amenity)
                            ? "border-[var(--bg-selected)] bg-selected-btn text-primary-foreground"
                            : "border-border hover:border-primary/50 text-foreground"
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>
                    Comodidades disponíveis apenas para apartamentos e casas.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Creative */}
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
                    onClick={() =>
                      document.getElementById("coverImageInput")?.click()
                    }
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
                  onClick={() =>
                    document.getElementById("galleryInput")?.click()
                  }
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
          </Tabs>

          {/* Botões de Ação */}
          <div className="flex gap-3 justify-end mt-6 pt-6 border-t">
            <Button
              type="submit"
              className="bg-gradient-primary shadow-premium hover:shadow-card transition-shadow"
            >
              Cadastrar Imóvel
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default CadastroImovel;
