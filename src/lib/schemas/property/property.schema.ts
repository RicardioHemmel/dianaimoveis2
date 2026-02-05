import { z } from "zod";

//-------------------------------------------------- AUXULIAR TYPES ------------------------------------------------------

// -------- TOGGLE FIELDS
const toggleFieldSchema = z.object({
  value: z.boolean(),
  show: z.boolean(),
});

export type ToggleFieldSchema = z.infer<typeof toggleFieldSchema>;

// -------- ADDRESS
export const neighborhoodSchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export type NeighborhoodSchema = z.infer<typeof neighborhoodSchema>;

const addressSchema = z.object({
  street: z.string().optional(),
  neighborhood: neighborhoodSchema.optional(),
  city: z.string().optional(),
  stateUf: z.string().optional(),
  zipCode: z.string().optional(),
  referencePoint: z.array(z.string()).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
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
    },
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
    },
  );
export type RangeSchema = z.infer<typeof rangeFieldSchema>;

// ------------------------------------- GALLERY AND FLOOR PLAN GALLERY ------------------------------
const galleryCommonFields = z.object({
  key: z.string(),
  order: z.number(),
});

const galleryLabel = z.object({
  label: z.string().min(1, "Digite um título para a Planta Baixa"),
});

//--------- PROPERTY GALLERY TO VIEW
export const galleryItemViewSchema = galleryCommonFields.extend({
  url: z.string(),
});

//--------- PROPERTY GALLERY TO INPUT (DOESN'T SAVE URL)
export const galleryItemInputSchema = galleryItemViewSchema.omit({ url: true });

//--------- PROPERTY FLOOR PLAN GALLERY TO VIEW
export const floorPlanGalleryItemViewSchema =
  galleryItemViewSchema.merge(galleryLabel);

//--------- PROPERTY FLOOR PLAN GALLERY TO INPUT
export const floorPlanGalleryItemInputSchema =
  galleryItemInputSchema.merge(galleryLabel);

//--------- GALLERY TYPES
export type GalleryItemViewSchema = z.infer<typeof galleryItemViewSchema>;
export type GalleryItemInputSchema = z.infer<typeof galleryItemInputSchema>;
export type FloorPlanGalleryItemViewSchema = z.infer<
  typeof floorPlanGalleryItemViewSchema
>;
export type FloorPlanGalleryItemInputSchema = z.infer<
  typeof floorPlanGalleryItemInputSchema
>;

//--------- PROPERTY DETAILS (TYPE, TYPOLOGY, STANDING...)
const propertyDetailSchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export type PropertyDetailSchema = z.infer<typeof propertyDetailSchema>;

// -------- CONSTRUCTION COMPANY
export const constructionCompanySchema = z.object({
  _id: z.string(),
  name: z.string(),
});

export type ConstructionCompanySchema = z.infer<
  typeof constructionCompanySchema
>;

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
  videoUrl: z.string().optional(),
  deliveryDate: z.string().optional(),

  constructionCompany: constructionCompanySchema.optional(),

  isFeatured: z.boolean(),
  isFurnished: toggleFieldSchema,
  isNearSubway: toggleFieldSchema,
  isPetFriendly: toggleFieldSchema,

  propertyType: z.string(),
  propertyPurpose: z.string().optional(),
  propertyStanding: z.string().optional(),
  propertyTypologies: z.array(z.string()),
  propertyAmenities: z.array(z.string()),

  gallery: z.array(galleryItemInputSchema),
  floorPlanGallery: z.array(floorPlanGalleryItemInputSchema),

  address: addressSchema.optional(),
});

export type PropertyBaseSchema = z.infer<typeof propertyBaseSchema>;

//-------------------------------------------------- VIEW SCHEMA ---------------------------------------------------
export const propertyViewSchema = propertyBaseSchema.extend({
  gallery: z.array(galleryItemViewSchema),
  floorPlanGallery: z.array(floorPlanGalleryItemViewSchema),

  propertyType: propertyDetailSchema.optional(),
  propertyPurpose: propertyDetailSchema.optional(),
  propertyStanding: propertyDetailSchema.optional(),
  propertyTypologies: z.array(propertyDetailSchema),
  propertyAmenities: z.array(propertyDetailSchema),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
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
  propertyPurpose: "",
  propertyStanding: "",
  deliveryDate: undefined,
  propertyTypologies: [],
  propertyAmenities: [],
  status: "DRAFT",
  gallery: [],
  floorPlanGallery: [],
  videoUrl: "",
  address: {
    street: "",
    city: "",
    stateUf: "",
    zipCode: "",
    referencePoint: [],
    lat: undefined,
    lng: undefined,
  },
  isFeatured: false,
  isFurnished: {
    show: false,
    value: false,
  },
  isNearSubway: {
    show: false,
    value: false,
  },
  isPetFriendly: {
    show: false,
    value: false,
  },
};

//-------------------------------------------------- PROPS CONTROLS ------------------------------------------------------
export type PropertyDetailsData = {
  amenities: PropertyDetailSchema[];
  purposes: PropertyDetailSchema[];
  standings: PropertyDetailSchema[];
  types: PropertyDetailSchema[];
  typologies: PropertyDetailSchema[];
  constructionCompanies: PropertyDetailSchema[];
};
