import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  price: z.number(),

  propertyType: z.string(),
  propertyStatus: z.string(),
  propertyPurpose: z.string(),
  propertyStanding: z.string(),
  propertyTypology: z.string(),

  street: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),

  area: z.number().optional(),
  roomsQty: z.number().optional(),
  suitesQty: z.number().optional(),
  bathroomsQty: z.number().optional(),
  parkingSpacesQty: z.number().optional(),
  condominiumFee: z.number().optional(),
  propertyAmenities: z.array(z.string()),

  featuredImage: z.string(),
  propertyGallery: z.array(
    z.object({
      imageId: z.string(),
      order: z.number(),
    })
  ),
  propertyFloorPlanGallery: z.array(
    z.object({
      imageId: z.string(),
      order: z.number(),
    })
  ),
  youtubeURL: z.string(),

  floorStart: z.number().optional(),
  floorEnd: z.number().optional(),

  isFurnished: z.boolean().optional(),
  isPetFriendly: z.boolean().optional(),
  isNearSubway: z.boolean().optional(),
  showSquareMeterPrice: z.boolean().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
