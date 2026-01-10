"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function ShareButton({ title }: { title: string }) {
  // NAVIGATOR METHOD FOR SHARING
  const handleShare = async () => {
    const shareData = {
      title: title,
      text: "Confira este imóvel incrível!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado!");
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4 mr-2" />
      Compartilhar
    </Button>
  );
}
