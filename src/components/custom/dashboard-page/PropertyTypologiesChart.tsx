"use client";

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type PropertyTypologiesChartProps = {
  typologies: {
    name: string;
    value: number;
    color: string;
  }[];
};

export function PropertyTypologiesChart({
  typologies,
}: PropertyTypologiesChartProps) {
  return (
    <ChartContainer config={{}} className="h-[280px]">
      <BarChart data={typologies} layout="vertical" margin={{ left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis type="number" className="text-muted-foreground" />
        <YAxis
          dataKey="name"
          type="category"
          width={90}
          className="text-muted-foreground"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]}>
          {typologies.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
