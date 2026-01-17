import {
  Building2,
  Layers,
  Home,
  Building,
  Warehouse,
  Castle,
} from "lucide-react";

const propertyTypes = [
  {
    id: "studio",
    name: "Studio",
    description: "Ambiente integrado e funcional",
    icon: Building2,
    available: true,
  },
  {
    id: "apartamento",
    name: "Apartamento",
    description: "Unidades com dormitórios separados",
    icon: Building,
    available: true,
  },
  {
    id: "duplex",
    name: "Duplex",
    description: "Dois pavimentos conectados",
    icon: Layers,
    available: true,
  },
  {
    id: "triplex",
    name: "Triplex",
    description: "Três pavimentos de exclusividade",
    icon: Castle,
    available: false,
  },
  {
    id: "cobertura",
    name: "Cobertura",
    description: "Vista panorâmica e terraço privativo",
    icon: Home,
    available: true,
  },
  {
    id: "garden",
    name: "Garden",
    description: "Área externa privativa",
    icon: Warehouse,
    available: false,
  },
];

const PropertyTypes = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Tipos Disponíveis</h2>
          <p className="section-subtitle">
            Escolha o formato ideal para o seu estilo de vida
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {propertyTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <div
                key={type.id}
                className={`
                  relative group cursor-pointer
                  rounded-2xl p-6 text-center
                  transition-all duration-500 ease-out
                  ${
                    type.available
                      ? "glass-card hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-2"
                      : "bg-muted/30 border border-border/30 opacity-60"
                  }
                `}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Glow effect for available types */}
                {type.available && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                {/* Icon container */}
                <div
                  className={`
                    relative mx-auto mb-4 w-14 h-14 rounded-xl
                    flex items-center justify-center
                    transition-all duration-500
                    ${
                      type.available
                        ? "bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-secondary/20 group-hover:to-secondary/10 group-hover:scale-110"
                        : "bg-muted/50"
                    }
                  `}
                >
                  <IconComponent
                    className={`
                      w-7 h-7 transition-all duration-500
                      ${
                        type.available
                          ? "text-primary group-hover:text-secondary"
                          : "text-muted-foreground/50"
                      }
                    `}
                  />
                </div>

                {/* Type name */}
                <h3
                  className={`
                    font-display text-lg font-semibold mb-1
                    transition-colors duration-300
                    ${
                      type.available
                        ? "text-foreground group-hover:text-secondary"
                        : "text-muted-foreground/50"
                    }
                  `}
                >
                  {type.name}
                </h3>

                {/* Description */}
                <p
                  className={`
                    text-xs leading-relaxed
                    ${
                      type.available
                        ? "text-muted-foreground"
                        : "text-muted-foreground/40"
                    }
                  `}
                >
                  {type.description}
                </p>

                {/* Availability badge */}
                {type.available ? (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      Disponível
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                    <span className="text-xs font-medium text-muted-foreground/50">
                      Indisponível
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary info */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm">
            <span className="font-medium text-secondary">
              {propertyTypes.filter((t) => t.available).length}
            </span>{" "}
            tipos disponíveis neste empreendimento
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;
