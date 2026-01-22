import { useEffect, useState } from "react";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { VerticalPropertyCard } from "@/components/custom/property-cards/VerticalPropertyCard";
import { HorizontalPropertyCard } from "@/components/custom/property-cards/HorizontalPropertyCard";
import { cn } from "@/lib/utils";

interface MorphingCardProps {
  property: PropertyViewSchema;
  viewMode: "grid" | "list";
  index: number;
}

export function MorphingCard({
  property,
  viewMode = "grid",
  index,
}: MorphingCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // dispara a animação depois que o componente monta
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{ transitionDelay: `${index * 100}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
    >
      {viewMode === "grid" && <VerticalPropertyCard property={property} />}
      {viewMode === "list" && <HorizontalPropertyCard property={property} />}
    </div>
  );
}
