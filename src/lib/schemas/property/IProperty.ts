import { Types } from "mongoose";

interface GallerySchema {
  key: string;
  order: number;
}

interface RangeSchema {
  min: number;
  max: number;
}

interface AddressSchema {
  street: string | null;
  neighborhood: string | null;
  city: string | null;
  stateUf: string | null;
  zipCode: string | null;
}

interface ToggleFieldSchema {
  value: boolean;
  show: boolean;
}

//-------------------------------------- BASE IPROPERTY --------------------------------
export interface IProperty {
  _id?: Types.ObjectId;

  // REQUIRED
  title: string;
  price: number;

  // PROPERTY STATUS FOR DISPLAY
  status: "DRAFT" | "PUBLISHED";

  // RANGE FIELDS
  bedrooms: RangeSchema | null;
  suites: RangeSchema | null;
  bathrooms: RangeSchema | null;
  parkingSpaces: RangeSchema | null;
  area: RangeSchema | null;
  floors: RangeSchema | null;

  // OTHER FIELDS
  description: string | null;
  deliveryDate: string | null;
  condominiumFee: number | null;
  videoUrl: string | null;
  constructionCompany: string | null;

  // TOGGLE FIELDS
  isFurnished: ToggleFieldSchema | null;
  isNearSubway: ToggleFieldSchema | null;
  isFeatured: ToggleFieldSchema | null;
  showSquareMeterPrice: ToggleFieldSchema | null;
  isPetFriendly: ToggleFieldSchema | null;

  // REFERENCES
  propertyType: Types.ObjectId;
  propertyPurpose: Types.ObjectId | null;
  propertyStanding: Types.ObjectId | null;
  propertyTypology: Types.ObjectId | null;
  propertyAmenities: Types.ObjectId[];

  // GALLERY
  gallery: GallerySchema[];
  floorPlanGallery: GallerySchema[];

  // ADDRESS
  address: AddressSchema | null;
}

//-------------------------------------- POPULATED IPROPERTY --------------------------------

export interface IPopulatedRef {
  _id: Types.ObjectId;
  name: string;
}

// FOR VIEW MAPPER
export interface IPropertyPopulated extends Omit<
  IProperty,
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
