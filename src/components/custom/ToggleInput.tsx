import { FormField } from "@/components/ui/form";
import {
  PropertyInputSchema,
  ToggleFieldSchema,
} from "@/lib/schemas/property/property.schema";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { PropertyToggle } from "./PropertyToggle";
import { LucideIcon } from "lucide-react";

interface ToggleInputProps {
  form: UseFormReturn<PropertyInputSchema>;
  name: FieldPath<PropertyInputSchema>;
  label: string;
  Icon: LucideIcon;
}

export function ToggleInput({ form, label, name, Icon }: ToggleInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <PropertyToggle
          label={label}
          value={field.value as ToggleFieldSchema}
          onChange={field.onChange}
          Icon={Icon}
        />
      )}
    />
  );
}
