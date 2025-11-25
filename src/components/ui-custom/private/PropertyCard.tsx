import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Bed, Bath } from "lucide-react";

interface PropertyCardProps {
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  status: "available" | "sold" | "pending";
  imageUrl?: string;
}

export function PropertyCard({
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  status,
  imageUrl,
}: PropertyCardProps) {
  const statusColors = {
    available: "bg-success text-success-foreground",
    sold: "bg-muted text-muted-foreground",
    pending: "bg-warning text-warning-foreground",
  };

  const statusLabels = {
    available: "Disponível",
    sold: "Vendido",
    pending: "Pendente",
  };

  return (
    <Card className="overflow-hidden hover:shadow-premium transition-all duration-300 group cursor-pointer">
      <div className="relative h-48 bg-muted overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-primary">
            <Building2 className="h-16 w-16 text-white/30" />
          </div>
        )}
        <Badge className={`absolute top-3 right-3 ${statusColors[status]}`}>
          {statusLabels[status]}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">{title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">{price}</p>
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
