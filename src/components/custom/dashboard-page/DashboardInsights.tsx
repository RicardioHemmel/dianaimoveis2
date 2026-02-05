"use client";

import { TrendingUp, Sparkles } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type MonthlyRegistration = {
  name: string;
  cadastros: number;
};

type ApartmentStandard = {
  name: string;
  value: number;
  color: string;
};

interface DashboardInsightsProps {
  monthlyRegistrations: MonthlyRegistration[];
  apartmentStandards: ApartmentStandard[];
}

export function DashboardInsights({
  monthlyRegistrations,
  apartmentStandards,
}: DashboardInsightsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cadastros por Mês */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Cadastros por Mês
          </h3>
          <Badge variant="secondary" className="bg-success/10 text-success">
            <TrendingUp className="h-3 w-3 mr-1" />
            +27%
          </Badge>
        </div>
        <ChartContainer
          config={{
            cadastros: {
              label: "Cadastros",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[280px]"
        >
          <BarChart data={monthlyRegistrations}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-muted-foreground" />
            <YAxis className="text-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="cadastros"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </Card>

      {/* Distribuição por Padrão */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Distribuição por Padrão
          </h3>
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <ChartContainer
          config={{
            popular: {
              label: "Popular",
              color: "hsl(var(--secondary))",
            },
            medio: {
              label: "Médio Padrão",
              color: "hsl(var(--primary))",
            },
            alto: {
              label: "Alto Padrão",
              color: "hsl(var(--accent))",
            },
            altissimo: {
              label: "Altíssimo Padrão",
              color: "hsl(var(--warning))",
            },
          }}
          className="h-[280px]"
        >
          <PieChart>
            <Pie
              data={apartmentStandards}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {apartmentStandards.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
        <div className="flex justify-center gap-6 mt-4">
          {apartmentStandards.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
