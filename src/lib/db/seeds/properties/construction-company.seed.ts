import ConstructionCompany from "@/lib/db/models/property/construction-company/construction-company.model";
import { CONSTRUCTION_COMPANIES } from "@/lib/constants/properties/construction-companies";

export async function ConstructionCompaniesSeed() {
  const companies = CONSTRUCTION_COMPANIES.map((name) => {
    return name;
  });

  for (const company of companies) {
    await ConstructionCompany.updateOne(
      { name: company },
      {
        $setOnInsert: { name: company },
      },
      { upsert: true },
    );
  }

  console.log("ConstructionCompanies seed finalizada.");
}
