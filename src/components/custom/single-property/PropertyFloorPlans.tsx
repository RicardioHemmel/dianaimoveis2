"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";
import { Img } from "@react-email/components";

interface PropertyFloorPlansProps {
  floorPlanGallery: PropertyInputSchema["floorPlanGallery"];
}

export default function PropertyFloorPlans({
  floorPlanGallery,
}: PropertyFloorPlansProps) {
  const [activePlan, setActivePlan] = useState(0);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section">Plantas</h2>
          <p className="subtitle-section">Conheça os layouts disponíveis</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Plan Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {floorPlanGallery.map((img, index) => (
              <Button
                key={img.key}
                variant={activePlan === index ? "gold" : "outline"}
                onClick={() => setActivePlan(index)}
              >
                {img.label}
              </Button>
            ))}
          </div>

          {/* Plan Display */}
          <div className="glass-card p-8 overflow-hidden">
            <div className="relative aspect-square max-w-md mx-auto">
              <img
                src={floorPlanGallery[activePlan].label}
                alt={floorPlanGallery[activePlan].label}
                className="w-full h-full object-contain transition-all duration-500"
              />
            </div>
            <p className="text-center text-muted-foreground mt-6">
              {floorPlanGallery[activePlan].label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
