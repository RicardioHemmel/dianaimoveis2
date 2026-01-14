import { FieldErrors } from "react-hook-form";
import { z } from "zod";

//-------------------------------------------------- AUXULIAR TYPES ------------------------------------------------------

// -------- TOGGLE FIELDS
const toggleFieldSchema = z.object({
  value: z.boolean(),
  show: z.boolean(),
});

export type ToggleFieldSchema = z.infer<typeof toggleFieldSchema>;

// -------- ADDRESS
const addressSchema = z.object({
  street: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  stateUf: z.string().optional(),
  zipCode: z.string().optional(),
  referencePoint: z.array(z.string()),
});

export type AddressSchema = z.infer<typeof addressSchema>;

// -------- RANGE FIELDS
export const rangeFieldSchema = z
  .object({
    min: z.number().nonnegative().optional(),
    max: z.number().nonnegative().optional(),
  })
  // VALIDATE IF BOTH EXIST OR NEITHER
  .refine(
    (data) => {
      const hasMin = data.min !== undefined;
      const hasMax = data.max !== undefined;
      return hasMin === hasMax;
    },
    {
      message: "Você deve preencher ambos os valores ou nenhum.",
      path: ["min"],
    }
  )
  // VALIDATE IF MIN IS GREATER THEN MAX
  .refine(
    (data) => {
      if (data.min !== undefined && data.max !== undefined) {
        return data.min <= data.max;
      }
      return true;
    },
    {
      message: "O valor mínimo não pode ser maior que o máximo",
      path: ["min"],
    }
  );
export type RangeSchema = z.infer<typeof rangeFieldSchema>;

//--------- PROPERTY GALLERY TO VIEW
export const galleryItemViewSchema = z.object({
  key: z.string(),
  order: z.number(),
  url: z.string(),
});

export type GalleryItemViewSchema = z.infer<typeof galleryItemViewSchema>;

//--------- PROPERTY GALLERY TO INPUT
export const galleryItemInputSchema = z.object({
  key: z.string(),
  order: z.number(),
});

export type GalleryItemInputSchema = z.infer<typeof galleryItemInputSchema>;

//--------- PROPERTY DETAILS (TYPE, TYPOLOGY, STANDING...)
const propertyDetailSchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export type PropertyDetailSchema = z.infer<typeof propertyDetailSchema>;

//---------------------------------------------------- BASE SCHEMA -----------------------------------------------------------
const propertyBaseSchema = z.object({
  _id: z.string().optional(),

  title: z.string().min(1, "O título é obrigatório"),
  price: z.number("O preço é obrigatório").nonnegative(),

  status: z.enum(["DRAFT", "PUBLISHED"]),

  bedrooms: rangeFieldSchema.optional(),
  suites: rangeFieldSchema.optional(),
  bathrooms: rangeFieldSchema.optional(),
  parkingSpaces: rangeFieldSchema.optional(),
  area: rangeFieldSchema.optional(),
  floors: rangeFieldSchema.optional(),

  description: z.string().optional(),
  condominiumFee: z.number().nonnegative().optional(),
  constructionCompany: z.string().optional(),
  videoUrl: z.string().optional(),
  deliveryDate: z
    .union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal("")])
    .optional(),

  isFeatured: z.boolean(),
  isFurnished: toggleFieldSchema.optional(),
  isNearSubway: toggleFieldSchema.optional(),
  isPetFriendly: toggleFieldSchema.optional(),

  propertyType: z.string(),
  propertyPurpose: z.string().optional(),
  propertyStanding: z.string().optional(),
  propertyTypology: z.string().optional(),
  propertyAmenities: z.array(z.string()),

  gallery: z.array(galleryItemInputSchema),
  floorPlanGallery: z.array(galleryItemInputSchema),

  address: addressSchema.optional(),
});

export type PropertyBaseSchema = z.infer<typeof propertyBaseSchema>;

//-------------------------------------------------- VIEW SCHEMA ---------------------------------------------------
export const propertyViewSchema = propertyBaseSchema.extend({
  gallery: z.array(galleryItemViewSchema),
  floorPlanGallery: z.array(galleryItemViewSchema),

  propertyType: propertyDetailSchema.optional(),
  propertyPurpose: propertyDetailSchema.optional(),
  propertyStanding: propertyDetailSchema.optional(),
  propertyTypology: propertyDetailSchema.optional(),
  propertyAmenities: z.array(propertyDetailSchema),
});

export type PropertyViewSchema = z.infer<typeof propertyViewSchema>;

//---------------------------------------------CREATE/EDIT FORM SCHEMA -------------------------------------------------

export const propertyInputSchema = propertyBaseSchema.extend({
  propertyType: propertyDetailSchema.nullable(),
});

export type PropertyInputSchema = z.infer<typeof propertyInputSchema>;

//---------------------------------------------------- DEFAULT VALUES TO POPULATE CREATE PROPERTY FORM -----------------------------------------------------------
export const DefaultValuesPropertyForm: PropertyInputSchema = {
  _id: "",
  title: "",
  description: "",
  price: undefined as unknown as number,
  propertyType: null,
  deliveryDate: "",
  propertyPurpose: "",
  propertyStanding: "",
  propertyTypology: "",
  propertyAmenities: [],
  constructionCompany: "",
  status: "DRAFT",
  gallery: [],
  floorPlanGallery: [],
  videoUrl: "",
  address: {
    street: "",
    city: "",
    neighborhood: "",
    stateUf: "",
    zipCode: "",
    referencePoint: [],
  },
  isFeatured: false,
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
  price: "Preço",
  min: "Detalhes do Imóvel",
  max: "Detalhes do Imóvel",
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
