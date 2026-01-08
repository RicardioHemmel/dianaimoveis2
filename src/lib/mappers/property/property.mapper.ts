import { resolveImageUrl } from "@/lib/media/resolveImageUrl";
import {
  IPropertyRaw,
  IPropertyPopulated,
  IPopulatedRef,
} from "@/lib/schemas/property/IProperty";
import {
  PropertyInputSchema,
  PropertyViewSchema,
  PropertyDetail,
} from "@/lib/schemas/property/property.schema";
import { Types } from "mongoose";

//------------------------------------------ HELPERS -------------------------------------------------
type ViewRef = {
  _id: string;
  name: string;
};

const toObjectId = (id?: string) => {
  return id ? new Types.ObjectId(id) : undefined;
};

const toObjectIdArray = (ids?: string[]) =>
  ids?.map((id) => new Types.ObjectId(id)) ?? [];

const toStringId = (id?: Types.ObjectId) => {
  return id ? id.toString() : undefined;
};

const mapPopulatedRefToView = (ref?: { _id: Types.ObjectId; name: string }) => {
  if (!ref) return undefined;

  return {
    _id: ref._id.toString(),
    name: ref.name,
  };
};

const mapPopulatedRefArrayToView = (
  refs?: { _id: Types.ObjectId; name: string }[]
) => {
  return (refs?.map(mapPopulatedRefToView).filter(Boolean) as ViewRef[]) ?? [];
};

const mapAddressToPersistence = (address?: IPropertyRaw["address"]) =>
  address && {
    street: address.street,
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
  };

const mapAddressToSchema = (address?: IPropertyPopulated["address"]) =>
  address && {
    street: address.street,
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
  };

//---------------------------------------------------- MAPPER -------------------------------------------------

export class PropertyMapper {
  static toPersistence(property: PropertyInputSchema): IPropertyRaw {
    return {
      title: property.title,
      description: property.description,

      price: property.price,
      bedroomsQty: property.bedroomsQty,
      suitesQty: property.suitesQty,
      bathroomsQty: property.bathroomsQty,
      parkingSpacesQty: property.parkingSpacesQty,
      area: property.area,
      condominiumFee: property.condominiumFee,
      floorStart: property.floorStart,
      floorEnd: property.floorEnd,

      isFurnished: property.isFurnished,
      isNearSubway: property.isNearSubway,
      isFeatured: property.isFeatured,
      showSquareMeterPrice: property.showSquareMeterPrice,
      isPetFriendly: property.isPetFriendly,

      coverImage: property.coverImage,
      propertyGallery:
        property?.propertyGallery?.map((img) => ({
          key: img.key,
          order: img.order,
        })) ?? [],
      propertyFloorPlanGallery:
        property?.propertyFloorPlanGallery?.map((img) => ({
          key: img.key,
          order: img.order,
        })) ?? [],

      videoUrl: property.videoUrl,
      status: property.status,

      address: mapAddressToPersistence(property.address),

      propertyType: new Types.ObjectId(property.propertyType?._id),
      propertyPurpose: toObjectId(property.propertyPurpose),
      propertyStanding: toObjectId(property.propertyStanding),
      propertyStatus: toObjectId(property.propertyStatus),
      propertyTypology: toObjectId(property.propertyTypology),
      propertyAmenities: toObjectIdArray(property.propertyAmenities),
    };
  }

  static toViewSchema(property: IPropertyPopulated): PropertyViewSchema {
    return {
      _id: toStringId(property?._id),
      title: property?.title,
      description: property?.description,

      price: property?.price ?? 0,
      bedroomsQty: property?.bedroomsQty,
      suitesQty: property?.suitesQty,
      bathroomsQty: property?.bathroomsQty,
      parkingSpacesQty: property?.parkingSpacesQty,
      area: property?.area,
      condominiumFee: property?.condominiumFee,
      floorStart: property?.floorStart,
      floorEnd: property?.floorEnd,

      isFurnished: property?.isFurnished,
      isNearSubway: property?.isNearSubway,
      isFeatured: property?.isFeatured,
      showSquareMeterPrice: property?.showSquareMeterPrice,
      isPetFriendly: property?.isPetFriendly,

      coverImage: resolveImageUrl(property?.coverImage),
      propertyFloorPlanGallery:
        property?.propertyFloorPlanGallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],
      propertyGallery:
        property?.propertyGallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],
      videoUrl: property?.videoUrl,
      status: property?.status,

      address: mapAddressToSchema(property?.address),

      propertyType: {
        _id: property?.propertyType?._id.toString(),
        name: property?.propertyType?.name,
      },
      propertyPurpose: mapPopulatedRefToView(property?.propertyPurpose),
      propertyStanding: mapPopulatedRefToView(property?.propertyStanding),
      propertyStatus: mapPopulatedRefToView(property?.propertyStatus),
      propertyTypology: mapPopulatedRefToView(property?.propertyTypology),
      propertyAmenities: mapPopulatedRefArrayToView(
        property?.propertyAmenities
      ),
    };
  }

  static toInputSchema(property: IPropertyPopulated): PropertyInputSchema {
    return {
      _id: toStringId(property?._id),
      title: property?.title,
      description: property?.description,

      price: property?.price ?? 0,
      bedroomsQty: property?.bedroomsQty,
      suitesQty: property?.suitesQty,
      bathroomsQty: property?.bathroomsQty,
      parkingSpacesQty: property?.parkingSpacesQty,
      area: property?.area,
      condominiumFee: property?.condominiumFee,
      floorStart: property?.floorStart,
      floorEnd: property?.floorEnd,

      isFurnished: property?.isFurnished,
      isNearSubway: property?.isNearSubway,
      isFeatured: property?.isFeatured,
      showSquareMeterPrice: property?.showSquareMeterPrice,
      isPetFriendly: property?.isPetFriendly,

      coverImage: property.coverImage,
      propertyFloorPlanGallery:
        property?.propertyFloorPlanGallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],
      propertyGallery:
        property?.propertyGallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],
      videoUrl: property?.videoUrl,
      status: property?.status,

      address: mapAddressToSchema(property?.address),

      propertyType: {
        _id: property?.propertyType?._id.toString(),
        name: property?.propertyType?.name,
      },
      propertyPurpose: property.propertyPurpose?._id.toString(),
      propertyStanding: property.propertyStanding?._id.toString(),
      propertyStatus: property.propertyStatus?._id.toString(),
      propertyTypology: property.propertyTypology?._id.toString(),
      propertyAmenities: property.propertyAmenities.map((amenity) =>
        amenity._id.toString()
      ),
    };
  }

  static PropertyDetailToView(PropertyDetail: IPopulatedRef): PropertyDetail {
    return {
      _id: PropertyDetail._id.toString(),
      name: PropertyDetail.name,
    };
  }
}
