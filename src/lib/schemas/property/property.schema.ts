import { z } from "zod";

//-------------------------------------------------- AUXULIAR TYPES ------------------------------------------------------
const galleryItemSchema = z.object({
  key: z.string(),
  order: z.number(),
  url: z.string(),
});

export type GalleryItemSchema = z.infer<typeof galleryItemSchema>;

const propertyDetail = z.object({
  _id: z.string(),
  name: z.string(),
});

export type PropertyDetail = z.infer<typeof propertyDetail>;

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

  coverImage: z.string().optional(),
  propertyGallery: z.array(galleryItemSchema),
  propertyFloorPlanGallery: z.array(galleryItemSchema),

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

  propertyType: propertyDetail.optional(),
  propertyPurpose: propertyDetail.optional(),
  propertyStanding: propertyDetail.optional(),
  propertyStatus: propertyDetail.optional(),
  propertyTypology: propertyDetail.optional(),
  propertyAmenities: z.array(propertyDetail).optional(),
});

export type PropertyViewSchema = z.infer<typeof propertyViewSchema>;

//---------------------------------------------------- CREATE FORM SCHEMA -----------------------------------------------------------

export const propertyInputSchema = z.object({
  ...propertyBaseSchema,

  propertyType: propertyDetail.optional(),
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
  propertyGallery: [],
  propertyFloorPlanGallery: [],
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
