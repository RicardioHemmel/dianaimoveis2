import mongoose, { Schema } from "mongoose";

const PurposeSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
},
  {
    strict: true,
    collection: "property_purposes",
  });

export default mongoose.models.PropertyPuporse ||
  mongoose.model("PropertyPurpose", PurposeSchema);
