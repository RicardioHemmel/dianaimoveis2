import { Types } from "mongoose";

export interface IPopulatedRef {
  _id: Types.ObjectId;
  name: string;
}

interface propertyGallary {
  key: string;
  order: number;
}

// USED FOR MAPPING DATA TO BACKEND
export interface IPropertyRaw {
  _id?: Types.ObjectId;
  title: string;
  description?: string | null;

  price: number;
  bedroomsQty?: number | null;
  suitesQty?: number | null;
  bathroomsQty?: number | null;
  parkingSpacesQty?: number | null;
  area?: number | null;
  deliveryDate?: string | null;
  condominiumFee?: number | null;
  floorStart?: number | null;
  floorEnd?: number | null;

  isFurnished?: boolean;
  isNearSubway?: boolean;
  isFeatured?: boolean;
  showSquareMeterPrice?: boolean;
  isPetFriendly?: boolean;

  propertyType: Types.ObjectId;
  propertyPurpose?: Types.ObjectId | null;
  propertyStanding?: Types.ObjectId | null;
  propertyTypology?: Types.ObjectId | null;
  propertyAmenities: Types.ObjectId[];

  coverImage?: string | null;
  propertyGallery: propertyGallary[];
  propertyFloorPlanGallery: propertyGallary[];
  videoUrl?: string | null;

  status: "DRAFT" | "PUBLISHED";

  address?: {
    street?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    stateUf?: string | null;
    zipCode?: string | null;
  };
}

// USED FOR MAPPING DATA TO FRONTEND
export interface IPropertyPopulated extends Omit<
  IPropertyRaw,
  | "propertyType"
  | "propertyPurpose"
  | "propertyStanding"
  | "propertyStatus"
  | "propertyTypology"
  | "propertyAmenities"
> {
  propertyType: IPopulatedRef;
  propertyPurpose?: IPopulatedRef;
  propertyStanding?: IPopulatedRef;
  propertyStatus?: IPopulatedRef;
  propertyTypology?: IPopulatedRef;
  propertyAmenities: IPopulatedRef[];
}
