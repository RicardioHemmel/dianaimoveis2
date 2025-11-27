"use client";

import { useAmenities } from "@/hooks/properties/use-property-amenities";
import { useDeliveryStatus } from "@/hooks/properties/use-property-status";
import { usePurposes } from "@/hooks/properties/use-property-purposes";
import { useStandings } from "@/hooks/properties/use-property-standings";
import { useTypes } from "@/hooks/properties/use-property-types";
import { useTypologies } from "@/hooks/properties/use-property-typologies";

export default function TestePage() {
  const { data: amenities } = useAmenities();
  const { data: deliveryStatus } = useDeliveryStatus();
  const { data: purposes } = usePurposes();
  const { data: standings } = useStandings();
  const { data: types } = useTypes();
  const { data: typologies } = useTypologies();

  return (
    <div className="flex w-screen">
      <ul>
        {amenities?.map((amenity) => (
          <li className="text-blue-500" key={amenity._id}>
            <p>{amenity._id}</p>
            <p>{amenity.name}</p>
          </li>
        ))}
      </ul>

      <ul>
        {deliveryStatus?.map((deliveryStatusItem) => (
          <li className="text-red-500" key={deliveryStatusItem._id}>
            <p>{deliveryStatusItem._id}</p>
            <p>{deliveryStatusItem.name}</p>
          </li>
        ))}
      </ul>

      <ul>
        {purposes?.map((purpose) => (
          <li className="text-green-500" key={purpose._id}>
            <p>{purpose._id}</p>
            <p>{purpose.name}</p>
          </li>
        ))}
      </ul>

      <ul>
        {standings?.map((standing) => (
          <li className="text-purple-500" key={standing._id}>
            <p>{standing._id}</p>
            <p>{standing.name}</p>
          </li>
        ))}
      </ul>

      <ul>
        {types?.map((type) => (
          <li className="text-yellow-500" key={type._id}>
            <p>{type._id}</p>
            <p>{type.name}</p>
          </li>
        ))}
      </ul>

      <ul>
        {typologies?.map((typology) => (
          <li className="text-teal-500" key={typology._id}>
            <p>{typology._id}</p>
            <p>{typology.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
