import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

export default function PropertyDescription({
  property,
}: {
  property: PropertyViewSchema;
}) {
  const { description } = property;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-8 text-4xl font-bold">Descrição</h2>

          <div className="glass-card p-8 md:p-12">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {description}
            </p>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-display text-3xl font-bold text-gradient-gold">
                    28
                  </p>
                  <p className="text-muted-foreground text-sm">Andares</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-gradient-gold">
                    196
                  </p>
                  <p className="text-muted-foreground text-sm">Unidades</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-gradient-gold">
                    4
                  </p>
                  <p className="text-muted-foreground text-sm">Torres</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
