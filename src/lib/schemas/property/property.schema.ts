import { z } from "zod";

export const propertySchema = z.object({
  // Basic Info
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  price: z.number(),
  propertyType: z.string(),
  status: z.string(),

  // Location
  street: z.string().optional(),
  propertyNumber: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  zone: z.string().optional(),
  lat: z.number().optional(),
  long: z.number().optional(),

  // Details
  area: z.number().optional(),
  roomsQty: z.number().optional(),
  suites: z.number().optional(),
  bathroomsQty: z.number().optional(),
  parkingSpacesQty: z.number().optional(),

  // Specific to Apartment
  floorStart: z.number().optional(),
  floorEnd: z.number().optional(),

  // Options
  isFurnished: z.boolean().optional(),
  isPetFriendly: z.boolean().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
