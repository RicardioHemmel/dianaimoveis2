"use client";

import { useEffect } from "react";
import { Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";

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

export function GoogleMap({ lat, lng, zoom = 15 }: MapProps) {
  const position = { lat: lat, lng: lng };

  return (
    <div className="w-full h-full">
      <Map
        defaultCenter={position}
        defaultZoom={zoom}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
        gestureHandling={"cooperative"}
        disableDefaultUI={false}
      >
        <AdvancedMarker position={position}>
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>

        {/* POSITION UPDATER */}
        <MapUpdater position={position} zoom={zoom} />
      </Map>
    </div>
  );
}
