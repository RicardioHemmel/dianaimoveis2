"use client";

import { Button } from "@/components/ui/button";
import { toggleIsFeatured } from "@/lib/server-actions/properties/toggle-is-featured.action";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function ToggleIsFeaturedBtn({
  isFeatured,
  _id,
}: {
  isFeatured: boolean;
  _id: string;
}) {
  // TOGGLE IS FEATURED
  const handleIsFeaturedToggle = async () => {
    const res = await toggleIsFeatured(_id);

    if (!res.success) {
      toast.error(res.message ?? "Erro ao atualizar");
      return;
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => handleIsFeaturedToggle()}
      className={`size-9 p-0 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-500  transition-colors ${isFeatured && "border-amber-300 "}`}
    >
      <Star className={isFeatured ? "fill-amber-300 stroke-0 size-5" : ""} />
    </Button>
  );
}
