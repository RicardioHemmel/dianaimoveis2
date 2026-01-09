import {
  Waves,
  Dumbbell,
  Car,
  Users,
  Wifi,
  Shield,
  Coffee,
  TreeDeciduous,
  Baby,
  UtensilsCrossed,
  Dog,
  Gamepad2,
} from "lucide-react";

const amenities = [
  { icon: Waves, name: "Piscina" },
  { icon: Dumbbell, name: "Academia" },
  { icon: Car, name: "Vagas Cobertas" },
  { icon: Users, name: "Coworking" },
  { icon: Wifi, name: "Wi-Fi" },
  { icon: Shield, name: "Segurança 24h" },
  { icon: Coffee, name: "Lounge" },
  { icon: TreeDeciduous, name: "Jardim" },
  { icon: Baby, name: "Kids" },
  { icon: UtensilsCrossed, name: "Gourmet" },
  { icon: Dog, name: "Pet Place" },
  { icon: Gamepad2, name: "Games" },
];

export default function PropertyAmenities() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Lazer & Comodidades
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20"
            >
              <amenity.icon className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-primary-foreground">
                {amenity.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
