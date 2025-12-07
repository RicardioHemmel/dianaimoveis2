import mongoose, { Schema } from "mongoose";

const StandingSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    strict: true,
    collection: "property_standings",
  }
);

export default mongoose.models.PropertyStanding ||
  mongoose.model("PropertyStanding", StandingSchema);
