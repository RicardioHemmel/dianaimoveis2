import {
  PropertyInputSchema,
  AddressSchema,
  RangeSchema,
  ToggleFieldSchema,
  GalleryItemInputSchema,
  FloorPlanGalleryItemInputSchema,
  PropertyViewSchema,
  PropertyBaseSchema,
  NeighborhoodSchema,
} from "@/lib/schemas/property/property.schema";
import {
  IProperty,
  IPropertyPopulated,
  IPopulatedRef,
  IRangeSchema,
  IToggleFieldSchema,
  IGallerySchema,
  IFloorPlanGallerySchema,
  INeighborhood,
} from "@/lib/schemas/property/IProperty";
import { Types } from "mongoose";
import { resolveImageUrl } from "@/lib/media/resolveImageUrl"; // GENERATES URL FROM ENV FILE
import { toUTCDate, toDateInputValue } from "@/lib/formatters/dates";

type ViewRef = {
  _id: string;
  name: string;
};

export class PropertyMapper {
  // ------------------------------------------------------ HELPERS ------------------------------------------

  // ---------------- RANGE FIELDS ----------------
  private static toPersistenceRange(
    range: RangeSchema | undefined,
  ): IRangeSchema | null {
    if (!range) return null;
    return { min: range.min, max: range.max };
  }

  private static toDomainRange(
    range: IRangeSchema | null,
  ): RangeSchema | undefined {
    if (!range) return undefined;
    return {
      min: range.min,
      max: range.max,
    };
  }

  // ---------------- TOGGLE FIELDS ----------------
  private static toPersistenceToggleField(
    toggleField: ToggleFieldSchema,
  ): IToggleFieldSchema {
    return {
      value: toggleField.value,
      show: toggleField.show,
    };
  }

  private static toDomainToggleField(
    toggleField: IToggleFieldSchema,
  ): ToggleFieldSchema {
    return {
      value: toggleField.value,
      show: toggleField.show,
    };
  }

  // ---------------- GALLERY  ----------------
  private static toPersistenceGallery(
    gallery: GalleryItemInputSchema[],
  ): IGallerySchema[] {
    if (!gallery.length) return [];
    return gallery.map((image) => ({
      key: image.key,
      order: image.order,
    }));
  }

  private static toPersistenceFloorPlanGallery(
    gallery: FloorPlanGalleryItemInputSchema[],
  ): IFloorPlanGallerySchema[] {
    if (!gallery.length) return [];
    return gallery.map((image) => ({
      key: image.key,
      order: image.order,
      label: image.label,
    }));
  }

  // ---------------- IDS ----------------
  private static toObjectId(id?: string) {
    return id ? new Types.ObjectId(id) : null;
  }

  private static toObjectIdArray(ids?: string[]) {
    return ids?.map((id) => new Types.ObjectId(id)) ?? [];
  }

  // ---------------- ADDRESS ----------------
  private static toPersistenceAddress(
    address?: AddressSchema | null,
  ): IProperty["address"] {
    if (!address) return null;

    return {
      street: address.street || null,
      neighborhood: address.neighborhood
        ? {
            _id: new Types.ObjectId(address.neighborhood._id),
            name: address.neighborhood.name,
          }
        : null,
      city: address.city || null,
      stateUf: address.stateUf || null,
      zipCode: address.zipCode || null,
      referencePoint: address.referencePoint || null,
      lat: address.lat || null,
      lng: address.lng || null,
    };
  }

  private static toDomainAddress(
    address?: IProperty["address"],
  ): PropertyBaseSchema["address"] {
    if (!address) return undefined;
    return {
      street: address.street ?? "",
      neighborhood: address.neighborhood
        ? {
            _id: address.neighborhood._id?.toString(),
            name: address.neighborhood.name,
          }
        : undefined,
      city: address.city ?? "",
      stateUf: address.stateUf ?? "",
      zipCode: address.zipCode ?? "",
      referencePoint: address.referencePoint ?? undefined,
      lat: address.lat ?? undefined,
      lng: address.lng ?? undefined,
    };
  }

  private static mapPopulatedRefToView(ref?: IPopulatedRef) {
    if (!ref) return undefined;

    return {
      _id: ref._id.toString(),
      name: ref.name,
    };
  }

  private static mapPopulatedRefArrayToView(
    refs?: { _id: Types.ObjectId; name: string }[],
  ) {
    return (
      (refs?.map(this.mapPopulatedRefToView).filter(Boolean) as ViewRef[]) ?? []
    );
  }

