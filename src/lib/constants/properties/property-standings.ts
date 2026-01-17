export const PROPERTY_STANDINGS = [
  "Popular",
  "Médio Padrão",
  "Alto Padrão",
  "Altíssimo Padrão",
] as const;

// CREATES A TYPED SCHEMA OF THE LIST
export type PropertyStandingsListSchema = (typeof PROPERTY_STANDINGS)[number];
