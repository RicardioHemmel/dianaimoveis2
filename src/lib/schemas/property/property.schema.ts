import { z } from "zod";

//-------------------------------------------------- AUXULIAR TYPES ------------------------------------------------------
const GalleryItemSchema = z.object({
  imageKey: z.string(),
  order: z.number(),
});

const PropertyDetail = z.object({
  _id: z.string(),
  name: z.string(),
});

export type PropertyDetail = z.infer<typeof PropertyDetail>;

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

  bedroomsQty: z.number().optional(),
  suitesQty: z.number().optional(),
  bathroomsQty: z.number().optional(),
  parkingSpacesQty: z.number().optional(),
  price: z.number("O preço é obrigatório").nonnegative(),
  area: z.number().optional(),

  condominiumFee: z.number().optional(),
  floorStart: z.number().optional(),
  floorEnd: z.number().optional(),

  videoUrl: z.string().optional(),

  isFurnished: z.boolean().optional(),
  isNearSubway: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isPetFriendly: z.boolean().optional(),
  showSquareMeterPrice: z.boolean().optional(),

  status: z.enum(["DRAFT", "PUBLISHED"]),

  propertyGallery: z.array(GalleryItemSchema).optional(),
  propertyFloorPlanGallery: z.array(GalleryItemSchema).optional(),

  address: z
    .object({
      street: z.string().optional(),
      neighborhood: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),
};

//---------------------------------------------------- VIEW SCHEMA -----------------------------------------------------------
export const propertyViewSchema = z.object({
  ...propertyBaseSchema,

  propertyType: PropertyDetail.optional(),
  propertyPurpose: PropertyDetail.optional(),
  propertyStanding: PropertyDetail.optional(),
  propertyStatus: PropertyDetail.optional(),
  propertyTypology: PropertyDetail.optional(),
  propertyAmenities: z.array(PropertyDetail).optional(),
});

export type PropertyViewSchema = z.infer<typeof propertyViewSchema>;

//---------------------------------------------------- CREATE FORM SCHEMA -----------------------------------------------------------

export const propertyInputSchema = z.object({
  ...propertyBaseSchema,

  propertyType: PropertyDetail.optional(),
  propertyPurpose: z.string().optional(),
  propertyStanding: z.string().optional(),
  propertyStatus: z.string().optional(),
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
  propertyPurpose: undefined,
  propertyStanding: undefined,
  propertyStatus: undefined,
  propertyTypology: undefined,
  propertyAmenities: [],
  isFeatured: false,
  isFurnished: false,
  isNearSubway: false,
  showSquareMeterPrice: false,
  status: "DRAFT",
  isPetFriendly: false,
  videoUrl: "",
  address: {
    street: "",
    city: "",
    neighborhood: "",
    state: "",
    zipCode: "",
  },
};

//-------------------------------------------------- PROPS CONTROLS ------------------------------------------------------
export type PropertyDetailsData = {
  amenities: PropertyDetail[];
  purposes: PropertyDetail[];
  standings: PropertyDetail[];
  status: PropertyDetail[];
  types: PropertyDetail[];
  typologies: PropertyDetail[];
};
