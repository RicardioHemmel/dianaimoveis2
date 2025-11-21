import mongoose, { Connection } from "mongoose";

export async function connectDB(): Promise<Connection> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI não definida no .env");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(uri, {
    dbName: "meuSite",
  });

  return mongoose.connection;
}
