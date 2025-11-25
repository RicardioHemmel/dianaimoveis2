"use client";

//Next | React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
  Save,
  FileText,
  Info,
  TreePalm,
  SearchIcon,
} from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

const propertySchema = z.object({
  // Informações Básicas
  tipo: z.enum(["apartamento", "casa", "comercial", "terreno"]),
  titulo: z.string().min(5, "Título deve ter no mínimo 5 caracteres"),
  descricao: z.string().min(20, "Descrição deve ter no mínimo 20 caracteres"),

  // Localização
  endereco: z.string().min(5, "Endereço é obrigatório"),
  bairro: z.string().min(3, "Bairro é obrigatório"),
  cidade: z.string().min(3, "Cidade é obrigatória"),
  estado: z.string().min(2, "Estado é obrigatório"),
  cep: z.string().min(8, "CEP é obrigatório"),

  // Valores
  preco: z.string().min(1, "Preço é obrigatório"),
  iptu: z.string().optional(),
  condominio: z.string().optional(),

  // Características Gerais
  area: z.string().min(1, "Área é obrigatória"),
  quartos: z.string().optional(),
  banheiros: z.string().optional(),
  vagas: z.string().optional(),

  // Específico para Apartamento
  andarInicial: z.string().optional(),
  andarFinal: z.string().optional(),
  totalAndares: z.string().optional(),
  unidadesAndar: z.string().optional(),

  // Específico para Casa
  terreno: z.string().optional(),
  quintal: z.string().optional(),

  // Status e Opções
  status: z.enum(["disponivel", "reservado", "vendido"]),
  mobiliado: z.boolean().optional(),
  aceitaPet: z.boolean().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const DRAFT_STORAGE_KEY = "property_draft";

const CadastroImovel = () => {
  const [propertyType, setPropertyType] = useState<string>("apartamento");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

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
        toast.success("Rascunho carregado! 📝");
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

  const amenitiesList = [
    "Academia",
    "Bar/Lounge",
    "Bicicletário",
    "Brinquedoteca",
    "Campo de Futebol",
    "Cat Place",
    "Churrasqueira",
    "Cinema",
    "Copa de Funcionários",
    "Coworking",
    "Crossfit",
    "Deck Molhado",
    "Elevador",
    "Escada Fitness",
    "Espaço Beauty",
    "Espaço Delivery",
    "Espaço gourmet",
    "Espaço Influencer",
    "Espaço kids",
    "Espaço para piqueniques",
    "Fire place",
    "Fitness Externo",
    "Forno de Pizza",
    "Garagem",
    "Hall de Entrada",
    "Horta",
    "Lavanderia",
    "Lounge",
    "Mercado 24hs",
    "Mini Mercado",
    "Mini Quadra",
    "Pet care",
    "Pet place",
    "Piscina",
    "Piscina adulto",
    "Piscina aquecida",
    "Piscina Coberta",
    "Piscina Infantil",
    "Playground",
    "Pomar",
    "Portaria",
    "Praça",
    "Praça de Leitura",
    "Praça do Fogo",
    "Private Pool House",
    "Quadra de Beach Tennis",
    "Quadra de Tênis",
    "Quadra Poliesportiva",
    "Quadra Recreativa",
    "Redário",
    "Rooftop",
    "Sala de leitura",
    "Sala de Massagem",
    "Sala de Reunião",
    "Salão de festas",
    "Salão de Jogos",
    "Salão de Jogos Adolescente",
    "Salão de Jogos Adulto",
    "Sauna",
    "Segurança",
    "Sky Lounge",
    "Solarium",
    "Spa",
    "Sports Bar",
    "Terraço",
    "Tomada para carro elétrico",
  ];

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

  const saveDraft = () => {
    const draft = {
      ...formValues,
      amenities: selectedAmenities,
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    toast("Rascunho salvo! 💾");
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    window.location.reload();
  };

  const propertyTypes = [
    { value: "apartamento", label: "Apartamento", icon: Building2 },
    { value: "casa", label: "Casa", icon: Home },
    { value: "comercial", label: "Comercial", icon: Store },
    { value: "terreno", label: "Terreno", icon: MapPin },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
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
            <TabsList className="grid w-full grid-cols-5 gap-3 mb-12">
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
                <Sparkles className="h-4 w-4 mr-2" />
                Criativo
              </TabsTrigger>
              <TabsTrigger value="teste">
                <Sparkles className="h-4 w-4 mr-2" />
                Teste
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
                        className={`p-4 rounded-lg border-2 transition-all ${
                          propertyType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 mx-auto mb-1 ${
                            propertyType === type.value
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <p
                          className={`text-sm font-medium ${
                            propertyType === type.value
                              ? "text-primary"
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
                    rows={4}
                  />
                  {errors.descricao && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.descricao.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      defaultValue="disponivel"
                      onValueChange={(value) =>
                        setValue("status", value as any)
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponivel">Disponível</SelectItem>
                        <SelectItem value="reservado">Reservado</SelectItem>
                        <SelectItem value="vendido">Vendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="preco">Preço *</Label>
                    <div className="relative mt-1.5">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="preco"
                        placeholder="R$ 0,00"
                        {...register("preco")}
                        className="pl-10"
                      />
                    </div>
                    {errors.preco && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.preco.message}
                      </p>
                    )}
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
                    id="iptu"
                    placeholder="R$ 0,00"
                    {...register("iptu")}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="condominio">Condomínio (mensal)</Label>
                  <Input
                    id="condominio"
                    placeholder="R$ 0,00"
                    {...register("condominio")}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mobiliado"
                    onCheckedChange={(checked) =>
                      setValue("mobiliado", checked as boolean)
                    }
                  />
                  <Label htmlFor="mobiliado" className="cursor-pointer">
                    Imóvel mobiliado
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aceitaPet"
                    onCheckedChange={(checked) =>
                      setValue("aceitaPet", checked as boolean)
                    }
                  />
                  <Label htmlFor="aceitaPet" className="cursor-pointer">
                    Aceita animais de estimação
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
                        id="andarFinal"
                        placeholder="Ex: 6"
                        {...register("andarFinal")}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="totalAndares">Total de Andares</Label>
                      <Input
                        id="totalAndares"
                        placeholder="Ex: 20"
                        {...register("totalAndares")}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="unidadesAndar">Unidades por Andar</Label>
                      <Input
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
                        id="terreno"
                        placeholder="Ex: 500"
                        {...register("terreno")}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="quintal">Área do Quintal (m²)</Label>
                      <Input
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
                  <div className="grid grid-cols-2 gap-4 items-center my-5">
                    <h3 className="text-lg font-semibold text-foreground">
                      Selecione as Comodidades
                    </h3>
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
            <TabsContent value="creative" className="space-y-4">
              <div>
                <h1>crativo</h1>
              </div>
            </TabsContent>

            {/* Lazeres e Comodidades */}
            <TabsContent value="teste" className="space-y-4">
              teste
            </TabsContent>
          </Tabs>

          {/* Botões de Ação */}
          <div className="flex gap-3 justify-end mt-6 pt-6 border-t">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
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
