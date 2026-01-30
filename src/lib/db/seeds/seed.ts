import "dotenv/config";

import mongoose from "mongoose";
import connectMongoDB from "../mongodbConnection";
import { amenitiesSeed } from "./properties/amenities.seed";
import { typesSeed } from "./properties/types.seed";
import { purposesSeed } from "./properties/purposes.seed";
import { standingsSeed } from "./properties/standings.seed";
import { typologiesSeed } from "./properties/typologies.seed";
import { ConstructionCompaniesSeed } from "./properties/construction-company.seed";

async function runSeed() {
  try {
    // Connect once
    await connectMongoDB();

    // Run all seeds
    await amenitiesSeed();
    await purposesSeed();
    await standingsSeed();
    await typesSeed();
    await typologiesSeed();
    await ConstructionCompaniesSeed();

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
