"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import floorPlan from "@/assets/floor-plan.jpg";

const plans = [
  { id: 1, name: "Studio - 24m²", image: "" },
  { id: 2, name: "1 Dorm - 38m²", image: "" },
  { id: 3, name: "2 Dorms - 74m²", image: "" },
];

export default function PropertyFloorPlans() {
  const [activePlan, setActivePlan] = useState(0);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Plantas</h2>
          <p className="section-subtitle">Conheça os layouts disponíveis</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Plan Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {plans.map((plan, index) => (
              <Button
                key={plan.id}
                variant={activePlan === index ? "gold" : "outline"}
                onClick={() => setActivePlan(index)}
              >
                {plan.name}
              </Button>
            ))}
          </div>

          {/* Plan Display */}
          <div className="glass-card p-8 overflow-hidden">
            <div className="relative aspect-square max-w-md mx-auto">
              <img
                src={"https://dianaimoveis.com/wp-content/uploads/2024/08/20240902160736271-1.jpg.webp"}
                alt={plans[activePlan].name}
                className="w-full h-full object-contain transition-all duration-500"
              />
            </div>
            <p className="text-center text-muted-foreground mt-6">
              {plans[activePlan].name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
