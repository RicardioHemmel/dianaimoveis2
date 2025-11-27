import mongoose, { Schema } from "mongoose";

const StatusSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
},
  {
    strict: true,
    collection: "property_status",
  });

export default mongoose.models.PropertyStatus ||
  mongoose.model("PropertyStatus", StatusSchema);
