import { propertyTypologySelectMapper } from "@/lib/formatters/ui-formatters/property-typologies";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

export default function PropertyTypes({
  typologies,
}: {
  typologies: PropertyViewSchema["propertyTypologies"];
}) {
  const mappedTypologies = propertyTypologySelectMapper(typologies);
  return (
    <section className="py-16 bg-surface-base">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section">Tipologias Disponíveis</h2>
          <p className="subtitle-section">
            Escolha o formato ideal para o seu estilo de vida
          </p>
        </div>

        <div className="flex justify-center gap-6 mx-auto">
          {mappedTypologies?.map((typology) => {
            return (
              <div
                key={typology._id}
                className="
                  min-h-60
                  min-w-60
                  max-w-60
                  relative group cursor-pointer
                  rounded-2xl p-6 text-center
                  transition-all duration-500 ease-out
                  bg-white border hover:border-action-primary hover:shadow-lg hover:shadow-action-primary/30 hover:-translate-y-2
                "
              >
                {/* GLOW EFFECT FOR AVAILABLE TYPES */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-action-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* ICON CONTAINER */}
                <div
                  className="
                    relative mx-auto mb-4 size-14 rounded-xl
                    flex items-center justify-center
                    transition-all duration-500
                    bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-action-primary/20 group-hover:to-action-primary/10 group-hover:scale-110"
                >
                  <typology.icon
                    className="
                      w-7 h-7 transition-all duration-500
                    text-primary group-hover:text-action-primary
                    "
                  />
                </div>

                {/* TYPOLOGY NAME */}
                <h3
                  className={`
                    font-display text-lg font-semibold mb-1
                    transition-colors duration-300
                    text-foreground group-hover:text-action-primary
                  
                  `}
                >
                  {typology.name}
                </h3>

                {/* TYPOLOGY DESCRIPTION */}
                <p className="text-xs leading-relaxed">
                  {typology.description}
                </p>

                {/* AVAILABILITY BADGE */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    Disponível
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY INFO */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm">
            <span className="font-bold text-action-primary">
              {mappedTypologies?.length}
            </span>{" "}
            tipos disponíveis neste empreendimento
          </p>
        </div>
      </div>
    </section>
  );
}