  // ---------------------------------- TO PERSISTENCE (INPUT -> DB) ------------------------------
  static toPersistence(property: PropertyInputSchema): IProperty {
    if (!property.propertyType) {
      throw new Error("propertyType é obrigatório para salvar o imóvel");
    }

    return {
      title: property.title,
      price: property.price,

      // DRAFT | PUBLISHED
      status: property.status,

      // RANGES MAPPING
      bedrooms: this.toPersistenceRange(property.bedrooms),
      suites: this.toPersistenceRange(property.suites),
      bathrooms: this.toPersistenceRange(property.bathrooms),
      parkingSpaces: this.toPersistenceRange(property.parkingSpaces),
      area: this.toPersistenceRange(property.area),
      floors: this.toPersistenceRange(property.floors),

      // OTHER FIELDS
      deliveryDate: property.deliveryDate
        ? toUTCDate(property.deliveryDate)
        : null,

      condominiumFee: property.condominiumFee || null,
      constructionCompany: property.constructionCompany
        ? {
            _id: new Types.ObjectId(property.constructionCompany._id),
            name: property.constructionCompany.name,
          }
        : null,
      videoUrl: property.videoUrl || null,
      description: property.description || null,

      // TOGGLE FIELDS
      isFeatured: property.isFeatured,
      isFurnished: this.toPersistenceToggleField(property.isFurnished),
      isNearSubway: this.toPersistenceToggleField(property.isNearSubway),
      isPetFriendly: this.toPersistenceToggleField(property.isPetFriendly),

      // GALLERY
      gallery: this.toPersistenceGallery(property.gallery),
      floorPlanGallery: this.toPersistenceFloorPlanGallery(
        property.floorPlanGallery,
      ),

      //ADDRESS
      address: this.toPersistenceAddress(property?.address),

      // REFERENCES
      propertyType: new Types.ObjectId(property.propertyType._id), // REQUIRED
      propertyPurpose: this.toObjectId(property.propertyPurpose), // OPTIONAL
      propertyStanding: this.toObjectId(property.propertyStanding), // OPTIONAL
      propertyTypologies: this.toObjectIdArray(property.propertyTypologies), // OPTIONAL
      propertyAmenities: this.toObjectIdArray(property.propertyAmenities), // OPTIONAL
    };
  }

  // ---------------------------------- TO VIEW (DB -> FRONT DISPLAY) ------------------------------
  static toViewSchema(property: IPropertyPopulated): PropertyViewSchema {
    return {
      _id: property._id!.toString(),
      title: property.title,
      price: property.price,

      status: property.status,

      bedrooms: this.toDomainRange(property.bedrooms),
      suites: this.toDomainRange(property.suites),
      bathrooms: this.toDomainRange(property.bathrooms),
      parkingSpaces: this.toDomainRange(property.parkingSpaces),
      area: this.toDomainRange(property.area),
      floors: this.toDomainRange(property.floors),

      condominiumFee: property.condominiumFee ?? undefined,

      deliveryDate: toDateInputValue(property.deliveryDate),

      constructionCompany: property.constructionCompany
        ? {
            _id: property.constructionCompany._id?.toString() ?? "",
            name: property.constructionCompany.name,
          }
        : undefined,
      videoUrl: property.videoUrl ?? "",
      description: property.description ?? "",

      isFeatured: property.isFeatured,
      isFurnished: this.toDomainToggleField(property.isFurnished),
      isNearSubway: this.toDomainToggleField(property.isNearSubway),
      isPetFriendly: this.toDomainToggleField(property.isPetFriendly),

      floorPlanGallery:
        property?.floorPlanGallery?.map((img) => ({
          key: img.key,
          order: img.order,
          label: img.label,
          url: resolveImageUrl(img.key),
        })) ?? [],

      gallery:
        property?.gallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],

      address: this.toDomainAddress(property?.address),

      propertyType: property.propertyType
        ? this.mapPopulatedRefToView(property?.propertyType)
        : undefined,
      propertyPurpose: this.mapPopulatedRefToView(property?.propertyPurpose),
      propertyStanding: this.mapPopulatedRefToView(property?.propertyStanding),
      propertyTypologies: this.mapPopulatedRefArrayToView(
        property?.propertyTypologies,
      ),
      propertyAmenities: this.mapPopulatedRefArrayToView(
        property?.propertyAmenities,
      ),
    };
  }

  // ---------------------------------- TO VIEW (DB -> POPULATE PROPERTY FORM ) ------------------------------
  static toInputSchema(property: IPropertyPopulated): PropertyInputSchema {
    return {
      _id: property._id!.toString(),
      title: property.title,
      price: property.price,

      status: property.status,

      bedrooms: this.toDomainRange(property.bedrooms),
      suites: this.toDomainRange(property.suites),
      bathrooms: this.toDomainRange(property.bathrooms),
      parkingSpaces: this.toDomainRange(property.parkingSpaces),
      area: this.toDomainRange(property.area),
      floors: this.toDomainRange(property.floors),

      condominiumFee: property.condominiumFee ?? undefined,
      deliveryDate: toDateInputValue(property.deliveryDate),

      constructionCompany: property.constructionCompany
        ? {
            _id: property.constructionCompany._id?.toString() ?? "",
            name: property.constructionCompany.name,
          }
        : undefined,
      videoUrl: property.videoUrl ?? "",
      description: property.description ?? "",

      isFeatured: property.isFeatured,
      isFurnished: this.toDomainToggleField(property.isFurnished),
      isNearSubway: this.toDomainToggleField(property.isNearSubway),
      isPetFriendly: this.toDomainToggleField(property.isPetFriendly),

      gallery:
        property?.gallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],

      floorPlanGallery:
        property?.floorPlanGallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
          label: img.label,
        })) ?? [],

      address: this.toDomainAddress(property?.address),

      propertyType: property.propertyType
        ? {
            _id: property.propertyType._id.toString(),
            name: property.propertyType.name,
          }
        : null,
      propertyPurpose: property.propertyPurpose?._id.toString(),
      propertyStanding: property.propertyStanding?._id.toString(),
      propertyTypologies: property.propertyTypologies.map((typology) =>
        typology._id.toString(),
      ),
      propertyAmenities: property.propertyAmenities.map((amenity) =>
        amenity._id.toString(),
      ),
    };
  }

  static PropertyDetailToView(propertyDetail: IPopulatedRef) {
    return {
      _id: propertyDetail._id.toString(),
      name: propertyDetail.name,
    };
  }

  static PropertyNeighborhoodToSchema(
    neighborhood: INeighborhood,
  ): NeighborhoodSchema {
    return {
      _id: neighborhood._id.toString(),
      name: neighborhood.name,
    };
  }
}
