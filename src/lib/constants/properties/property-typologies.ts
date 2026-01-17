export const PROPERTY_TYPOLOGIES = [
  "Tipo",
  "Loft",
  "Studio",
  "Garden",
  "Duplex",
  "Triplex",
  "Cobertura",
  "Kitnet",
  "Penthouse",
] as const;

// CREATES A TYPED SCHEMA OF THE LIST
export type PropertyTypologiesListSchema = (typeof PROPERTY_TYPOLOGIES)[number];
