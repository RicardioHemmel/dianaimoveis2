"use client";

import { ChevronDown, LucideIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

//---------------------- CONTAINERS WITH GROUP OF FILTERS --------------------
interface FilterGroupProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function FilterGroup({ children, id, title }: FilterGroupProps) {
  // DEFINES WICH GROUP IS EXPANDED
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "typologies",
    "details",
    "values",
    "amenities",
  ]);

  // TOGGLE EXPANDED STATUS
  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
    );
  };

  const isExpanded = expandedGroups.includes(id);

  return (
    <div className="w-full border-b border-border/30 last:border-b-0 px-2">
      <button
        onClick={() => toggleGroup(id)}
        className="flex items-center justify-between w-full py-4 text-left transition-colors hover:text-action-primary"
      >
        <span className="text-xs font-bold uppercase tracking-wider">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-400",
          isExpanded ? "max-h-[800px] opacity-100 pb-5" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
}

//--------------- ONE FILTER -------------------

interface FilterItemProps {
  Icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}

export function FilterItem({ children, Icon, label }: FilterItemProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-action-primary" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {children}
    </div>
  );
}
