import { z } from "zod";

// AUXILIAR TYPE FOR IMAGES
const GalleryItemSchema = z.object({
  imageRef: z.string(),
  order: z.number(),
});

export const propertySchema = z.object({
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

  propertyTypeSlug: z.string(),
  propertyPurposeId: z.string().nullable().optional(),
  propertyStandingId: z.string().nullable().optional(),
  propertyStatusId: z.string().nullable().optional(),
  propertyTypologyId: z.string().nullable().optional(),
  propertyAmenitiesId: z.array(z.string().nullable()).optional(),

  // propertyGallery: z.array(GalleryItemSchema).optional(),
  // propertyFloorPlanGallery: z.array(GalleryItemSchema).optional(),

  status: z.string().optional(),

  address: z
    .object({
      street: z.string().optional(),
      neighborhood: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),
});

export type PropertySchema = z.infer<typeof propertySchema>;

// INITIALIZE FORM WITH DEFAULT VALUES
export const DefaultValuesPropertyForm: PropertySchema = {
  _id: undefined,
  title: "",
  description: "",
  propertyTypeSlug: "apartamento",
  propertyPurposeId: undefined,
  propertyStandingId: undefined,
  propertyStatusId: undefined,
  propertyTypologyId: undefined,
  propertyAmenitiesId: [],
  isFeatured: false,
  isFurnished: false,
  isNearSubway: false,
  showSquareMeterPrice: false,
  status: "",
  isPetFriendly: false,
  address: {
    street: "",
    city: "",
    neighborhood: "",
    state: "",
    zipCode: "",
  },
  //coverImage: "",
  videoUrl: "",
};
