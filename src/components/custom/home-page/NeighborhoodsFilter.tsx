import Link from "next/link";
import { ArrowRight, MapPin, Building, Home } from "lucide-react";
import { getQtyPropertiesOnNeighborhoods } from "@/lib/services/properties/queries/homePage/query.service";

interface Neighborhood {
  name: string;
  image: string;
  propertyCount?: number;
  description: string;
}

const neighborhoodData: Neighborhood[] = [
  {
    name: "Brooklin",
    image: "/banners/neighborhoodBrooklin.png",
    description: "Onde o dinamismo dos negócios encontra a sofisticação",
  },
  {
    name: "Chácara Santo Antônio",
    image: "/banners/neighborhoodChacaraSantoAntonio.png",
    description: "O equilíbrio ideal entre modernidade e tradição.",
  },
  {
    name: "Alto da Boa Vista",
    image: "/banners/neighborhoodAltoDaBoaVista.png",
    description: "Seu refúgio verde e exclusivo dentro da cidade.",
  },
  {
    name: "Pinheiros",
    image: "/banners/neighborhoodPinheiros.png",
    description: "O vibrante ponto de encontro de tendências e sabores.",
  },
];

export function NeighborhoodCard({
  neighborhood,
}: {
  neighborhood: Neighborhood;
}) {
  return (
    <Link
      href={`/properties?address=${neighborhood.name}`}
      className="group relative block h-80 md:h-[400px] overflow-hidden rounded-xl"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${neighborhood.image})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Property Count Badge */}
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-medium text-card-foreground backdrop-blur-sm">
            <Building className="h-3.5 w-3.5" />
            {neighborhood.propertyCount} imóveis
          </span>
        </div>

        {/* Name and Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <h3 className="text-lg font-semibold text-card tracking-tight">
              {neighborhood.name}
            </h3>
          </div>
          <p className="text-sm text-card/80 line-clamp-2">
            {neighborhood.description}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent">
          <span className="transition-all duration-300 group-hover:mr-1">
            Ver imóveis
          </span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-accent/50" />
    </Link>
  );
}

export async function NeighborhoodsSection() {
  // 1. Extract names for the query
  const neighborhoodNames = neighborhoodData.map((n) => n.name);

  // 2. Fetch counts from MongoDB
  const counts = await getQtyPropertiesOnNeighborhoods(neighborhoodNames);

  // 3. Merge counts into the static data
  const neighborhoodsWithCounts = neighborhoodData.map((n) => {
    const countData = counts.find((c) => c.neighborhood === n.name);
    return {
      ...n,
      propertyCount: countData ? countData.total : 0,
    };
  });
  return (
    <section className="py-16 md:py-24 bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Home className="size-5 text-action-primary" />
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Explore por região
              </span>
            </div>
            <h2 className="tracking-tight title-section">
              Encontre seu próximo lar nos melhores bairros
            </h2>
            <p className="max-w-2xl text-muted-foreground text-pretty">
              Descubra imóveis exclusivos nas regiões mais valorizadas de São
              Paulo. Cada bairro com sua personalidade única e qualidade de vida
              incomparável.
            </p>
          </div>

          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 rounded-lg bg-hero-bg hover:bg-hero-bg-hover px-5 py-3 text-sm font-medium text-white transition-all "
          >
            Ver todos os bairros
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {neighborhoodsWithCounts.map((neighborhood, i) => (
            <NeighborhoodCard key={i} neighborhood={neighborhood} />
          ))}
        </div>
      </div>
    </section>
  );
}
