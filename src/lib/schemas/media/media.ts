export interface Media {
  id: string;
  ownerType: "PROPERTY";
  ownerId: string;
  purpose: "COVER" | "GALLERY" | "FLOORPLAN" | "PROPERTY_FACT_SHEET";
  path: string;
  mimeType: string;
  status: "PENDING" | "AVAILABLE" | "ERROR";
  createdAt: Date;
}
