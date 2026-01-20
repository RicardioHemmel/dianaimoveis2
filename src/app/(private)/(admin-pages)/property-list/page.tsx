import { PropertyCardHorizontal } from "@/components/custom/HorizontalPropertyCard";
import { getAllPropertiesToView } from "@/lib/services/properties/properties-query.service";
import { Button } from "@/components/ui/button";
import { Building2, Home } from "lucide-react";
import Link from "next/link";

export default async function PropertiesListPage() {
  const properties = await getAllPropertiesToView();

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl scale-150" />
        <div className="relative bg-linear-to-br from-admin-primary/30 to-admin-primary/10 p-6 rounded-full border border-admin-primary/45">
          <Building2 className="h-16 w-16 text-admin-primary" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
        Nenhum imóvel cadastrado
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Seu portfólio está aguardando o primeiro imóvel! Comece agora e organize
        suas propriedades de forma profissional.
      </p>

      <Button
        size="lg"
        className="bg-admin-primary hover:bg-admin-primary/90 gap-2 text-base px-8"
        asChild
      >
        <Link href={"properties/new"}>
          <Home className="h-5 w-5" />
          Cadastrar Primeiro Imóvel
        </Link>
      </Button>
    </div>
  );

  return (
    <>
      {properties.length > 0 ? (
        <div className="flex flex-col gap-6">
          {properties.map((property) => (
            <PropertyCardHorizontal property={property} key={property._id} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState />
        </div>
      )}
    </>
  );
}
