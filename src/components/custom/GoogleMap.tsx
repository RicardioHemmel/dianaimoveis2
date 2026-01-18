"use client";

import { useEffect, useState } from "react";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
}
export function GoogleMap({ lat, lng, zoom = 15 }: MapProps) {
  const position = { lat: lat, lng: lng };

  // APIPROVIDER LOADS GOOGLE MAPS SCRIPT ASYNCHRONOUSLY
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-full h-full">
        <Map
          defaultCenter={position}
          defaultZoom={zoom}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        >
          <AdvancedMarker position={position}>
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
