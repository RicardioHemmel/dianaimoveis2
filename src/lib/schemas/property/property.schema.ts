import { z } from "zod";

const GalleryItemSchema = z.object({
  imageRef: z.string(),
  order: z.number(),
});

export const PropertySchema = z.object({
  title: z.string().min(1, { error: "Título é obrigatório" }),
  description: z.string().optional(),

  roomsQty: z.number().optional(),
  suitesQty: z.number().optional(),
  bathroomsQty: z.number().optional(),
  parkingSpacesQty: z.number().optional(),
  price: z
    .number({error: "O preço é obrigatório"})
    .nullable()
    .refine((val) => val !== null && val > 0, {
      error: "O preço é obrigatório",
    }),
  area: z.number().optional(),
  condominiumFee: z.number().optional(),
  floorStart: z.number().optional(),
  floorEnd: z.number().optional(),

  videoUrl: z.string().optional(),
  coverImage: z.string().optional(),

  isFurnished: z.boolean().optional(),
  isNearSubway: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isPetFriendly: z.boolean().optional(),
  isActive: z.boolean().optional(),
  showSquareMeterPrice: z.boolean().optional(),

  userId: z.string().optional(),

  propertyTypeSlug: z.string().optional(),
  propertyPurposeId: z.string().optional(),
  propertyStandingId: z.string().optional(),
  propertyStatusId: z.string().optional(),
  propertyTypologyId: z.string().optional(),
  propertyAmenitiesId: z.array(z.string()).optional(),

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
});

export type PropertyFormData = z.infer<typeof PropertySchema>;
