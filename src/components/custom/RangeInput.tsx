import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { PropertyInputSchema } from "@/lib/schemas/property/property.schema";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface RangeInputProps {
  form: UseFormReturn<PropertyInputSchema>;
  name: FieldPath<PropertyInputSchema>;
  label: string;
}

export function RangeInput({ form, name, label }: RangeInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <div className="relative mt-1.5">
              <NumericFormat
                id={field.name}
                name={field.name}
                value={field.value as FieldPath<PropertyInputSchema>}
                customInput={Input}
                allowNegative={false}
                placeholder="0"
                onValueChange={(values) => {
                  field.onChange(values.floatValue);
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
