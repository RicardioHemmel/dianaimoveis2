import mongoose, { Schema } from "mongoose";

const StandingSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_standings",
  }
);

export default mongoose.models.PropertyStanding ||
  mongoose.model("PropertyStanding", StandingSchema);
