import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { LucideIcon, Sofa } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleFieldSchema } from "@/lib/schemas/property/property.schema";

interface PropertyToggleProps {
  label: string;
  value?: ToggleFieldSchema;
  onChange: (newValue: ToggleFieldSchema) => void;
  Icon: LucideIcon;
}

export function PropertyToggle({
  label,
  value,
  onChange,
  Icon,
}: PropertyToggleProps) {
  // ENSURES STANDARD VALUES
  const safeValue = value || { value: false, show: true };

  const handleCheckboxChange = (checked: boolean) => {
    onChange({
      ...safeValue,
      value: checked,
      show: checked ? true : safeValue.show,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    onChange({
      ...safeValue,
      show: checked,
    });
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
      <FormItem className="flex items-center space-x-3 mb-0">
        <FormControl>
          <Checkbox
            checked={safeValue.value}
            onCheckedChange={handleCheckboxChange}
            className="mt-1"
          />
        </FormControl>
        <FormLabel className="cursor-pointer text-base mt-0.5">
          <Icon className="h-5 w-5 text-primary" />
          {label}
        </FormLabel>
        <FormMessage />
      </FormItem>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Exibir</span>
        <Switch checked={safeValue.show} onCheckedChange={handleSwitchChange} />
      </div>
    </div>
  );
}
