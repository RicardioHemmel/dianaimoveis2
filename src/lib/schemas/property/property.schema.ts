import { z } from "zod";

const GalleryItemSchema = z.object({
  imageRef: z.string(),
  order: z.number(),
});

export const PropertySchema = z.object({
  title: z.string(),
  description: z.string().optional(),

  roomsQty: z.number().optional(),
  suitesQty: z.number().optional(),
  bathroomsQty: z.number().optional(),
  parkingSpacesQty: z.number().optional(),
  price: z.number(),
  area: z.number().optional(),
  condominiumFee: z.number().optional(),
  floorStart: z.number().optional(),
  floortEnd: z.number().optional(),

  videoUrl: z.string().optional(),
  coverImage: z.string().optional(),

  isFurnished: z.boolean().optional(),
  isNearSubway: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),

  userId: z.string(),

  propertyType: z.string().optional(),
  propertyPurpose: z.string().optional(),
  propertyStanding: z.string().optional(),
  propertyStatus: z.string().optional(),
  propertyTypology: z.string().optional(),
  propertyAmenities: z.array(z.string()).optional(),

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
