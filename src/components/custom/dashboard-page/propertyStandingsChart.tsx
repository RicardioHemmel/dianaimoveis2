"use client";

import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type PropertyStandingsChartProps = {
  apartmentStandards: {
    name: string;
    value: number;
    color: string;
  }[];
};

export function PropertyStandingsChart({
  apartmentStandards,
}: PropertyStandingsChartProps) {
  return (
    <ChartContainer config={{}} className="h-[280px]">
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
  );
}
