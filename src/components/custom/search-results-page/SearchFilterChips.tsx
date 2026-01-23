"use client";

import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  selected: boolean;
  onClick?: () => void;
}

export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer",
        "border hover:scale-105 active:scale-95",
        selected
          ? "bg-action-primary text-secondary-foreground border-secondary shadow-gold"
          : "bg-slate-100 border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

interface NumberChipProps {
  value: string;
  selected: boolean;
  onClick?: () => void;
}

export function NumberChip({ value, selected, onClick }: NumberChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "size-10 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
        "border hover:scale-105 active:scale-95 flex items-center justify-center",
        selected
          ? "bg-action-primary text-secondary-foreground border-secondary shadow-gold"
          : "bg-slate-100 border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground",
      )}
    >
      {value}
    </button>
  );
}
