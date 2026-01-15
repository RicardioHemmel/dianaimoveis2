import { RangeInput } from "@/components/custom/RangeInput";
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";
import { LucideIcon, ArrowRight } from "lucide-react";
import { FieldPath, UseFormReturn } from "react-hook-form";

type ColorVariant =
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "amber"
  | "cyan"
  | "emerald"
  | "neutral";

interface RangeFilterProps {
  form: UseFormReturn<PropertyInputSchema>;
  name: FieldPath<PropertyInputSchema>;
  title: string;
  Icon: LucideIcon;
  color: ColorVariant;
}

export function RangeFilter({
  form,
  name,
  title,
  Icon,
  color = "blue",
}: RangeFilterProps) {
  const colorVariants = {
    blue: {
      container: "from-blue-50 to-blue-100",
      badge: "bg-blue-300/50",
      icon: "text-blue-700",
    },
    green: {
      container: "from-green-50 to-green-100",
      badge: "bg-green-300/50",
      icon: "text-green-700",
    },
    red: {
      container: "from-red-50 to-red-100",
      badge: "bg-red-300/50",
      icon: "text-red-700",
    },
    purple: {
      container: "from-purple-50 to-purple-100",
      badge: "bg-purple-300/50",
      icon: "text-purple-700",
    },
    amber: {
      container: "from-amber-50 to-amber-100",
      badge: "bg-amber-300/50",
      icon: "text-amber-700",
    },
    cyan: {
      container: "from-cyan-50 to-cyan-100",
      badge: "bg-cyan-300/50",
      icon: "text-cyan-700",
    },
    emerald: {
      container: "from-emerald-50 to-emerald-100",
      badge: "bg-emerald-300/50",
      icon: "text-emerald-700",
    },
    neutral: {
      container: "from-neutral-50 to-neutral-100",
      badge: "bg-neutral-300/50",
      icon: "text-neutral-700",
    },
  } as const;

  const styles = colorVariants[color];

  return (
    <div
      className={`flex justify-center py-4 rounded-lg bg-linear-to-r ${styles.container} border-2 border-gray-200`}
    >
      <div className="w-5/6">
        <div className="flex items-center gap-2 mb-5">
          <span className={`p-3 rounded-full ${styles.badge}`}>
            <Icon className={`size-5 ${styles.icon}`} />
          </span>
          <h2 className="text-lg font-medium">{title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <RangeInput
            form={form}
            name={`${name}.min` as FieldPath<PropertyInputSchema>}
            label="Mínimo"
          />
          <span className="bg-gray-50 p-2 rounded-full mt-6">
            <ArrowRight className="size-4" />
          </span>
          <RangeInput
            form={form}
            name={`${name}.max` as FieldPath<PropertyInputSchema>}
            label="Máximo"
          />
        </div>
      </div>
    </div>
  );
}
