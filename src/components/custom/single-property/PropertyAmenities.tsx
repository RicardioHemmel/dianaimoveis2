import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { CircleCheckBig } from "lucide-react";

export default function PropertyAmenities({
  amenities,
}: {
  amenities: PropertyViewSchema["propertyAmenities"];
}) {
  return (
    <section className="py-16 bg-hero-bg text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Lazer & Comodidades
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-6xl mx-auto">
          {amenities?.map((amenity) => (
            <div
              key={amenity._id}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 transition-all duration-300 ease-out
                 hover:bg-primary-foreground/20 hover:border-secondary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/10"
            >
              <CircleCheckBig className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
