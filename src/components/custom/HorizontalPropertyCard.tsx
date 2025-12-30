// COMPONENTS
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ICONS
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";

import Link from "next/link";
import { PropertyData } from "@/lib/schemas/property/property-data";

interface PropertyCardHorizontalProps {
  property: PropertyData;
}

export function PropertyCardHorizontal({
  property,
}: PropertyCardHorizontalProps) {
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
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-64 h-48 md:h-auto bg-muted overflow-hidden flex-shrink-0">
          {property.coverImage ? (
            <img
              src={property.coverImage}
              alt={property.coverImage}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-primary">
              <Building2 className="h-16 w-16 text-white/30" />
            </div>
          )}
          <Badge className={`absolute top-3 left-3`}>
            {property.propertyStatus}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-xl text-foreground mb-2">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{property.address?.street}</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Bed className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {property.bedroomsQty} quartos
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Bath className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {property.bathbedroomsQty} banheiros
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-3xl font-bold text-primary">
                  {property.price}
                </p>

                <div className="flex items-center gap-2">
                  <Link href={`properties/${property._id}/edit`}>
                    Ver Detalhes
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
