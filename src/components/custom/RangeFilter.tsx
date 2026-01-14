import { RangeInput } from "@/components/custom/RangeInput";
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";
import { LucideIcon } from "lucide-react";
import { FieldPath, UseFormReturn } from "react-hook-form";

interface RangeFilterProps {
  form: UseFormReturn<PropertyInputSchema>;
  name: FieldPath<PropertyInputSchema>;
  title: string;
  Icon: LucideIcon;
}

export function RangeFilter({ form, name, title, Icon }: RangeFilterProps) {
  return (
    <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-3">
      <h2 className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <RangeInput
          form={form}
          name={`${name}.min` as FieldPath<PropertyInputSchema>}
          label="Mínimo"
        />

        <RangeInput
          form={form}
          name={`${name}.max` as FieldPath<PropertyInputSchema>}
          label="Máximo"
        />
      </div>
    </div>
  );
}
