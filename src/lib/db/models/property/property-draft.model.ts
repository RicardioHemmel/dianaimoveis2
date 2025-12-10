import mongoose from "mongoose";
import { propertyDefaultSchema } from "@/lib/db/models/property/propertyModelSchema";

const PropertyDraftSchema = propertyDefaultSchema;

export default mongoose.models.PropertyDraft ||
  mongoose.model("PropertyDraft", PropertyDraftSchema);
