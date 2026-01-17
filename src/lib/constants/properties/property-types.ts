export const PROPERTY_TYPES = [
  "Apartamento",
  "Casa",
  "Comercial",
  "Terreno",
] as const;

// CREATES A TYPED SCHEMA OF THE LIST
export type PropertyTypesListSchema = (typeof PROPERTY_TYPES)[number];
