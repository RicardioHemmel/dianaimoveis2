import {
  PropertyInputSchema,
  AddressSchema,
  RangeSchema,
  ToggleFieldSchema,
  GalleryItemInputSchema,
  PropertyViewSchema,
} from "@/lib/schemas/property/property.schema";
import {
  IProperty,
  IPropertyPopulated,
  IPopulatedRef,
} from "@/lib/schemas/property/IProperty";
import { Types } from "mongoose";
import { resolveImageUrl } from "@/lib/media/resolveImageUrl"; // GENERATES URL FROM ENV FILE

type ViewRef = {
  _id: string;
  name: string;
};

export class PropertyMapper {
  // ------------------------------------------------------ HELPERS ------------------------------------------

  // ---------------- RANGE FIELDS ----------------
  private static toPersistenceRange(
    range: RangeSchema | undefined
  ): RangeSchema | null {
    if (!range) return null;
    return { min: range.min, max: range.max };
  }

  private static toDomainRange(
    range: RangeSchema | null
  ): RangeSchema | undefined {
    if (!range) return undefined;
    return {
      min: range.min,
      max: range.max,
    };
  }

  // ---------------- TOGGLE FIELDS ----------------
  private static toPersistenceToggleField(
    toggleField: ToggleFieldSchema | undefined
  ): ToggleFieldSchema | null {
    if (!toggleField) return null;

    return {
      value: toggleField.value,
      show: toggleField.show,
    };
  }

  private static toDomainToggleField(
    toggleField: ToggleFieldSchema | null
  ): ToggleFieldSchema | undefined {
    if (!toggleField) return undefined;
    return {
      value: toggleField.value,
      show: toggleField.show,
    };
  }

  // ---------------- GALLERY  ----------------
  private static toPersistenceImages(
    gallery: GalleryItemInputSchema[]
  ): GalleryItemInputSchema[] {
    if (!gallery.length) return [];
    return gallery.map((image) => ({
      key: image.key,
      order: image.order,
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
  private static toPersistenceAddress(address?: AddressSchema | null) {
    if (!address) return null;

    return {
      street: address.street || null,
      neighborhood: address.neighborhood || null,
      city: address.city || null,
      stateUf: address.stateUf || null,
      zipCode: address.zipCode || null,
    };
  }

  private static toDomainAddress(address?: IProperty["address"]) {
    if (!address) return undefined;
    return {
      street: address.street ?? undefined,
      neighborhood: address.neighborhood ?? undefined,
      city: address.city ?? undefined,
      stateUf: address.stateUf ?? undefined,
      zipCode: address.zipCode ?? undefined,
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
    refs?: { _id: Types.ObjectId; name: string }[]
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
      deliveryDate: property.deliveryDate || null,
      condominiumFee: property.condominiumFee || null,
      constructionCompany: property.constructionCompany || null,
      videoUrl: property.videoUrl || null,
      description: property.description || null,

      // TOGGLE FIELDS
      isFurnished: this.toPersistenceToggleField(property.isFurnished),
      isNearSubway: this.toPersistenceToggleField(property.isNearSubway),
      isFeatured: this.toPersistenceToggleField(property.isFeatured),
      showSquareMeterPrice: this.toPersistenceToggleField(
        property.showSquareMeterPrice
      ),
      isPetFriendly: this.toPersistenceToggleField(property.isPetFriendly),

      // GALLERY
      gallery: this.toPersistenceImages(property.gallery),
      floorPlanGallery: this.toPersistenceImages(property.floorPlanGallery),

      //ADDRESS
      address: this.toPersistenceAddress(property?.address),

      // REFERENCES
      propertyType: new Types.ObjectId(property.propertyType._id), // REQUIRED
      propertyPurpose: this.toObjectId(property.propertyPurpose), // OPTIONAL
      propertyStanding: this.toObjectId(property.propertyStanding), // OPTIONAL
      propertyTypology: this.toObjectId(property.propertyTypology), // OPTIONAL
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
      deliveryDate: property.deliveryDate ?? "",
      constructionCompany: property.constructionCompany ?? "",
      videoUrl: property.videoUrl ?? "",
      description: property.description ?? "",

      isFurnished: this.toDomainToggleField(property.isFurnished),
      isNearSubway: this.toDomainToggleField(property.isNearSubway),
      isFeatured: this.toDomainToggleField(property.isFeatured),
      showSquareMeterPrice: this.toDomainToggleField(
        property.showSquareMeterPrice
      ),
      isPetFriendly: this.toDomainToggleField(property.isPetFriendly),

      floorPlanGallery:
        property?.floorPlanGallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],

      gallery:
        property?.gallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],

      address: this.toDomainAddress(property?.address),

      propertyType: {
        _id: property?.propertyType?._id.toString(),
        name: property?.propertyType?.name,
      },
      propertyPurpose: this.mapPopulatedRefToView(property?.propertyPurpose),
      propertyStanding: this.mapPopulatedRefToView(property?.propertyStanding),
      propertyTypology: this.mapPopulatedRefToView(property?.propertyTypology),
      propertyAmenities: this.mapPopulatedRefArrayToView(
        property?.propertyAmenities
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
      deliveryDate: property.deliveryDate ?? "",
      constructionCompany: property.constructionCompany ?? "",
      videoUrl: property.videoUrl ?? "",
      description: property.description ?? "",

      isFurnished: this.toDomainToggleField(property.isFurnished),
      isNearSubway: this.toDomainToggleField(property.isNearSubway),
      isFeatured: this.toDomainToggleField(property.isFeatured),
      showSquareMeterPrice: this.toDomainToggleField(
        property.showSquareMeterPrice
      ),
      isPetFriendly: this.toDomainToggleField(property.isPetFriendly),

      floorPlanGallery:
        property?.floorPlanGallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],

      gallery:
        property?.gallery?.map((img) => ({
          key: img.key,
          order: img.order,
          url: resolveImageUrl(img.key),
        })) ?? [],

      address: this.toDomainAddress(property?.address),

      propertyType: {
        _id: property?.propertyType?._id.toString(),
        name: property?.propertyType?.name,
      },
      propertyPurpose: property.propertyPurpose?._id.toString(),
      propertyStanding: property.propertyStanding?._id.toString(),
      propertyTypology: property.propertyTypology?._id.toString(),
      propertyAmenities: property.propertyAmenities.map((amenity) =>
        amenity._id.toString()
      ),
    };
  }

  static PropertyDetailToView(PropertyDetail: IPopulatedRef) {
    return {
      _id: PropertyDetail._id.toString(),
      name: PropertyDetail.name,
    };
  }
}
