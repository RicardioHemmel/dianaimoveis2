import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: "primary" | "accent" | "warm";
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  gradient = "primary" 
}: MetricCardProps) {
  const gradientClasses = {
    primary: "bg-gradient-primary",
    accent: "bg-gradient-accent",
    warm: "bg-gradient-warm",
  };

  const changeColor = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="relative overflow-hidden shadow-card hover:shadow-premium transition-shadow duration-300 animate-scale-in">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">{value}</h3>
          </div>
          <div className={`w-12 h-12 rounded-xl ${gradientClasses[gradient]} flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${changeColor[changeType]}`}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground">vs mês anterior</span>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${gradientClasses[gradient]}`} />
    </Card>
  );
}
