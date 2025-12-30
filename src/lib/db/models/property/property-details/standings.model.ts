import mongoose, { Schema } from "mongoose";

const standingSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_standings",
  }
);

export default mongoose.models.PropertyStanding ||
  mongoose.model("PropertyStanding", standingSchema);
