"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import Image from "next/image";
interface PropertyFloorPlansProps {
  floorPlanGallery: PropertyViewSchema["floorPlanGallery"];
}

export default function PropertyFloorPlans({
  floorPlanGallery,
}: PropertyFloorPlansProps) {
  const [activePlan, setActivePlan] = useState(0);

  return (
    <section className="py-16 bg-surface-base">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section">Plantas</h2>
          <p className="subtitle-section">Conheça os layouts disponíveis</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FLOOR PLAN SELECTOR */}
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

          {/* FLOOR PLAN DISPLAY */}
          <div className="white-card pb-5 overflow-hidden">
            <div className="relative aspect-square max-w-xl mx-auto">
              <Image
                src={floorPlanGallery[activePlan].url}
                alt={floorPlanGallery[activePlan].key}
                className="w-full h-full object-contain transition-all duration-500"
                fill
              />
            </div>
            <p className="text-center mt-6">
              {floorPlanGallery[activePlan].label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
