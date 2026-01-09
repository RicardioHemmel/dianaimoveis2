import { Button } from "@/components/ui/button";

const similarProperties = [
  {
    id: 1,
    name: "Vista Pinheiros",
    location: "Pinheiros, São Paulo",
    price: "R$ 750.000",
    area: "45m²",
    image: "propertyHero",
  },
  {
    id: 2,
    name: "Sky Residence",
    location: "Itaim Bibi, São Paulo",
    price: "R$ 1.200.000",
    area: "68m²",
    image: "propertyHero",
  },
  {
    id: 3,
    name: "Urban Living",
    location: "Brooklin, São Paulo",
    price: "R$ 890.000",
    area: "52m²",
    image: "propertyHero",
  },
];

export default function PropertySimilar() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Imóveis Similares</h2>
          <p className="section-subtitle">
            Outros empreendimentos que podem te interessar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {similarProperties.map((property) => (
            <div
              key={property.id}
              className="glass-card overflow-hidden hover-lift group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={"https://dianaimoveis.com/wp-content/uploads/2024/08/20240902160736271-1.jpg.webp"}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl font-semibold text-primary-foreground">
                    {property.name}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {property.location}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground text-sm">
                    {property.area}
                  </span>
                  <span className="font-display font-bold text-lg text-secondary">
                    {property.price}
                  </span>
                </div>
                <Button variant="ghost" className="w-full">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="gold" size="lg">
            Ver Todos os Imóveis
          </Button>
        </div>
      </div>
    </section>
  );
}
