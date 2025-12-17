import { z } from "zod";

const GalleryItemSchema = z.object({
  imageRef: z.string(),
  order: z.number(),
});

export const PropertyDraftSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, { error: "Título é obrigatório" }),
  description: z.string().optional(),

  bedroomsQty: z.number().optional(),
  suitesQty: z.number().optional(),
  bathbedroomsQty: z.number().optional(),
  parkingSpacesQty: z.number().optional(),
  price: z.number().optional(),
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

  userId: z.string(),

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

export type PropertyFormData = z.infer<typeof PropertyDraftSchema>;
