// -------------------------------- ENTITY SCHEMA ------------------------- //
interface Gallary {
  key: string;
  order: number;
}

interface RangeField {
  min: number;
  max: number;
}

interface Address {
  street?: string;
  neighborhood?: string;
  city?: string;
  stateUf?: string;
  zipCode?: string;
}

export interface IPropertyEntity {
  _id?: string;

  // REQUIRED
  title: string;
  price: number;

  // RANGE FIELDS
  bedrooms?: RangeField;
  suites?: RangeField;
  bathrooms?: RangeField;
  parkingSpaces?: RangeField;
  area?: RangeField;
  floors?: RangeField;

  // PROPERTY STATUS FOR DISPLAY
  status: "DRAFT" | "PUBLISHED";

  // OTHER FIELDS
  description?: string | null;
  deliveryDate?: string | null;
  condominiumFee?: number | null;
  videoUrl?: string | null;

  // TOGGLE FIELDS
  isFurnished?: boolean;
  isNearSubway?: boolean;
  isFeatured?: boolean;
  showSquareMeterPrice?: boolean;
  isPetFriendly?: boolean;

  // REFERENCES
  propertyType: string;
  propertyPurpose?: string;
  propertyStanding?: string;
  propertyTypology?: string;
  propertyAmenities: string[];

  // GALLERY
  gallery: Gallary[];
  floorPlanGallery: Gallary[];

  // ADDRESS
  address?: Address;
}
