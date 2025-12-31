import { z } from "zod";

//-------------------------------------------------- AUXULIAR TYPES ------------------------------------------------------
const GalleryItemSchema = z.object({
  imageRef: z.string(),
  order: z.number(),
});

const propertyDetails = z.object({
  _id: z.string(),
  name: z.string(),
});

export type PropertyDetails = z.infer<typeof propertyDetails> 


//---------------------------------------------------- BASE SCHEMA -----------------------------------------------------------
const propertyBaseSchema = {
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),

  bedroomsQty: z.number().optional(),
  suitesQty: z.number().optional(),
  bathroomsQty: z.number().optional(),
  parkingSpacesQty: z.number().optional(),
  price: z.number().optional(),
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

  // propertyGallery: z.array(GalleryItemSchema).optional(),
  // propertyFloorPlanGallery: z.array(GalleryItemSchema).optional(),

  address: z.object({
    street: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  }).optional(),
};

//---------------------------------------------------- VIEW SCHEMA -----------------------------------------------------------
export const propertyViewSchema = z.object({
  ...propertyBaseSchema,

  propertyType: propertyDetails,
  propertyPurpose: propertyDetails,
  propertyStanding: propertyDetails,
  propertyStatus: propertyDetails,
  propertyTypology: propertyDetails,
  propertyAmenities: z.array(propertyDetails),

});

export type PropertyViewSchema = z.infer<typeof propertyViewSchema>;



//---------------------------------------------------- CREATE FORM SCHEMA -----------------------------------------------------------

export const propertyInputSchema = z.object({
  ...propertyBaseSchema,

  propertyTypeId: z.string(),
  propertyPurposeId: z.string().optional(),
  propertyStandingId: z.string().optional(),
  propertyStatusId: z.string().optional(),
  propertyTypologyId: z.string().optional(),
  propertyAmenitiesIds: z.array(z.string()),

});

export type PropertyInputSchema = z.infer<typeof propertyInputSchema>;

//---------------------------------------------------- DEFAULT VALUES TO POPULATE CREATE PROPERTY FORM -----------------------------------------------------------
export const DefaultValuesPropertyForm: PropertyInputSchema = {
  _id: undefined,
  title: "",
  description: "",
  propertyTypeId: "69358e0c5d4b73fa0adff185",
  propertyPurposeId: undefined,
  propertyStandingId: undefined,
  propertyStatusId: undefined,
  propertyTypologyId: undefined,
  propertyAmenitiesIds: [],
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
