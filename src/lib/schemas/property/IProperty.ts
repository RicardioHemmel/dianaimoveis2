import { Types } from "mongoose";

export interface IGallerySchema {
  key: string;
  order: number;
}

export interface IFloorPlanGallerySchema extends IGallerySchema {
  label: string;
}

export interface IRangeSchema {
  min?: number;
  max?: number;
}

export interface IAddressSchema {
  street: string | null;
  neighborhood: string | null;
  city: string | null;
  stateUf: string | null;
  zipCode: string | null;
  referencePoint: string[] | null;
  lat: number | null;
  lng: number | null;
}

export interface IToggleFieldSchema {
  value: boolean;
  show: boolean;
}

export interface IPopulatedRef {
  _id: Types.ObjectId;
  name: string;
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
  bedrooms: IRangeSchema | null;
  suites: IRangeSchema | null;
  bathrooms: IRangeSchema | null;
  parkingSpaces: IRangeSchema | null;
  area: IRangeSchema | null;
  floors: IRangeSchema | null;

  // OTHER FIELDS
  description: string | null;
  deliveryDate: string | null;
  condominiumFee: number | null;
  videoUrl: string | null;
  constructionCompany: string | null;

  // TOGGLE FIELDS
  isFeatured: boolean;
  isFurnished: IToggleFieldSchema;
  isNearSubway: IToggleFieldSchema;
  isPetFriendly: IToggleFieldSchema;

  // REFERENCES
  propertyType: Types.ObjectId;
  propertyPurpose: Types.ObjectId | null;
  propertyStanding: Types.ObjectId | null;
  propertyTypologies: Types.ObjectId[];
  propertyAmenities: Types.ObjectId[];

  // GALLERY
  gallery: IGallerySchema[];
  floorPlanGallery: IFloorPlanGallerySchema[];

  // ADDRESS
  address: IAddressSchema | null;
}

//-------------------------------------- POPULATED IPROPERTY --------------------------------

// FOR VIEW MAPPER
export interface IPropertyPopulated extends Omit<
  IProperty,
  | "propertyType"
  | "propertyPurpose"
  | "propertyStanding"
  | "propertyStatus"
  | "propertyTypologies"
  | "propertyAmenities"
> {
  propertyType: IPopulatedRef;
  propertyPurpose?: IPopulatedRef;
  propertyStanding?: IPopulatedRef;
  propertyStatus?: IPopulatedRef;
  propertyTypologies: IPopulatedRef[];
  propertyAmenities: IPopulatedRef[];
}
