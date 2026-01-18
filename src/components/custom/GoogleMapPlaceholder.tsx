import { MapPin } from "lucide-react";

export default function GoogleMapPlaceholder({
  placeholderText,
}: {
  placeholderText: string;
}) {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="size-12 text-muted-foreground/50 mx-auto mb-4" />
        <p className="text-muted-foreground">Mapa interativo</p>
        <p className="text-muted-foreground/70 text-sm">{placeholderText}</p>
      </div>
    </div>
  );
}
