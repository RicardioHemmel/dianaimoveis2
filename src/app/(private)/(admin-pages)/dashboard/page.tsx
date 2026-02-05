import { auth } from "@/auth";
import {
  countPropertiesByStanding,
  countPropertiesByTypology,
  getPropertiesSummaryCount,
} from "@/lib/services/properties/queries/dashboardPage/query.service";
import { propertyStandingMapper } from "@/lib/formatters/ui-formatters/property-standings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Plus,
  Building2,
  CheckCircle2,
  Pencil,
  Layers2,
  Layers,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PROPERTY_STANDINGS } from "@/lib/constants/properties/property-standings";
import { PropertyStandingsChart } from "@/components/custom/dashboard-page/propertyStandingsChart";
import { PropertyTypologiesChart } from "@/components/custom/dashboard-page/PropertyTypologiesChart";

export const revalidate = 0; // Disable ISR, always fetch fresh data on each request

export default async function DashboardPage() {
  // QUERIES
  const [propertiesSummary, propertiesStandingCount, propertiesTypologyCount] =
    await Promise.all([
      getPropertiesSummaryCount(),
      countPropertiesByStanding(),
      countPropertiesByTypology(),
    ]);

  const standingsBase = PROPERTY_STANDINGS.map((name) => {
    const standing = propertiesStandingCount.find((s) => s.name === name);
    return {
      _id: standing?.standingId ?? name,
      name,
    };
  });
  const standings = propertyStandingMapper(standingsBase) ?? [];
  const standingsWithCount = standings.map((s) => ({
    ...s,
    qty: propertiesStandingCount.find((p) => p.name === s.name)?.total ?? 0,
    link: `/property-list?standing=${s._id}`,
  }));
  const summaryCards = [
    {
      label: "Total de imóveis",
      qty: Number(propertiesSummary.total ?? 0),
      icon: Building2,
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-600",
      link: "property-list/",
    },
    {
      label: "Imóveis publicados",
      qty: Number(propertiesSummary.published ?? 0),
      icon: CheckCircle2,
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-600",
      link: "property-list?status=PUBLISHED",
    },
    {
      label: "Imóveis rascunho",
      qty: Number(propertiesSummary.draft ?? 0),
      icon: Pencil,
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-600",
      link: "property-list?status=DRAFT",
    },
  ];
  const standingsChartData = standingsWithCount.map((standing) => ({
    name: standing.name,
    value: standing.qty,
    color:
      standing.name === "Popular"
        ? "#00bc7d"
        : standing.name === "Médio Padrão"
          ? "#2b7fff"
          : standing.name === "Alto Padrão"
            ? "#7008e7"
            : "#ff6900",
  }));

  const typologyColorMap: Record<string, string> = {
    Tipo: "#7f22fe",
    Loft: "#ff6900",
    Studio: "#00b8db",
    Garden: "#00bc7d",
    Duplex: "#2b7fff",
    Triplex: "#fb2c36",
    Cobertura: "#fe9a00",
    Kitnet: "#00bba7",
    Penthouse: "#f0b100",
  };

  const typologiesList = propertiesTypologyCount.map((typology, index) => ({
    name: typology.name,
    value: typology.total,
    color: typologyColorMap[typology.name],
    link: `/property-list?typology=${encodeURIComponent(typology.typologyId)}`,
  }));

  const typologiesChartData = typologiesList.map(({ name, value, color }) => ({
    name,
    value,
    color,
  }));

  const session = await auth();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-[image:var(--gradient-primary)] rounded-2xl p-8 text-white shadow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {`Bem-vindo de volta, ${session?.user.name}`!}
            </h2>
            <p className="text-white/80 max-w-lg">
              Seu portfólio de imóveis está crescendo! Você tem{" "}
              <span className="font-semibold text-white">
                {String(propertiesSummary.total ?? "")} imóveis
              </span>{" "}
              cadastrados.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold group whitespace-nowrap"
            asChild
          >
            <Link href="/properties/new">
              <Plus className="size-5 mr-2" />
              Cadastrar Apartamento
              <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* PROPERTY COUNTS METRIC */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card) => (
          <Link target="_blank" href={card.link} key={card.label}>
            <Card className="p-6 white-card transition-shadow duration-300 relative overflow-hidden group border">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "size-14 rounded-xl flex items-center justify-center",
                    card.bgColor,
                  )}
                >
                  <card.icon className={cn("size-7", card.textColor)} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {card.qty}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* PROPERTY STANDINGS METRIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {standingsWithCount.map((standard) => (
          <Link href={standard.link} key={standard._id} target="_blank">
            <Card className="p-6 white-card transition-shadow duration-300 relative overflow-hidden group border">
              <div
                className={cn(
                  "absolute top-0 right-0 size-20 rounded-full opacity-60 -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500",
                  standard.bgColor,
                )}
              />
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "size-14 rounded-xl flex items-center justify-center",
                    standard.bgColor,
                  )}
                >
                  <standard.icon className={cn("size-7", standard.textColor)} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {standard.name}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {standard.qty}
                  </p>
                  <p className="text-xs text-muted-foreground">apartamentos</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* PROPERTY TYPOLOGIES METRIC */}
      <Card className="p-6 shadow-card white-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[image:var(--gradient-primary)] flex items-center justify-center">
              <Layers className="size-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Tipologias
              </h3>
              <p className="text-sm text-muted-foreground">
                Distribuição de imóveis por tipologia
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {typologiesList.map((typology) => (
            <Link
              href={typology.link}
              key={typology.name}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border bg-card hover:shadow-md transition-shadow"
              style={{ borderColor: typology.color }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: typology.color }}
              />
              <span className="text-sm font-medium text-foreground">
                {typology.name}
              </span>
              <span
                className="text-sm font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: typology.color }}
              >
                {typology.value}
              </span>
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* PIZZA STANDINGS CHART*/}
        <Card className="p-6 white-card border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Imóveis por Porte
            </h3>
          </div>
          <PropertyStandingsChart apartmentStandards={standingsChartData} />
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {standingsChartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* PIZZA TYPOLOGIES CHART */}
        <Card className="p-6 white-card border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Imóveis por Tipologia
            </h3>
          </div>
          {typologiesChartData.length > 0 ? (
            <>
              <PropertyTypologiesChart typologies={typologiesChartData} />
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {typologiesChartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhuma tipologia cadastrada.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
