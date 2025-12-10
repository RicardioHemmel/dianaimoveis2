import mongoose from "mongoose";
import { propertyDefaultSchema } from "@/lib/db/models/property/propertyModelSchema";

const PropertySchema = propertyDefaultSchema

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
