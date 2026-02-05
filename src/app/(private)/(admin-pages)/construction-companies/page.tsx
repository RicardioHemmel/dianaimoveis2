import { getCompaniesWithLinkedProperties } from "@/lib/services/properties/property-details/property-construction-company.service";
import { ConstructionCompaniesList } from "@/components/custom/construction-companies-page/ConstructionCompaniesList";
import { CreateConstructionCompanyCard } from "@/components/custom/construction-companies-page/CreateConstructionCompanyCard";

export default async function ConstructionCompaniesPage() {
  const companies = await getCompaniesWithLinkedProperties();

  return (
    <div className="container space-y-6 mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Construtoras</h1>
        <p className="text-muted-foreground">
          Gerencie as construtoras disponíveis para os imóveis
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <CreateConstructionCompanyCard />
        <ConstructionCompaniesList companies={companies} />
      </div>
    </div>
  );
}
