import mongoose, { Schema } from "mongoose";

const DeliveryStatusSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
},
  {
    strict: true,
    collection: "property_deliveryStatus",
  });

export default mongoose.models.PropertyDeliveryStatus ||
  mongoose.model("PropertyDeliveryStatus", DeliveryStatusSchema);
