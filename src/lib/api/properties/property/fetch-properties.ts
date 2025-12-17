import connectMongoDB from "@/lib/db/mongodbConnection";
import Property from "@/lib/db/models/property/property.model";
import { PropertyData } from "@/lib/schemas/property/property-data";

export async function getAllProperties(): Promise<PropertyData[] | null> {
  try {
    await connectMongoDB();

    const properties = await Property.find().lean();
        return properties.map(p => ({
        ...p,
        _id: p._id.toString()
    })) as PropertyData[];

  } catch (error) {
    console.error("Erro ao buscar imóveis no DB:", error);
    return null; 
  }
}