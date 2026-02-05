import { getNeighborhoodsWithLinkedProperties } from "@/lib/services/properties/property-details/property-neighborhoods.service";
import { NeighborhoodsList } from "@/components/custom/neighborhoods-page/NeighborhoodsList";
import { CreateNeighborhoodCard } from "@/components/custom/neighborhoods-page/CreateNeighborhoodCard";

export default async function NeighborhoodsPage() {
  const neighborhoods = await getNeighborhoodsWithLinkedProperties();

  return (
    <div className="container space-y-6 mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bairros</h1>
        <p className="text-muted-foreground">
          Gerencie os bairros disponíveis para os imóveis
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <CreateNeighborhoodCard />
        <NeighborhoodsList neighborhoods={neighborhoods} />
      </div>
    </div>
  );
}
