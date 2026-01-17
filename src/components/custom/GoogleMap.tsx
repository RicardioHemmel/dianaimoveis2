// "use client";

// import { useEffect, useState } from "react";

// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
//   useMapsLibrary,
// } from "@vis.gl/react-google-maps";

// interface MapProps {
//   street?: string;
//   neighborhood?: string;
//   city?: string;
//   zoom?: number;
// }

// const DEFAULT_CENTER = { lat: -23.55052, lng: -46.633309 }; // SÃO PAULO

// export function GoogleMap({ street, neighborhood, city, zoom = 15 }: MapProps) {
//   const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(
//     null
//   );

//   const geocodingLib = useMapsLibrary("geocoding");

//   useEffect(() => {
//     if (!geocodingLib || !street) return;

//     const geocoder = new geocodingLib.Geocoder();
//     const fullAddress = `${street}, ${neighborhood}, ${city}`;

//     geocoder.geocode({ address: fullAddress }, (results, status) => {
//       if (status === "OK" && results?.[0]) {
//         const { lat, lng } = results[0].geometry.location;
//         setPosition({ lat: lat(), lng: lng() });
//       } else {
//         console.error("Erro ao buscar endereço", status);
//       }
//     });
//   }, [geocodingLib, street, neighborhood, city]);

//   // APIPROVIDER LOADS GOOGLE MAPS SCRIPT ASYNCHRONOUSLY
//   return (
//     <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
//       <div className="w-full h-full">
//         <Map
//           defaultCenter={position}
//           defaultZoom={zoom}
//           mapId={process.env.NEXT_PUBLIC_MAP_ID}
//           gestureHandling={"greedy"}
//           disableDefaultUI={false}
//         >
//           <AdvancedMarker position={center}>
//             <Pin
//               background={"#FBBC04"}
//               glyphColor={"#000"}
//               borderColor={"#000"}
//             />
//           </AdvancedMarker>
//         </Map>
//       </div>
//     </APIProvider>
//   );
// }
