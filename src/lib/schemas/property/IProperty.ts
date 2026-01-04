import { Types } from "mongoose";

export interface IPopulatedRef {
  _id: Types.ObjectId;
  name: string;
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

  propertyTypeId: Types.ObjectId;
  propertyPurposeId?: Types.ObjectId;
  propertyStandingId?: Types.ObjectId;
  propertyStatusId?: Types.ObjectId;
  propertyTypologyId?: Types.ObjectId;
  propertyAmenitiesIds: Types.ObjectId[];

  // propertyGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: number }],
  // propertyFloorPlanGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: number }],
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
export interface IPropertyPopulated
  extends Omit<
    IPropertyRaw,
    | "propertyTypeId"
    | "propertyPurposeId"
    | "propertyStandingId"
    | "propertyStatusId"
    | "propertyTypologyId"
    | "propertyAmenitiesIds"
  > {
  propertyType: IPopulatedRef;
  propertyPurpose?: IPopulatedRef;
  propertyStanding?: IPopulatedRef;
  propertyStatus?: IPopulatedRef;
  propertyTypology?: IPopulatedRef;
  propertyAmenities: IPopulatedRef[];
}
