import React, { useContext, useEffect, useState } from "react";
import { DestinationContext } from "@/context/DestinationContext";

function NearbyPlaceOptions({ source }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    if (source) {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.nearbySearch(
        {
          location: { lat: source.lat, lng: source.lng },
          radius: 5000,
          type: ["point_of_interest"],
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const shuffledResults = shuffleArray(results);
            const randomPlaces = shuffledResults.slice(0, 12);
            setNearbyPlaces(randomPlaces);
          }
        }
      );
    }
  }, [source]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleSetDestination = (place) => {
    console.log("Selected place:", place);
    setDestination({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      label: place.formatted_address || place.name,
    });
  };

  return (
    <div>
      {source && nearbyPlaces.length > 0 && (
        <div className="mt-8 overflow-y-auto max-h-[600px] relative">
          <h2 className="text-[25px] font-bold text-indigo-500 mb-4">
            Suggested Trip
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nearbyPlaces.map((place) => (
              <div
                key={place.place_id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105"
                onClick={() => handleSetDestination(place)}
              >
                {place.photos && place.photos[0] && (
                  <img
                    src={place.photos[0].getUrl()}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="text-lg font-semibold">{place.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NearbyPlaceOptions;
