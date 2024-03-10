"use client";
import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import TransportListOptions from "./TransportListOptions";

function SearchSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance] = useState();

  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: source.lat, lng: source.lng },
      { lat: destination.lat, lng: destination.lng }
    );

    setDistance(dist * 0.00621374);
  };

  useEffect(() => {
  }, [source, destination]);

  return (
    <div>
      <div className="p-6 border-2 rounded-xl bg-gray-100">
        <p className="text-2xl font-bold text-indigo-700 mb-4">Get a Ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />

        <button
          className="p-4 bg-indigo-600 w-full mt-5 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
          onClick={() => calculateDistance()}
        >
          Search
        </button>
      </div>

      {distance ? <TransportListOptions distance={distance} /> : null}
    </div>
  );
}

export default SearchSection;
