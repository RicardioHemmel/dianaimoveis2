import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";

export async function getProperties() {
  try {
    await connectMongoDB();

    const properties = await Property.find().lean();

if (!properties || properties.length === 0) return;
    


  } catch (error) {
    console.error("Erro ao buscar imóveis no DB:", error);
    return null; 
  }
}