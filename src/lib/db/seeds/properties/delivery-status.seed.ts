import slugify from "slugify";
import PropertyDeliveryStatus from "@/lib/db/models/property/delivery-status.model";
import { DELIVERY_STATUS } from "@/lib/constants/properties/property-delivery-status";

export async function deliveryStatusSeed() {
  const deliveryStatus = DELIVERY_STATUS.map((name) => {
    const slug = slugify(name, { lower: true, strict: true, trim: true });
    return { _id: slug, name };
  });

  for (const deliveryStatusItem of deliveryStatus) {
    await PropertyDeliveryStatus.updateOne(
      { _id: deliveryStatusItem._id },
      {
        $set: deliveryStatusItem,
      },
      { upsert: true }
    );
  }

  console.log("DeliveryStatus seed finalizada.");
}
