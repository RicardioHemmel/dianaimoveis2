import { Types } from "mongoose";

export interface PropertyDB {
  _id: Types.ObjectId;
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
  propertyAmenitiesId?: Types.ObjectId[];

  // // propertyGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: number }],
  // // propertyFloorPlanGallery: [{ type: Schema.Types.ObjectId, ref: "Media", order: number }],
  // // coverImage: { type: Schema.Types.ObjectId, ref: "Media" },
  videoUrl?: string;

  status?: string;

  address?: {
    street?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}
