import "dotenv/config";

import mongoose from "mongoose";
import connectMongoDB from "../mongodbConnection";
import { amenitiesSeed } from "./properties/amenities.seed";
import { typesSeed } from "./properties/types.seed";
import { deliveryStatusSeed } from "./properties/delivery-status.seed";
import { purposesSeed } from "./properties/purposes.seed";
import { standingsSeed } from "./properties/standings.seed";
import { typologiesSeed } from "./properties/typologies.seed";

async function runSeed() {
  try {
    // Connect once
    await connectMongoDB();

    // Run all seeds
    await amenitiesSeed();
    await deliveryStatusSeed();
    await purposesSeed();
    await standingsSeed();
    await typesSeed();
    await typologiesSeed();

    console.log("Todas as seeds foram executadas com sucesso.");

    // Close DB connection
    await mongoose.connection.close();

    // Close terminal
    process.exit(0);
  } catch (err) {
    console.error("Erro ao rodar seeds:", err);
    process.exit(1);
  }
}

runSeed();
