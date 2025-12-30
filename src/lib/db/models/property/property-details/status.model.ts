import mongoose, { Schema } from "mongoose";

const statusSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_status",
  }
);

export default mongoose.models.PropertyStatus ||
  mongoose.model("PropertyStatus", statusSchema);
