"use client";

import { FilterItem } from "@/components/custom/search-results-page/Filters";
import { Slider } from "@/components/ui/slider";
import {
  SelectedFilters,
  useSearchPropertyContext,
} from "@/context/SearchPropertyContext";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SliderFilterProps {
  Icon: LucideIcon;
  label: string;
  filterKey: keyof SelectedFilters;
  filterRange: { min: number; max: number } | null;
  inputLimits: { min: number; max: number };
}

export function SliderFilter({
  Icon,
  label,
  filterKey,
  filterRange,
  inputLimits,
}: SliderFilterProps) {
  // SLIDER VALUE UPDATER
  const { setSliderValue } = useSearchPropertyContext();

  // USES USERS FILTER VALUE OR THE LIMIT VALUES
  const minValue = filterRange?.min || inputLimits.min;
  const maxValue = filterRange?.max || inputLimits.max;

  // CONTROLS THE SLIDER VALUES ON UI
  const [sliderValueUI, setSliderValueUI] = useState({
    min: minValue,
    max: maxValue,
  });
  // UPDATES UI AS THE SLIDER CHANGE VALUES
  const handleSliderValueChange = (values: number[]) => {
    setSliderValueUI({ min: values[0], max: values[1] });
  };

  const formatValue = (value: number) => {
    switch (filterKey) {
      case "areaRange":
        return `${value} m²`;

      case "priceRange":
        return formattedPrice(value, false);

      default:
        return value;
    }
  };

  return (
    <FilterItem Icon={Icon} label={label}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="bg-muted rounded-lg px-2.5 py-1.5">
            <span className="text-[10px] text-muted-foreground block">Min</span>
            <span className="text-xs font-semibold text-foreground">
              {formatValue(sliderValueUI.min)}
            </span>
          </div>
          <div className="flex-1 mx-2 border-t border-dashed border-border" />
          <div className="bg-muted rounded-lg px-2.5 py-1.5 text-right">
            <span className="text-[10px] text-muted-foreground block">Max</span>
            <span className="text-xs font-semibold text-foreground">
              {formatValue(sliderValueUI.max)}
            </span>
          </div>
        </div>
        <Slider
          defaultValue={[minValue, maxValue]}
          min={inputLimits.min}
          max={inputLimits.max}
          step={1}
          onValueChange={(values) => handleSliderValueChange(values)}
          onValueCommit={(values) =>
            setSliderValue(filterKey, [values[0], values[1]])
          }
          className="[&_[role=slider]]:bg-action-primary [&_[role=slider]]:border-2 [&_[role=slider]]:border-action-primary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:shadow-lg [&_.relative]:bg-muted [&_.absolute]:bg-action-primary"
        />
      </div>
    </FilterItem>
  );
}
