import slugify from "slugify";
import PropertyDeliveryStatus from "@/lib/db/models/property/status.model";
import { STATUS } from "@/lib/constants/properties/property-status";

export async function statusSeed() {
  const deliveryStatus = STATUS.map((name) => {
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
