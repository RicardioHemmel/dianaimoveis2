"use client";

import { useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";

interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
}

// SUB-COMPONENT TO UPDATE THE CAMERA WHEN PROPS CHANGE
function MapUpdater({
  position,
  zoom,
}: {
  position: { lat: number; lng: number };
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // MOVE THE CAMERA SMOOTHLY TO THE NEW POSITION
    map.panTo(position);
    map.setZoom(zoom);
  }, [map, position, zoom]);

  return null;
}

export function GoogleMap({ lat, lng, zoom = 17 }: MapProps) {
  const position = { lat: lat, lng: lng };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-full h-full">
        <Map
          defaultCenter={position}
          defaultZoom={zoom}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          gestureHandling={"cooperative"}
          disableDefaultUI={false}
        >
          <AdvancedMarker position={position}>
            <div className="relative flex flex-col items-center justify-center translate-y-[-50%]">
              {/* ROUNDED IMAGE */}
              <img
                src="/roundedLogo.svg"
                alt="Diana Imóveis"
                className="size-14 rounded-full border-2 border-black bg-white object-cover z-20 relative shadow-md"
              />

              {/* SQUARE ROTATED BY 45 DEGREES TO SIMULATE THE PIN */}
              <div className="absolute -bottom-2 size-5 bg-white border-r-2 border-b-2 border-black rotate-45 z-10"></div>
            </div>
          </AdvancedMarker>
          {/* POSITION UPDATER */}
          <MapUpdater position={position} zoom={zoom} />
        </Map>
      </div>
    </APIProvider>
  );
}
