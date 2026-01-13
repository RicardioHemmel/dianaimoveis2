import { FieldErrors } from "react-hook-form";
import { z } from "zod";

//-------------------------------------------------- AUXULIAR TYPES ------------------------------------------------------

export const rangeSchema = z
  .object({
    min: z.number().optional(),
    max: z.number().optional(),
  })
  .refine(
    (v) => {
      // ou os dois existem, ou nenhum existe
      const bothDefined = v.min !== undefined && v.max !== undefined;
      const bothUndefined = v.min === undefined && v.max === undefined;
      return bothDefined || bothUndefined;
    },
    {
      message: "Informe min e max juntos, não apenas um deles",
    }
  )
  .refine(
    (v) => {
      // se ambos existirem, valida a ordem
      if (v.min === undefined || v.max === undefined) return true;
      return v.min <= v.max;
    },
    {
      message: "Min não pode ser maior que Max",
    }
  );

export type RangeSchema = z.infer<typeof rangeSchema>;

//--------- PROPERTY GALLERY TO VIEW
export const galleryViewItemSchema = z.object({
  key: z.string(),
  order: z.number(),
  url: z.string(),
});

export type GalleryViewItemSchema = z.infer<typeof galleryViewItemSchema>;

//--------- PROPERTY GALLERY TO INPUT
export const galleryInputItemSchema = z.object({
  key: z.string(),
  order: z.number(),
});

export type GalleryInputItemSchema = z.infer<typeof galleryInputItemSchema>;

//--------- PROPERTY DETAILS (TYPE, TYPOLOGY, STANDING...)
const propertyDetailSchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export type PropertyDetailSchema = z.infer<typeof propertyDetailSchema>;

//-------------------------------------------------- PROPERTY IMAGE UPLOAD ------------------------------------------------------

export const uploadRequestSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
});

//---------------------------------------------------- BASE SCHEMA -----------------------------------------------------------
const propertyBaseSchema = {
  _id: z.string().optional(),
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
  price: z.number("O preço é obrigatório").nonnegative(),

  bedrooms: rangeSchema.optional(),
  suites: rangeSchema.optional(),
  bathrooms: rangeSchema.optional(),
  parkingSpaces: rangeSchema.optional(),
  area: rangeSchema.optional(),
  deliveryDate: z
    .union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal("")])
    .optional(),

  condominiumFee: z.number().optional(),
  floorStart: z.number().optional(),
  floorEnd: z.number().optional(),
  constructionCompany: z.string().optional(),

  videoUrl: z.string().optional(),

  isFurnished: z.boolean().optional(),
  isNearSubway: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isPetFriendly: z.boolean().optional(),
  showSquareMeterPrice: z.boolean().optional(),

  status: z.enum(["DRAFT", "PUBLISHED"]),

  address: z
    .object({
      street: z.string().optional(),
      neighborhood: z.string().optional(),
      city: z.string().optional(),
      stateUf: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),
};

//---------------------------------------------------- VIEW SCHEMA -----------------------------------------------------------
export const propertyViewSchema = z.object({
  ...propertyBaseSchema,

  propertyGallery: z.array(galleryViewItemSchema),
  propertyFloorPlanGallery: z.array(galleryViewItemSchema),

  propertyType: propertyDetailSchema.optional(),
  propertyPurpose: propertyDetailSchema.optional(),
  propertyStanding: propertyDetailSchema.optional(),
  propertyTypology: propertyDetailSchema.optional(),
  propertyAmenities: z.array(propertyDetailSchema),
});

export type PropertyViewSchema = z.infer<typeof propertyViewSchema>;

//---------------------------------------------------- CREATE FORM SCHEMA -----------------------------------------------------------

export const propertyInputSchema = z.object({
  ...propertyBaseSchema,

  propertyGallery: z.array(galleryInputItemSchema),
  propertyFloorPlanGallery: z.array(galleryInputItemSchema),

  propertyType: propertyDetailSchema.optional(),
  propertyPurpose: z.string().optional(),
  propertyStanding: z.string().optional(),
  propertyTypology: z.string().optional(),
  propertyAmenities: z.array(z.string()),
});

export type PropertyInputSchema = z.infer<typeof propertyInputSchema>;

//---------------------------------------------------- DEFAULT VALUES TO POPULATE CREATE PROPERTY FORM -----------------------------------------------------------
export const DefaultValuesPropertyForm: PropertyInputSchema = {
  _id: undefined,
  title: "",
  description: "",
  price: undefined as unknown as number,
  propertyType: undefined,
  deliveryDate: "",
  propertyPurpose: "",
  propertyStanding: "",
  propertyTypology: "",
  propertyAmenities: [],
  constructionCompany: "",
  isFeatured: false,
  isFurnished: false,
  isNearSubway: false,
  showSquareMeterPrice: false,
  status: "DRAFT",
  propertyGallery: [],
  propertyFloorPlanGallery: [],
  isPetFriendly: false,
  videoUrl: "",
  address: {
    street: "",
    city: "",
    neighborhood: "",
    stateUf: "",
    zipCode: "",
  },
};

//-------------------------------------------------- PROPS CONTROLS ------------------------------------------------------
export type PropertyDetailsData = {
  amenities: PropertyDetailSchema[];
  purposes: PropertyDetailSchema[];
  standings: PropertyDetailSchema[];
  types: PropertyDetailSchema[];
  typologies: PropertyDetailSchema[];
};

//-------------------------------------------------- FRIENDLY LABELS MAPPER ------------------------------------------------------

export const fieldLabels: Record<string, string> = {
  title: "Título",
  description: "Descrição",
  bedroomsQty: "Quartos",
  suitesQty: "Suítes",
  bathroomsQty: "Banheiros",
  parkingSpacesQty: "Vagas de garagem",
  price: "Preço",
  area: "Área",
  condominiumFee: "Condomínio",
  floorStart: "Andar inicial",
  floorEnd: "Andar final",
  videoUrl: "Vídeo",
  isFurnished: "Mobiliado",
  isNearSubway: "Próximo ao metrô",
  isFeatured: "Destaque",
  isPetFriendly: "Pet friendly",
  showSquareMeterPrice: "Exibir preço por m²",
  propertyGallery: "Galeria de imagens",
  propertyFloorPlanGallery: "Planta baixa",
  address: "Endereço",
  propertyType: "Tipo do imóvel",
  propertyPurpose: "Finalidade do imóvel",
  propertyStanding: "Padrão do imóvel",
  propertyTypology: "Tipologia",
  propertyAmenities: "Comodidades",
};

// MAPS FIELD ERROS FROM "RHF" INTO PORTUGUESE NAMES
export function extractFieldLabels(
  errors: FieldErrors<any>,
  parentKey = ""
): string[] {
  let labels: string[] = [];

  for (const key in errors) {
    if (!errors.hasOwnProperty(key)) continue;
    const error = errors[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (error?.message || error?.type) {
      // erro de campo simples
      labels.push(fieldLabels[key] ?? key);
    } else if (
      typeof error === "object" &&
      error !== null &&
      !("message" in error)
    ) {
      // erro aninhado (ex: address)
      labels.push(...extractFieldLabels(error as FieldErrors<any>, fullKey));
    }
  }

  return labels;
}
