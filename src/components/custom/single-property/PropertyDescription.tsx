import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

export default function PropertyDescription({
  property,
}: {
  property: PropertyViewSchema;
}) {
  const { description } = property;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="title-section mb-3">Descrição</h2>

          <div className="glass-card p-8 md:p-12">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {description}
            </p>

            <hr />
          </div>
        </div>
      </div>
    </section>
  );
}
