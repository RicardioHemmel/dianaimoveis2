import { Types } from "mongoose";

export interface IPopulatedRef {
  _id: Types.ObjectId;
  name: string;
}

interface PropertyImages {
  key: string;
  order: number;
}

// USED FOR MAPPING DATA TO BACKEND
export interface IPropertyRaw {
  _id?: Types.ObjectId;
  title: string;
  description?: string;

  price?: number;
  bedroomsQty?: number;
  suitesQty?: number;
  bathroomsQty?: number;
  parkingSpacesQty?: number;
  area?: number;
  condominiumFee?: number;
  floorStart?: number;
  floorEnd?: number;

  isFurnished?: boolean;
  isNearSubway?: boolean;
  isFeatured?: boolean;
  showSquareMeterPrice?: boolean;
  isPetFriendly?: boolean;

  propertyType: Types.ObjectId;
  propertyPurpose?: Types.ObjectId;
  propertyStanding?: Types.ObjectId;
  propertyStatus?: Types.ObjectId;
  propertyTypology?: Types.ObjectId;
  propertyAmenities: Types.ObjectId[];

  coverImage?: string;
  propertyGallery: PropertyImages[];
  propertyFloorPlanGallery: PropertyImages[];
  videoUrl?: string;

  status: "DRAFT" | "PUBLISHED";

  address?: {
    street?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
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
