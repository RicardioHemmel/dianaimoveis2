interface GalleryItem {
  imageRef: string;
  order: number;
}

export interface PropertyData {
  _id: string;
  title: string;
  description: string;

  price: number;
  bedroomsQty: number;
  suitesQty: number;
  bathbedroomsQty: number;
  parkingSpacesQty: number;
  area: number;
  condominiumFee: number;
  floorStart: number;
  floorEnd: number;

  isFurnished: boolean;
  isNearSubway: boolean;
  isFeatured: boolean;

  propertyType: string;
  propertyPurpose: string;
  propertyStanding: string;
  propertyStatus: string;
  propertyTypology: string;
  propertyAmenities: string;

  coverImage: string;
  propertyGallery: GalleryItem[];
  propertyFloorPlanGallery: GalleryItem[];
  videoUrl: string;

  status: "DRAFT" | "PUBLISHED";

  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };

  isActive: boolean;
  userId: string;
}
